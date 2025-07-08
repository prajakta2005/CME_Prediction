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
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface VelocityChartProps {
  selectedDate: Date;
}

const VelocityChart: React.FC<VelocityChartProps> = ({ selectedDate }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const data = {
    labels: hours.map(h => `${h.toString().padStart(2, '0')}:00`),
    datasets: [
      {
        label: 'Solar Wind Velocity',
        data: hours.map(h => {
          const baseValue = 400 + Math.sin(h * 0.2) * 50;
          // Add CME velocity enhancement
          if (h >= 14 && h <= 16) {
            return baseValue + Math.exp(-((h - 15) * (h - 15))) * 600;
          }
          return baseValue + (Math.random() - 0.5) * 30;
        }),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Velocity Gradient',
        data: hours.map(h => {
          const baseValue = 10 + Math.sin(h * 0.15) * 5;
          // Add CME gradient spike
          if (h >= 14 && h <= 16) {
            return baseValue + Math.exp(-((h - 15) * (h - 15))) * 50;
          }
          return baseValue + (Math.random() - 0.5) * 3;
        }),
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
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
        ticks: { color: '#94a3b8', font: { size: 11 } },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        border: { color: 'rgba(148, 163, 184, 0.2)' },
        title: {
          display: true,
          text: 'Velocity (km/s)',
          color: '#e2e8f0',
          font: { size: 12 }
        }
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

export default VelocityChart;