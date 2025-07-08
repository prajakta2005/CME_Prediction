import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DerivedParametersChartProps {
  selectedDate: Date;
}

const DerivedParametersChart: React.FC<DerivedParametersChartProps> = ({ selectedDate }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const data = {
    labels: hours.map(h => `${h.toString().padStart(2, '0')}:00`),
    datasets: [
      {
        label: 'Alpha/Proton Ratio',
        data: hours.map(h => {
          const baseValue = 0.05 + Math.sin(h * 0.3) * 0.01;
          // Add CME enhancement
          if (h >= 14 && h <= 16) {
            return baseValue + Math.exp(-((h - 15) * (h - 15))) * 0.15;
          }
          return baseValue + (Math.random() - 0.5) * 0.005;
        }),
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Velocity Anisotropy',
        data: hours.map(h => {
          const baseValue = 1.2 + Math.sin(h * 0.25) * 0.3;
          // Add CME anisotropy
          if (h >= 14 && h <= 16) {
            return baseValue + Math.exp(-((h - 15) * (h - 15))) * 2;
          }
          return baseValue + (Math.random() - 0.5) * 0.1;
        }),
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.4,
        yAxisID: 'y1',
      },
      {
        label: 'Z-Score (Density)',
        data: hours.map(h => {
          const baseValue = 0 + Math.sin(h * 0.2) * 0.5;
          // Add CME z-score spike
          if (h >= 14 && h <= 16) {
            return baseValue + Math.exp(-((h - 15) * (h - 15))) * 4;
          }
          return baseValue + (Math.random() - 0.5) * 0.2;
        }),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        yAxisID: 'y2',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e2e8f0',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: '#8b5cf6',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { size: 11 } },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        border: { color: 'rgba(148, 163, 184, 0.2)' }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        ticks: { color: '#a855f7', font: { size: 11 } },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        border: { color: 'rgba(148, 163, 184, 0.2)' },
        title: {
          display: true,
          text: 'Alpha/Proton Ratio',
          color: '#a855f7',
          font: { size: 12 }
        }
      },
      y1: {
        type: 'linear' as const,
        display: false,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
      },
      y2: {
        type: 'linear' as const,
        display: false,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    }
  };

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  );
};

export default DerivedParametersChart;