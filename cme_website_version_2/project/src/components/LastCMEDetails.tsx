import React from 'react';
import { AlertTriangle, Clock, TrendingUp, Zap } from 'lucide-react';

const LastCMEDetails: React.FC = () => {
  // Mock data for the last CME event
  const lastCME = {
    date: new Date('2024-01-15T14:30:00Z'),
    type: 'Halo CME',
    intensity: 8.2,
    velocity: 1245,
    angularWidth: 180,
    earthImpact: true,
    impactTime: new Date('2024-01-15T20:45:00Z'),
    confidence: 96.7
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <AlertTriangle className="w-6 h-6 text-orange-400" />
          <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-md"></div>
        </div>
        <h2 className="text-xl font-bold text-white">Last CME Event</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Event Type:</span>
          <span className="font-medium text-orange-400">{lastCME.type}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-300">Detection Time:</span>
          <span className="font-medium text-white">
            {lastCME.date.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-300">Intensity:</span>
          <span className={`font-medium ${
            lastCME.intensity > 7 ? 'text-red-400' : lastCME.intensity > 4 ? 'text-orange-400' : 'text-yellow-400'
          }`}>
            {lastCME.intensity}/10
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-300">Velocity:</span>
          <span className="font-medium text-blue-400">{lastCME.velocity} km/s</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-300">Angular Width:</span>
          <span className="font-medium text-purple-400">{lastCME.angularWidth}°</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-300">Earth Impact:</span>
          <span className={`font-medium ${lastCME.earthImpact ? 'text-red-400' : 'text-emerald-400'}`}>
            {lastCME.earthImpact ? 'Yes' : 'No'}
          </span>
        </div>

        {lastCME.earthImpact && (
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Impact Time:</span>
            <span className="font-medium text-red-400">
              {lastCME.impactTime.toLocaleString()}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-slate-300">Confidence:</span>
          <span className="font-medium text-emerald-400">{lastCME.confidence}%</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg border border-red-500/20">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-medium text-orange-400">Impact Assessment</span>
        </div>
        <p className="text-xs text-slate-300">
          High-intensity halo CME with significant Earth impact. Geomagnetic storm conditions expected.
          Satellite operators and power grid systems advised to take precautionary measures.
        </p>
      </div>
    </div>
  );
};

export default LastCMEDetails;