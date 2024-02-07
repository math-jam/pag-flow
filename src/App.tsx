// App.tsx
import './App.css';
import { DataTables } from './screens/DataTables/DataTables';
import FileUpload from './screens/FileUpload/FileUpload';
import { DataProvider } from './context/context';

const App: React.FC = () => {
  const title = [
    'name',
    'email',
    'governmentId',
    'debtId',
    'debtDueDate',
    'debtAmount',
  ];

  return (
    <div style={{ padding: 12 }}>
    <DataProvider>
      <div className='file-container'>
        <FileUpload onFileUpload={(filename) => console.log('Arquivo enviado com sucesso:', filename)} />
      </div>
      <div className='table-container'>
        <DataTables title={title}/> 
      </div>
    </DataProvider>
    </div>
  );
};

export default App;
