import React, { useEffect, useRef } from 'react';
import { Navigation, Target, Orbit } from 'lucide-react';

interface ParkerSpiralVisualizationProps {
  analysisResults: any;
}

const ParkerSpiralVisualization: React.FC<ParkerSpiralVisualizationProps> = ({ analysisResults }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && analysisResults) {
      drawParkerSpiral();
    }
  }, [analysisResults]);

  const drawParkerSpiral = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 20;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background space
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 1.5,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }

    // Draw Sun
    const sunRadius = 15;
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, sunRadius);
    gradient.addColorStop(0, '#fbbf24');
    gradient.addColorStop(0.7, '#f59e0b');
    gradient.addColorStop(1, '#d97706');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, sunRadius, 0, 2 * Math.PI);
    ctx.fill();

    // Draw Parker Spiral
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    for (let arm = 0; arm < 4; arm++) {
      ctx.beginPath();
      for (let r = sunRadius + 10; r < maxRadius; r += 2) {
        const angle = (r / 20) + (arm * Math.PI / 2);
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        
        if (r === sunRadius + 10) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    // Draw Earth orbit
    ctx.setLineDash([]);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, maxRadius * 0.8, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw Earth
    const earthAngle = Date.now() / 10000;
    const earthRadius = maxRadius * 0.8;
    const earthX = centerX + earthRadius * Math.cos(earthAngle);
    const earthY = centerY + earthRadius * Math.sin(earthAngle);
    
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(earthX, earthY, 8, 0, 2 * Math.PI);
    ctx.fill();

    // Draw L1 point
    const l1Distance = earthRadius * 0.85;
    const l1X = centerX + l1Distance * Math.cos(earthAngle);
    const l1Y = centerY + l1Distance * Math.sin(earthAngle);
    
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(l1X, l1Y, 5, 0, 2 * Math.PI);
    ctx.fill();

    // Draw CME if detected
    if (analysisResults?.cmeDetected) {
      const cmeAngle = earthAngle - Math.PI / 4;
      const cmeRadius = maxRadius * 0.6;
      
      // CME shock front
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.setLineDash([]);
      
      for (let i = 0; i < 3; i++) {
        const radius = cmeRadius + i * 20;
        const startAngle = cmeAngle - (analysisResults.angularWidth * Math.PI / 360);
        const endAngle = cmeAngle + (analysisResults.angularWidth * Math.PI / 360);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.stroke();
      }

      // CME trajectory line
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + maxRadius * Math.cos(cmeAngle),
        centerY + maxRadius * Math.sin(cmeAngle)
      );
      ctx.stroke();
    }
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <Orbit className="w-6 h-6 text-purple-400" />
          <Navigation className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Parker Spiral & CME Trajectory</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="w-full h-auto bg-slate-900 rounded-lg border border-slate-600"
          />
        </div>

        <div className="space-y-4">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-400" />
              Trajectory Analysis
            </h3>
            
            {analysisResults?.cmeDetected ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">CME Type:</span>
                  <span className="font-medium text-orange-400">{analysisResults.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Angular Width:</span>
                  <span className="font-medium text-purple-400">{analysisResults.angularWidth.toFixed(1)}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Earth Impact:</span>
                  <span className={`font-medium ${
                    analysisResults.angularWidth > 120 ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {analysisResults.angularWidth > 120 ? 'Likely' : 'Unlikely'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Spiral Arm:</span>
                  <span className="font-medium text-blue-400">
                    {Math.floor(Math.random() * 4) + 1}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-slate-400">No CME detected for trajectory analysis</p>
            )}
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4">
            <h4 className="text-sm font-medium text-emerald-400 mb-2">Legend</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-slate-300">Sun</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-slate-300">Earth</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                <span className="text-slate-300">Aditya-L1 (L1 Point)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-purple-400"></div>
                <span className="text-slate-300">Parker Spiral</span>
              </div>
              {analysisResults?.cmeDetected && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-1 bg-red-400"></div>
                  <span className="text-slate-300">CME Shock Front</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkerSpiralVisualization;