import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import N8nChat from "../components/N8nChat";




export default function Layout() {
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('offline');
  const [isChecking, setIsChecking] = useState(false);

  // Función para verificar el estado del servidor solo cuando se presiona el botón
  const checkServerStatus = async () => {
  setIsChecking(true);
  setServerStatus('checking');

  try {
    const url = `${import.meta.env.VITE_API_URL}/api/health`;
    const { data } = await axios.get(url);
    if (data.status === 'OK' && data.database === 'connected') {
      setServerStatus('online');
    } else {
      setServerStatus('offline');
    }
  } catch (error) {
    console.error(error);
    setServerStatus('offline');
  } finally {
    setIsChecking(false);
  }
};

  return (
    <>
      {/* Header with glass morphism effect */}
      <header className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 backdrop-blur-lg shadow-2xl sticky top-0 z-50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo Section with animated glow */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-16 h-16 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                />
              </Link>

              {/* Title with modern typography */}
              <div className="flex flex-col">
                <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-gray-300 bg-clip-text text-transparent">
                  Product Manager
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${
                    serverStatus === 'online' ? 'bg-emerald-400' : 
                    serverStatus === 'offline' ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'
                  }`}></div>
                  <span className="text-slate-400 text-sm font-medium tracking-wide">
                    Administration System
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - Status and Actions */}
            <div className="hidden sm:flex items-center space-x-6">
              {/* Server Status Indicator */}
              <div className="flex items-center space-x-4 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    serverStatus === 'online' ? 'bg-emerald-400' : 
                    serverStatus === 'offline' ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'
                  }`}></div>
                  <span className="text-slate-300 text-sm">
                    {serverStatus === 'online' ? 'Server Online' : 
                     serverStatus === 'offline' ? 'Server Offline' : 'Checking...'}
                  </span>
                </div>
                
                {/* Botón para verificar manualmente */}
                <button 
                  onClick={checkServerStatus}
                  className={`text-slate-400 hover:text-slate-200 transition-colors ${
                    isChecking ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  title="Check server status"
                  disabled={isChecking}
                >
                  {isChecking ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile menu indicator */}
            <div className="sm:hidden">
              <div className="w-6 h-6 text-slate-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent)] pointer-events-none"></div>

        <Outlet />
      </main>

      {/* Aquí se monta el chat */}
      <N8nChat />
    </>
  );
}