import React, { useEffect, useState } from 'react';
import 'antd/dist/reset.css';
import { Layout, Select } from 'antd';
import MainTable from './components/MainTable';
import CustomLineChart from './components/LineChart';
//import DetailsTable from '/Users/anshu/ml-salary-app/src/components/DeatilsTable';
import { loadCSVData,  SalaryData, } from './utils/dataLoader';
import './App.css';
import { Table } from 'antd';
import { parse } from 'csv-parse/browser/esm';

const { Header, Content } = Layout;
const { Option } = Select;

const App: React.FC = () => {
  const [data, setData] = useState<SalaryData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    fetch('/salaries.csv')
      .then((response) => response.text())
      .then((data) => {
        parse(data, {
          columns: true,
          skip_empty_lines: true,
        }, (err, output: any[]) => {
          if (err) {
            console.error('Error parsing CSV:', err);
          } else {
            const jobCounts: { [key: string]: number } = {};
            output.forEach((item) => {
              const { job_title } = item;
              if (jobCounts[job_title]) {
                jobCounts[job_title]++;
              } else {
                jobCounts[job_title] = 1;
              
          }
        });
        const dataSourceWithJobCounts = output.map((item) => ({
          ...item,
          total_jobs: jobCounts[item.job_title],
        }));
        setDataSource(dataSourceWithJobCounts);
      }
    });
  })
  .catch((error) => console.error('Error fetching CSV:', error));
  }, []);

  const columns = [
    {
      title: 'Work Year',
      dataIndex: 'work_year',
      sorter: (a: any, b: any) => a.work_year - b.work_year,
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      sorter: (a: any, b: any) => a.job_title.localeCompare(b.job_title),
    },
    {
      title: 'Salary in USD',
      dataIndex: 'salary_in_usd',
      sorter: (a: any, b: any) => a.salary_in_usd - b.salary_in_usd,
    },
    {
      title: 'Total Jobs',
      dataIndex: 'total_jobs',
      sorter: (a: any, b: any) => a.total_jobs - b.total_jobs,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await loadCSVData('/salaries.csv');
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
  

return (
  <Layout>
    <Header className="header" style={{backgroundColor: 'pink'}}>
      <div className="logo" />
      <h1>Salary Data Dashboard</h1>
    </Header>
    <Content style={{ padding: '0 50px' }} >
    <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </Content>
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
    <Content>
    <CustomLineChart data={data} />
    </Content>
  </Layout>
);
};

export default App;
