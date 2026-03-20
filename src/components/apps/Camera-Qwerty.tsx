import React, { useEffect, useRef, useState } from 'react';
import { CameraOff, RefreshCw, X } from 'lucide-react';

const CameraApp: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isFront, setIsFront] = useState(true);

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: isFront ? 'user' : 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        console.error("Camera error:", err);
        setHasPermission(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isFront]);

  return (
    <div className="flex flex-col h-full bg-black text-white relative">
      <div className="flex-1 bg-zinc-900 overflow-hidden flex items-center justify-center relative">
        {hasPermission === false ? (
          <div className="flex flex-col items-center gap-4 text-center p-8">
             <CameraOff size={64} className="text-zinc-600" />
             <p className="text-sm opacity-60">Нет доступа к камере или устройство не поддерживается</p>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover scale-x-[-1]" 
          />
        )}
        
        {/* Optical Lens Decoration Overlay */}
        <div className="absolute inset-0 pointer-events-none border-[40px] border-black/20" />
      </div>

      {/* Controls */}
      <div className="h-40 bg-black flex items-center justify-around px-12">
        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
           <RefreshCw size={24} onClick={() => setIsFront(!isFront)} className="cursor-pointer" />
        </div>
        
        <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1">
           <div className="w-full h-full bg-white rounded-full active:scale-90 transition-transform cursor-pointer" />
        </div>

        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
           <div className="w-full h-full bg-indigo-500/20 flex items-center justify-center"><X size={20} /></div>
        </div>
      </div>

      {/* Camera Modes */}
      <div className="h-10 flex items-center justify-center gap-6 text-[10px] uppercase font-black tracking-widest text-zinc-500">
         <span>Slow-mo</span>
         <span>Video</span>
         <span className="text-yellow-400">Photo</span>
         <span>Portrait</span>
         <span>Pano</span>
      </div>
    </div>
  );
};

export default CameraApp;
