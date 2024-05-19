/* src/components/DetailsTable.tsx
import React from 'react';
import { Table } from 'antd';
import { JobDetail } from '../utils/dataLoader';

interface DetailsTableProps {
  data: JobDetail[];
}

const DetailsTable: React.FC<DetailsTableProps> = ({ data }) => {
  const columns = [
    { title: 'Job Title', dataIndex: 'title', key: 'title' },
    { title: 'Number of Jobs', dataIndex: 'count', key: 'count' },
  ];

  return <Table dataSource={data} columns={columns} rowKey="title" />;
};

export default DetailsTable;
*/
export{};