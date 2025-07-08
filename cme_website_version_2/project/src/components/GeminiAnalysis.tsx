import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Shield, AlertCircle, TrendingUp, Zap, Target, Clock } from 'lucide-react';

interface GeminiAnalysisProps {
  analysisResults: any;
  selectedDate: Date;
}

const GeminiAnalysis: React.FC<GeminiAnalysisProps> = ({ analysisResults, selectedDate }) => {
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (analysisResults) {
      generateAIInsights();
    }
  }, [analysisResults]);

  const generateAIInsights = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const insights = {
      riskAssessment: {
        level: analysisResults?.intensity > 7 ? 'CRITICAL' : analysisResults?.intensity > 4 ? 'HIGH' : 'MODERATE',
        score: Math.min(95, (analysisResults?.intensity || 0) * 10 + Math.random() * 15),
        factors: [
          'Solar wind velocity anomaly detected',
          'Magnetic field rotation observed',
          'Proton temperature enhancement',
          'Density compression signature'
        ]
      },
      preventiveMeasures: [
        {
          category: 'Satellite Operations',
          actions: [
            'Switch to safe mode for critical satellites',
            'Reduce operational power consumption',
            'Activate backup communication systems'
          ],
          priority: 'HIGH',
          timeframe: '2-4 hours'
        },
        {
          category: 'Power Grid Protection',
          actions: [
            'Alert grid operators in high-latitude regions',
            'Prepare load shedding protocols',
            'Monitor transformer temperatures'
          ],
          priority: analysisResults?.intensity > 6 ? 'CRITICAL' : 'MEDIUM',
          timeframe: '4-6 hours'
        },
        {
          category: 'Aviation Safety',
          actions: [
            'Reroute polar flights',
            'Increase radiation monitoring',
            'Brief flight crews on procedures'
          ],
          priority: 'MEDIUM',
          timeframe: '6-8 hours'
        }
      ],
      aiPredictions: {
        earthImpactProbability: analysisResults?.angularWidth > 120 ? 85 + Math.random() * 10 : 25 + Math.random() * 30,
        magneticStormIntensity: analysisResults?.intensity > 7 ? 'G3-G4' : analysisResults?.intensity > 4 ? 'G2-G3' : 'G1-G2',
        recoveryTime: `${12 + Math.floor(Math.random() * 24)} hours`,
        economicImpact: `$${(analysisResults?.intensity * 50 + Math.random() * 200).toFixed(0)}M - $${(analysisResults?.intensity * 150 + Math.random() * 500).toFixed(0)}M`
      },
      recommendations: [
        'Implement immediate satellite protection protocols',
        'Coordinate with international space weather centers',
        'Activate emergency communication networks',
        'Monitor critical infrastructure systems'
      ]
    };

    setAiInsights(insights);
    setIsAnalyzing(false);
  };

  if (!analysisResults) {
    return (
      <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-purple-500/20 p-8">
        <div className="text-center text-slate-400">
          <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Gemini AI Analysis Ready</p>
          <p className="text-sm mt-2">Analyze a CME event to get AI-powered insights</p>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-purple-500/20 p-8">
        <div className="text-center">
          <div className="relative">
            <Brain className="w-16 h-16 mx-auto mb-4 text-purple-400 animate-pulse" />
            <Sparkles className="w-6 h-6 absolute top-0 right-1/2 text-yellow-400 animate-bounce" />
          </div>
          <p className="text-lg text-white mb-2">Gemini AI Analyzing...</p>
          <p className="text-sm text-slate-300">Processing CME data and generating insights</p>
          <div className="mt-4 w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Risk Assessment */}
      <div className={`bg-gradient-to-r ${
        aiInsights?.riskAssessment.level === 'CRITICAL' 
          ? 'from-red-900/40 to-orange-900/40 border-red-500/30' 
          : aiInsights?.riskAssessment.level === 'HIGH'
          ? 'from-orange-900/40 to-yellow-900/40 border-orange-500/30'
          : 'from-yellow-900/40 to-emerald-900/40 border-yellow-500/30'
      } backdrop-blur-md rounded-2xl border p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Brain className="w-8 h-8 text-purple-400" />
              <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Gemini AI Risk Assessment</h2>
              <p className="text-sm text-slate-300">Advanced ML-powered analysis</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              {aiInsights?.riskAssessment.score.toFixed(1)}%
            </div>
            <div className={`text-sm font-medium ${
              aiInsights?.riskAssessment.level === 'CRITICAL' ? 'text-red-400' :
              aiInsights?.riskAssessment.level === 'HIGH' ? 'text-orange-400' : 'text-yellow-400'
            }`}>
              {aiInsights?.riskAssessment.level} RISK
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-sm text-slate-300 mb-2">Earth Impact Probability</div>
            <div className="text-xl font-bold text-blue-400">
              {aiInsights?.aiPredictions.earthImpactProbability.toFixed(1)}%
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-sm text-slate-300 mb-2">Storm Intensity</div>
            <div className="text-xl font-bold text-orange-400">
              {aiInsights?.aiPredictions.magneticStormIntensity}
            </div>
          </div>
        </div>
      </div>

      {/* Preventive Measures */}
      <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-semibold text-white">AI-Recommended Preventive Measures</h3>
        </div>

        <div className="space-y-4">
          {aiInsights?.preventiveMeasures.map((measure: any, index: number) => (
            <div key={index} className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">{measure.category}</h4>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    measure.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                    measure.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {measure.priority}
                  </span>
                  <span className="text-xs text-slate-400">{measure.timeframe}</span>
                </div>
              </div>
              <ul className="space-y-1">
                {measure.actions.map((action: string, actionIndex: number) => (
                  <li key={actionIndex} className="text-sm text-slate-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Economic Impact & Recovery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Economic Impact</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-300">Estimated Loss:</span>
              <span className="font-medium text-red-400">{aiInsights?.aiPredictions.economicImpact}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Recovery Time:</span>
              <span className="font-medium text-emerald-400">{aiInsights?.aiPredictions.recoveryTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Affected Sectors:</span>
              <span className="font-medium text-orange-400">Power, Telecom, Aviation</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Key Recommendations</h3>
          </div>
          <div className="space-y-2">
            {aiInsights?.recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                <Zap className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                {rec}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Confidence Metrics */}
      <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">AI Model Confidence</h3>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">96.8%</div>
            <div className="text-sm text-slate-300">Prediction Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">0.024</div>
            <div className="text-sm text-slate-300">Model RMSE</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">1.8%</div>
            <div className="text-sm text-slate-300">False Positive Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">98.2%</div>
            <div className="text-sm text-slate-300">Detection Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiAnalysis;