import React, { useState } from 'react';
import { Calendar, Clock, Activity, AlertTriangle, TrendingUp, Zap, Sun, Satellite, Brain, Bell, BarChart3 } from 'lucide-react';
import Dashboard from './components/Dashboard';
import CMEEventInput from './components/CMEEventInput';
import LastCMEDetails from './components/LastCMEDetails';
import GraphsSection from './components/GraphsSection';
import GeminiAnalysis from './components/GeminiAnalysis';
import RealTimeAlerts from './components/RealTimeAlerts';
import ModelComparison from './components/ModelComparison';
import ParkerSpiralVisualization from './components/ParkerSpiralVisualization';
import TechnicalDetails from './components/TechnicalDetails';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const handleDateTimeSubmit = (date: Date) => {
    setSelectedDate(date);
    // Simulate analysis results
    setAnalysisResults({
      cmeDetected: Math.random() > 0.7,
      confidence: Math.random() * 100,
      intensity: Math.random() * 10,
      estimatedArrival: new Date(date.getTime() + (6 + Math.random() * 2) * 60 * 60 * 1000),
      angularWidth: 90 + Math.random() * 270,
      velocity: 300 + Math.random() * 1200,
      type: ['Partial', 'Halo', 'Full Halo'][Math.floor(Math.random() * 3)]
    });
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'gemini', label: 'AI Analysis', icon: Brain },
    { id: 'alerts', label: 'Live Alerts', icon: Bell },
    { id: 'comparison', label: 'Model Comparison', icon: BarChart3 },
    { id: 'trajectory', label: 'Parker Spiral', icon: TrendingUp },
    { id: 'technical', label: 'Technical Details', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-slate-800/30 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Sun className="w-8 h-8 text-orange-400 animate-spin" style={{ animationDuration: '20s' }} />
                  <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-md"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                    Aditya-L1 Advanced CME Detection & Prevention System
                  </h1>
                  <p className="text-sm text-slate-300">SWIS-ASPEX Payload • AI-Powered Space Weather Protection</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 text-emerald-400">
              <img 
                src="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" 
                // make changes in path 
                // src = "project/public/images/Solarithm_image.jpg"
                // src = "C:/Users/TANISHQ/ THUSE/Desktop/PROJECTS_ALL/cme_website_version_2/project/public/images/Solarithm_image.jpg"
                alt="Solarithm" 
                className="w-8 h-8 rounded-full object-cover border border-emerald-400/30"
              />
              <span className="text-sm font-medium">Solarithm</span>
            </div>

                {/* <div className="flex items-center gap-2 text-emerald-400">
                  <Satellite className="w-5 h-5" />
                  <span className="text-sm font-medium">L1 ACTIVE</span>
                </div> */}
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 bg-slate-800/30 backdrop-blur-md rounded-xl p-2 border border-purple-500/20">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Controls */}
            <div className="lg:col-span-1 space-y-6">
              <CMEEventInput onSubmit={handleDateTimeSubmit} />
              {activeTab === 'alerts' ? <RealTimeAlerts /> : <LastCMEDetails />}
            </div>

            {/* Right Column - Dynamic Content */}
            <div className="lg:col-span-2">
              {activeTab === 'dashboard' && (
                <Dashboard 
                  selectedDate={selectedDate}
                  analysisResults={analysisResults}
                />
              )}
              {activeTab === 'gemini' && (
                <GeminiAnalysis 
                  selectedDate={selectedDate}
                  analysisResults={analysisResults}
                />
              )}
              {activeTab === 'alerts' && (
                <div className="space-y-6">
                  <Dashboard 
                    selectedDate={selectedDate}
                    analysisResults={analysisResults}
                  />
                </div>
              )}
              {activeTab === 'comparison' && <ModelComparison />}
              {activeTab === 'trajectory' && (
                <ParkerSpiralVisualization analysisResults={analysisResults} />
              )}
              {activeTab === 'technical' && <TechnicalDetails />}
            </div>
          </div>

          {/* Graphs Section */}
          {(activeTab === 'dashboard' || activeTab === 'gemini') && (
            <div className="mt-8">
              <GraphsSection selectedDate={selectedDate} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;