// RouteLife AI - Main Application Component - Updated: 2026-02-03 22:25
import { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import GlassCard from './components/GlassCard';
import { Shield, Navigation, AlertTriangle, PhoneCall, Ambulance } from 'lucide-react';
import { useWebSocket } from './hooks/useWebSocket';

function App() {
  const [emergencyStatus, setEmergencyStatus] = useState<'LIVE' | 'ALERT'>('LIVE');
  const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws/alerts';
  const { lastMessage } = useWebSocket(wsUrl);
  const [currentAlert, setCurrentAlert] = useState<string>("Waiting for AI analysis...");

  useEffect(() => {
    if (lastMessage) {
      if (lastMessage.type === 'EMERGENCY_REROUTE') {
        setEmergencyStatus('ALERT');
        setCurrentAlert(lastMessage.data);
      }
    }
  }, [lastMessage]);

  const handleReroute = async () => {
    try {
      setEmergencyStatus('ALERT');
      setCurrentAlert("AI is calculating optimal route...");
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      await fetch(`${apiUrl}/analyze-traffic`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: "Bengaluru Palace",
          destination: "Manipal Hospital"
        })
      });
    } catch (e) {
      console.error("Failed to trigger reroute", e);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      {/* Background Map */}
      <div className="absolute inset-0 z-0">
        <MapComponent />
      </div>

      {/* Header Overlay */}
      <header className="absolute top-0 left-0 right-0 p-4 z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,49,49,0.5)]">
              <Ambulance size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">RouteLife <span className="text-red-500">AI</span></h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Emergency Management</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <GlassCard className="!py-2 !px-4 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${emergencyStatus === 'ALERT' ? 'bg-red-500 shadow-[0_0_8px_#ff3131]' : 'bg-green-500 shadow-[0_0_8px_#00ff41]'}`} />
              <span className="text-xs font-bold">{emergencyStatus}</span>
            </GlassCard>

            <select className="bg-transparent border border-white/10 rounded-lg text-xs p-2 glass-card outline-none">
              <option value="bengaluru">Bengaluru</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
            </select>
          </div>
        </div>
      </header>

      {/* Left Sidebar Overlay */}
      <div className="absolute left-4 top-24 bottom-4 w-80 z-20 flex flex-col gap-4 pointer-events-none">
        <div className="pointer-events-auto contents">
          <GlassCard title="Ambulance Status" className="border-l-4 border-l-blue-500">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-400">Driver</p>
                  <p className="font-semibold text-sm">Rakesh Kumar</p>
                </div>
                <p className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">ID: AMB-402</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Navigation size={14} className="text-blue-500" />
                <span>En route to Manipal Hospital</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard title="AI Traffic Analysis" className="border-l-4 border-l-red-500 bg-red-500/5">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="mt-1">
                  <AlertTriangle size={18} className="text-red-500 shadow-sm" />
                </div>
                <div>
                  <p className="text-xs font-bold text-red-500 uppercase tracking-tighter">Congestion Detected</p>
                  <p className="text-sm mt-1 leading-relaxed">
                    {currentAlert}
                  </p>
                </div>
              </div>

              <button
                onClick={handleReroute}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-900/40 pointer-events-auto"
              >
                Reroute Now
              </button>
            </div>
          </GlassCard>

          <GlassCard title="Emergency Contacts" className="mt-auto">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-blue-400" />
                  <div className="text-[10px]">
                    <p className="font-bold">Indiranagar Police</p>
                    <p className="text-gray-500">0.8 km away</p>
                  </div>
                </div>
                <button className="p-2 bg-red-500/20 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all">
                  <PhoneCall size={14} />
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Bottom Floating Stats */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-3 items-end pointer-events-none">
        <div className="pointer-events-auto">
          <GlassCard className="inline-block">
            <div className="flex gap-6 px-2">
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase">ETA</p>
                <p className="text-xl font-bold">12 <span className="text-xs font-normal">min</span></p>
              </div>
              <div className="w-[1px] bg-white/10" />
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase">Distance</p>
                <p className="text-xl font-bold">4.2 <span className="text-xs font-normal">km</span></p>
              </div>
              <div className="w-[1px] bg-white/10" />
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase">Traffic</p>
                <p className="text-xl font-bold text-red-500">HEAVY</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export default App;
