import React from 'react';
import { BarChart3, TrendingUp, Activity, Zap } from 'lucide-react';
import ParticleFluxChart from './charts/ParticleFluxChart';
import DensityTemperatureChart from './charts/DensityTemperatureChart';
import VelocityChart from './charts/VelocityChart';
import DerivedParametersChart from './charts/DerivedParametersChart';

interface GraphsSectionProps {
  selectedDate: Date;
}

const GraphsSection: React.FC<GraphsSectionProps> = ({ selectedDate }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <BarChart3 className="w-8 h-8 text-purple-400" />
          <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-md"></div>
        </div>
        <h2 className="text-2xl font-bold text-white">Real-time SWIS Data Analysis</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Particle Flux Chart */}
        <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-orange-400" />
            <h3 className="text-xl font-semibold text-white">Particle Flux</h3>
          </div>
          <ParticleFluxChart selectedDate={selectedDate} />
        </div>

        {/* Density & Temperature Chart */}
        <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Density & Temperature</h3>
          </div>
          <DensityTemperatureChart selectedDate={selectedDate} />
        </div>

        {/* Velocity Chart */}
        <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-semibold text-white">Solar Wind Velocity</h3>
          </div>
          <VelocityChart selectedDate={selectedDate} />
        </div>

        {/* Derived Parameters Chart */}
        <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-semibold text-white">Derived Parameters</h3>
          </div>
          <DerivedParametersChart selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
};

export default GraphsSection;