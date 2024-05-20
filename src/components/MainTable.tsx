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
    { title: 'Job Title', dataIndex: 'jobTitle', key: 'jobTitle',sorter: (a: JobData, b: JobData) => a.jobTitle.localeCompare(b.jobTitle), },
    { title: 'Average Salary (USD)', dataIndex: 'averageSalary', key: 'averageSalary',sorter: (a: JobData, b: JobData) => a.averageSalary - b.averageSalary, },
    { title: 'Total Jobs', dataIndex: 'jobCount', key: 'jobCount',sorter: (a: JobData, b: JobData) => a.jobCount - b.jobCount, },
  ];

  const yearData = data.find(d => d.year === selectedYear);
  const dataSource = yearData ? yearData.jobs : [];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={(record: JobData) => record.jobTitle}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default MainTable;
