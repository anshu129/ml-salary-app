import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SalaryData } from '../utils/dataLoader';

interface LineChartProps {
  data: SalaryData[];
}

const CustomLineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartData = data.map(d => ({
    year: d.year,
    totalJobs: d.totalJobs,
    averageSalary: d.averageSalary,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalJobs" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="averageSalary" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
