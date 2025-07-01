import Link from 'next/link';
import React from 'react';
import BurningEffectWrapper from '@/components/common/BurningEffectWrapper';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c0c0c] to-[#151515] text-white font-sans antialiased">
      <div className="min-h-screen flex flex-col px-6 py-16">
        <div className="text-center mb-12"> 
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 font-dancing-script">
            Secret Not Found
          </h1>
          <p className="text-neutral-400 text-sm max-w-md mx-auto font-roboto">
            The secret you're looking for doesn't exist or has expired.
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center gap-6">
          <div className="w-full max-w-4xl">
            <div className="flex items-center gap-4 text-xs text-neutral-500 bg-[#121212] px-6 py-4 rounded-xl border border-[#2a2a2a]">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono">Secret unavailable • {new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="w-full max-w-4xl bg-[#121212] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 bg-[#1e1e1e] border-b border-[#2a2a2a]">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/90" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/90" />
                <span className="h-3 w-3 rounded-full bg-green-500/90" />
              </div>
              <span className="ml-4 text-neutral-400 text-xs font-mono">secret_not_found.json</span>
            </div>
            
            <div className="p-8 bg-[#0e0e0e] overflow-auto flex flex-col items-center">
              <div className="text-center mt-4">
                <h2 className="text-xl font-bold text-white mb-3">This secret has vanished</h2>
                <p className="text-neutral-400 text-sm max-w-md mb-8">
                  It may have been deleted by the creator, reached its expiration time, or never existed.
                </p>
                <BurningEffectWrapper />
              </div>
              
              <Link 
                href="/"
                className="mt-2 px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 
                text-white rounded-xl font-medium transition-all duration-200 shadow-lg flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Create a new secret
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-3xl rounded-lg bg-[#121212] text-neutral-500 text-xs px-4 py-3 border border-[#2a2a2a] shadow-sm font-mono tracking-tight">
        © 2025 SecureContent · Secure delivery
      </div>
    </div>
  );
}