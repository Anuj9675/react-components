// frontend/app/page.tsx
import React from 'react';
import { DataTable } from '../components';
import { dummyData } from '../components';

const Page: React.FC = () => {
  return (
    <div>
     
      <DataTable data={dummyData} />
    </div>
  );
};

export default Page;
