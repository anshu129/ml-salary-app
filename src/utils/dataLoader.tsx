// src/utils/dataLoader.ts
import * as d3 from 'd3';

export interface JobData {
  jobTitle: string;
  averageSalary: number;
}

export interface SalaryData {
  year: number;
  jobs: JobData[];
}

export const loadCSVData = async (csvPath: string): Promise<SalaryData[]> => {
  const data = await d3.csv(csvPath, (d) => {
    return {
      work_year: +d.work_year,
      job_title: d.job_title,
      salary_in_usd: +d.salary_in_usd,
    };
  });
  const groupedData = d3.group(data, d => d.work_year);

  return Array.from(groupedData, ([year, jobs]) => {
    const jobGroups = d3.group(jobs, d => d.job_title);
    const jobData = Array.from(jobGroups, ([jobTitle, jobRecords]) => {
      const averageSalary = d3.mean(jobRecords, d => d.salary_in_usd) ?? 0;
      return { jobTitle, averageSalary };
    });
    
    return { year, jobs: jobData };
  });
};
