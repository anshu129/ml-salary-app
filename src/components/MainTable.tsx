// src/components/MainTable.tsx
import React from 'react';
import { Table } from 'antd';
import { SalaryData, JobData } from '../utils/dataLoader';

interface MainTableProps {
  data: SalaryData[];
  selectedYear: number | null;
}

const MainTable: React.FC<MainTableProps> = ({ data, selectedYear }) => {
  const columns = [
    { title: 'Job Title', dataIndex: 'jobTitle', key: 'jobTitle' },
    { title: 'Average Salary (USD)', dataIndex: 'averageSalary', key: 'averageSalary' },
  ];

  const yearData = data.find(d => d.year === selectedYear);
  const dataSource = yearData ? yearData.jobs : [];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={(record: JobData) => record.jobTitle}
    />
  );
};

export default MainTable;
