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

interface ParticleFluxChartProps {
  selectedDate: Date;
}

const ParticleFluxChart: React.FC<ParticleFluxChartProps> = ({ selectedDate }) => {
  // Generate mock data based on selected date
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const baseFlux = 1000;
  
  const data = {
    labels: hours.map(h => `${h.toString().padStart(2, '0')}:00`),
    datasets: [
      {
        label: 'Proton Flux',
        data: hours.map(h => {
          const baseValue = baseFlux + Math.sin(h * 0.5) * 200;
          // Add CME spike around hour 14-16
          if (h >= 14 && h <= 16) {
            return baseValue + Math.exp(-((h - 15) * (h - 15))) * 800;
          }
          return baseValue + (Math.random() - 0.5) * 100;
        }),
        borderColor: 'rgb(251, 146, 60)',
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Alpha Particle Flux',
        data: hours.map(h => {
          const baseValue = baseFlux * 0.1 + Math.sin(h * 0.3) * 20;
          // Add CME spike around hour 14-16
          if (h >= 14 && h <= 16) {
            return baseValue + Math.exp(-((h - 15) * (h - 15))) * 80;
          }
          return baseValue + (Math.random() - 0.5) * 10;
        }),
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
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
          text: 'Flux (particles/cm²/s)',
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

export default ParticleFluxChart;