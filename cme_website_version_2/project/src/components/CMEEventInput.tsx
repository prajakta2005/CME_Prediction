import React, { useState } from 'react';
import { Calendar, Clock, Search, Zap } from 'lucide-react';

interface CMEEventInputProps {
  onSubmit: (date: Date) => void;
}

const CMEEventInput: React.FC<CMEEventInputProps> = ({ onSubmit }) => {
  const [date, setDate] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(new Date(date));
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <Search className="w-6 h-6 text-blue-400" />
          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md"></div>
        </div>
        <h2 className="text-xl font-bold text-white">CME Event Analysis</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Select Date & Time (UTC)
          </label>
          <div className="relative">
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              max={new Date().toISOString().slice(0, 16)}
            />
            <Calendar className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Analyze CME Event
        </button>
      </form>

      <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
        <h3 className="text-sm font-medium text-slate-300 mb-2">Analysis Parameters</h3>
        <div className="space-y-2 text-xs text-slate-400">
          <div className="flex justify-between">
            <span>Particle Flux:</span>
            <span className="text-emerald-400">Active</span>
          </div>
          <div className="flex justify-between">
            <span>Number Density:</span>
            <span className="text-emerald-400">Active</span>
          </div>
          <div className="flex justify-between">
            <span>Temperature:</span>
            <span className="text-emerald-400">Active</span>
          </div>
          <div className="flex justify-between">
            <span>Velocity:</span>
            <span className="text-emerald-400">Active</span>
          </div>
          <div className="flex justify-between">
            <span>LSTM Model:</span>
            <span className="text-blue-400">Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMEEventInput;