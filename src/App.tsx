import React, { useEffect, useState } from 'react';
import 'antd/dist/reset.css';
import { Layout, Select, Typography } from 'antd';
import MainTable from './components/MainTable';
//import LineChart from './components/LineChart';
//import DetailsTable from '/Users/anshu/ml-salary-app/src/components/DeatilsTable';
import { loadCSVData,  SalaryData, } from './utils/dataLoader';
import './App.css';

const { Header, Content } = Layout;
const { Option } = Select;

const App: React.FC = () => {
  const [data, setData] = useState<SalaryData[]>([]);
  //const [rawData, setRawData] = useState<any[]>([]); // Raw data to use for job details
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  //const [details, setDetails] = useState<JobDetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await loadCSVData('/Users/anshu/ml-salary-app/src/salaries.csv');
        setData(csvData);
        //setRawData(csvData);
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    };

    fetchData();
  }, []);
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };
  /*useEffect(() => {
    if (selectedYear !== null) {
      const jobDetails = loadJobDetails(rawData, selectedYear);
      setDetails(jobDetails);
    }
  },[selectedYear, rawData]);*/

  /*return (
    <Layout>
      <Header>
        <Title style={{ color: 'white' }}>ML Engineer Salaries</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <MainTable data={data} onRowClick={(year) => setSelectedYear(year)} />
        <LineChart data={data} />
        {selectedYear && <DetailsTable data={details} />}
      </Content>
    </Layout>
  );
};*/

return (
  <Layout>
    <Header className="header">
      <div className="logo" />
      <h1>Salary Data Dashboard</h1>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div className="site-layout-content">
        <Select
          placeholder="Select Year"
          onChange={handleYearChange}
          style={{ width: 200, marginBottom: 20 }}
        >
          {data.map(d => (
            <Option key={d.year} value={d.year}>
              {d.year}
            </Option>
          ))}
        </Select>
        <MainTable data={data} selectedYear={selectedYear} />
        {selectedYear !== null /*&& <LineChart data={data.filter(d => d.year === selectedYear)*/} 
      </div>
    </Content>
  </Layout>
);
};

export default App;
