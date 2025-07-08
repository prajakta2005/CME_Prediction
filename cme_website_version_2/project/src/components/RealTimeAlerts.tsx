import React, { useState, useEffect } from 'react';
import { AlertTriangle, Bell, Satellite, Radio, Shield, Clock, Zap } from 'lucide-react';

const RealTimeAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        // Simulate real-time alerts
        const newAlert = generateRandomAlert();
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }, 8000 + Math.random() * 12000);

      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const generateRandomAlert = () => {
    const alertTypes = [
      {
        type: 'CME_DETECTION',
        title: 'CME Event Detected',
        message: 'Halo CME detected with velocity 1,245 km/s',
        severity: 'HIGH',
        icon: AlertTriangle,
        color: 'text-red-400',
        bgColor: 'bg-red-900/20 border-red-500/30'
      },
      {
        type: 'SOLAR_FLARE',
        title: 'Solar Flare Activity',
        message: 'X2.1 class solar flare observed',
        severity: 'MEDIUM',
        icon: Zap,
        color: 'text-orange-400',
        bgColor: 'bg-orange-900/20 border-orange-500/30'
      },
      {
        type: 'GEOMAGNETIC_STORM',
        title: 'Geomagnetic Storm Warning',
        message: 'G3 storm conditions expected in 6 hours',
        severity: 'HIGH',
        icon: Shield,
        color: 'text-purple-400',
        bgColor: 'bg-purple-900/20 border-purple-500/30'
      },
      {
        type: 'SATELLITE_ANOMALY',
        title: 'Satellite Anomaly',
        message: 'Communication disruption on GPS constellation',
        severity: 'MEDIUM',
        icon: Satellite,
        color: 'text-blue-400',
        bgColor: 'bg-blue-900/20 border-blue-500/30'
      }
    ];

    const alert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    return {
      ...alert,
      id: Date.now() + Math.random(),
      timestamp: new Date(),
      source: 'Aditya-L1 SWIS'
    };
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-6 h-6 text-yellow-400" />
            {isMonitoring && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            )}
          </div>
          <h2 className="text-xl font-bold text-white">Real-Time Alerts</h2>
        </div>
        <button
          onClick={() => setIsMonitoring(!isMonitoring)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
            isMonitoring 
              ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' 
              : 'bg-slate-600/20 text-slate-400 hover:bg-slate-600/30'
          }`}
        >
          {isMonitoring ? 'MONITORING' : 'PAUSED'}
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center text-slate-400 py-8">
            <Radio className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No recent alerts</p>
            <p className="text-sm mt-1">System monitoring active</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const IconComponent = alert.icon;
            return (
              <div
                key={alert.id}
                className={`${alert.bgColor} backdrop-blur-md rounded-lg border p-4 transition-all hover:scale-[1.02]`}
              >
                <div className="flex items-start gap-3">
                  <IconComponent className={`w-5 h-5 ${alert.color} mt-0.5 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white text-sm">{alert.title}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        alert.severity === 'HIGH' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-orange-500/20 text-orange-400'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">{alert.message}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{alert.source}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Alert Statistics */}
      <div className="mt-6 pt-4 border-t border-slate-600/30">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-red-400">{alerts.filter(a => a.severity === 'HIGH').length}</div>
            <div className="text-xs text-slate-400">High Priority</div>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-400">{alerts.filter(a => a.severity === 'MEDIUM').length}</div>
            <div className="text-xs text-slate-400">Medium Priority</div>
          </div>
          <div>
            <div className="text-lg font-bold text-emerald-400">{alerts.length}</div>
            <div className="text-xs text-slate-400">Total Alerts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeAlerts;