/* src/components/LineChart.tsx
import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { SalaryData } from '../utils/dataLoader';

ChartJS.register(
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: SalaryData[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (ctx) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      chartInstanceRef.current = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: data.map((d) => d.year.toString()),
          datasets: [
            {
              label: 'Total Jobs',
              data: data.map((d) => d.totalJobs),
              fill: false,
              backgroundColor: 'blue',
              borderColor: 'blue',
            },
          ],
        },
        options: {},
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
*/
export{};