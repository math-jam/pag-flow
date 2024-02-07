import axios from "axios";

export const gerarBoleto = async (item: any) => {
  try {
    const boletoResponse = await axios.post(
      "http://localhost:1810/api/gerar-boleto",
      item
    );
    return boletoResponse;
  } catch (error) {
    console.error("Erro ao gerar boleto:", error);
  }
};