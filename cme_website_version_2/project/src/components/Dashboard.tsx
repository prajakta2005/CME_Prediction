import React from 'react';
import { AlertTriangle, TrendingUp, Zap, Activity, Target, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface DashboardProps {
  selectedDate: Date;
  analysisResults: any;
}

const Dashboard: React.FC<DashboardProps> = ({ selectedDate, analysisResults }) => {
  if (!analysisResults) {
    return (
      <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-purple-500/20 p-8">
        <div className="text-center text-slate-400">
          <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Select a date and time to analyze CME events</p>
          <p className="text-sm mt-2">SWIS-ASPEX data processing ready</p>
        </div>
      </div>
    );
  }

  const { cmeDetected, confidence, intensity, estimatedArrival, angularWidth, velocity, type } = analysisResults;

  return (
    <div className="space-y-6">
      {/* Main Status Card */}
      <div className={`bg-gradient-to-r ${
        cmeDetected 
          ? 'from-red-900/40 to-orange-900/40 border-red-500/30' 
          : 'from-emerald-900/40 to-blue-900/40 border-emerald-500/30'
      } backdrop-blur-md rounded-2xl border p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {cmeDetected ? (
              <AlertTriangle className="w-8 h-8 text-red-400" />
            ) : (
              <Activity className="w-8 h-8 text-emerald-400" />
            )}
            <div>
              <h2 className="text-xl font-bold text-white">
                {cmeDetected ? 'CME Event Detected' : 'No CME Event Detected'}
              </h2>
              <p className="text-sm text-slate-300">
                Analysis for {format(selectedDate, 'PPP p')}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              {confidence.toFixed(1)}%
            </div>
            <div className="text-sm text-slate-300">Confidence</div>
          </div>
        </div>

        {cmeDetected && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-sm text-slate-300 mb-1">Intensity Level</div>
              <div className="text-xl font-bold text-orange-400">{intensity.toFixed(1)}/10</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-sm text-slate-300 mb-1">Est. Earth Arrival</div>
              <div className="text-xl font-bold text-blue-400">
                {format(estimatedArrival, 'HH:mm')}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detailed Analysis */}
      {cmeDetected && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">CME Properties</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-300">Type:</span>
                <span className="font-medium text-white">{type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Angular Width:</span>
                <span className="font-medium text-orange-400">{angularWidth.toFixed(1)}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Velocity:</span>
                <span className="font-medium text-blue-400">{velocity.toFixed(0)} km/s</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Impact Assessment</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-300">Threat Level:</span>
                <span className={`font-medium ${
                  intensity > 7 ? 'text-red-400' : intensity > 4 ? 'text-orange-400' : 'text-yellow-400'
                }`}>
                  {intensity > 7 ? 'High' : intensity > 4 ? 'Moderate' : 'Low'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Earth Impact:</span>
                <span className="font-medium text-white">
                  {angularWidth > 120 ? 'Likely' : 'Unlikely'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Warning Time:</span>
                <span className="font-medium text-emerald-400">
                  {Math.floor((estimatedArrival.getTime() - selectedDate.getTime()) / (1000 * 60 * 60))}h
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Model Performance */}
      <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">LSTM Model Performance</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">96.8%</div>
            <div className="text-sm text-slate-300">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">0.024</div>
            <div className="text-sm text-slate-300">RMSE</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">1.8%</div>
            <div className="text-sm text-slate-300">MAPE</div>
          </div>
        </div>
        
        {/* Additional Performance Metrics */}
        <div className="mt-4 pt-4 border-t border-slate-600/30">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Precision:</span>
              <span className="text-blue-400 font-medium">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Recall:</span>
              <span className="text-purple-400 font-medium">97.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">F1-Score:</span>
              <span className="text-emerald-400 font-medium">95.6%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">MAE:</span>
              <span className="text-orange-400 font-medium">0.018</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;