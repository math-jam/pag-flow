// TableComponent.tsx
import React, { useEffect, useState } from "react";
import { useDataContext } from '../../context/context';
import "./DataTable.style.css";
import axios from "axios";
import { Button } from '../../components/Button/Button';
import { gerarBoleto } from '../../services/boleto.services';

interface TableProps {
  title: string[];
}

export const DataTables: React.FC<TableProps> = ({ title }) => {
  const { state, setData, loading } = useDataContext();
  const { data, prevData } = state;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 1000;
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [data]);

  const handlePageChange = async (pageNumber: number) => {
    try {
      const response = await axios.get(
        `http://localhost:1810/api/data?pageSize=${itemsPerPage}&pageNumber=${pageNumber}`
      );
      setData({ data: response.data.data, prevData: data });
      setCurrentPage(pageNumber);
    } catch (error) {
      console.error("Erro ao obter dados paginados:", error);
    }
  };

  const handleGerarBoletosEEnviarEmails = async () => {
    try {
      for (const item of data) {
        const boleto = await gerarBoleto(item);

        if (boleto) {
          const emailResponse = await axios.post(
            "http://localhost:1810/api/enviar-email",
            item
          );

          console.log(
            `E-mail enviado para ${item.name}:`,
            emailResponse.data.message
          );
        }
      }
    } catch (error) {
      console.error("Erro ao gerar boletos e enviar e-mails:", error);
    }
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  return (
    <>
      {totalPages <= 0 ? (
        <div className="state-container">
          {loading ? (
            <div>
              <img
                src="https://www.downgraf.com/wp-content/uploads/2019/05/Loader-animation-principle-freebie.gif"
                alt="Carregando"
              />
            </div>
          ) : (
            <>
              <h1>Nenhum dado encontrado ou selecionado</h1>
              <div style={{ height: 500, width: 500 }}>
                <img
                  src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg"
                  alt="loading"
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginBottom: 12 }}>
              <Button
                style={{ marginRight: 12 }}
                text="Anterior"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <Button
                style={{ marginLeft: 12 }}
                text="Próxima"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </div>
            <div>
              <Button
                text="Gerar Boletos e Enviar E-mails"
                onClick={handleGerarBoletosEEnviarEmails}
              />
            </div>
          </div>
          <div className="table">
            <table className="custom-table">
              <thead>
                <tr>
                  {title.map((colTitle, index) => (
                    <th key={index}>{colTitle}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getPaginatedData().map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {title.map((colTitle, colIndex) => (
                      <td key={colIndex}>{row[colTitle]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </>
    )}
    </>
  );
};
