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

interface DensityTemperatureChartProps {
  selectedDate: Date;
}

const DensityTemperatureChart: React.FC<DensityTemperatureChartProps> = ({ selectedDate }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const data = {
    labels: hours.map(h => `${h.toString().padStart(2, '0')}:00`),
    datasets: [
      {
        label: 'Number Density (cm⁻³)',
        data: hours.map(h => {
          const baseValue = 5 + Math.sin(h * 0.3) * 2;
          // Add CME spike around hour 14-16
          if (h >= 14 && h <= 16) {
            return baseValue + Math.exp(-((h - 15) * (h - 15))) * 15;
          }
          return baseValue + (Math.random() - 0.5) * 1;
        }),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Temperature (×10⁴ K)',
        data: hours.map(h => {
          const baseValue = 10 + Math.sin(h * 0.4) * 3;
          // Add CME temperature enhancement
          if (h >= 14 && h <= 16) {
            return baseValue + Math.exp(-((h - 15) * (h - 15))) * 8;
          }
          return baseValue + (Math.random() - 0.5) * 2;
        }),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        yAxisID: 'y1',
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
        ticks: { color: '#3b82f6', font: { size: 11 } },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        border: { color: 'rgba(148, 163, 184, 0.2)' },
        title: {
          display: true,
          text: 'Density (cm⁻³)',
          color: '#3b82f6',
          font: { size: 12 }
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        ticks: { color: '#ef4444', font: { size: 11 } },
        grid: { drawOnChartArea: false },
        border: { color: 'rgba(148, 163, 184, 0.2)' },
        title: {
          display: true,
          text: 'Temperature (×10⁴ K)',
          color: '#ef4444',
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

export default DensityTemperatureChart;