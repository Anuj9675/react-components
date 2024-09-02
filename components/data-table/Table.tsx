import { DataTable } from './DataTable';
import { dummyData } from './dummyData';

export const Table: React.FC = () => {
    return (
      <div >
        <DataTable data={dummyData}  />
      </div>
    );
  };
  

  