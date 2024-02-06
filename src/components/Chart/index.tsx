import { Bar } from 'react-chartjs-2';

interface ChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}

export function Chart({ data }: ChartProps) {
  return (
    <div>
      <Bar data={data} />
    </div>
  );
}