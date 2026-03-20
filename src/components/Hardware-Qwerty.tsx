import React from 'react';
import { motion } from 'framer-motion';

const Hardware: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex items-center justify-center" style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(120,80,255,0.15))' }}>
      {/* Phone body */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative"
        style={{
          width: 430,
          height: 910,
          borderRadius: 60,
          background: 'linear-gradient(160deg, #2a2a2e 0%, #111113 40%, #0a0a0c 100%)',
          boxShadow: '0 0 0 1.5px #3a3a3e, inset 0 0 0 1px rgba(255,255,255,0.07), 0 50px 100px rgba(0,0,0,0.8)',
          padding: 3,
        }}
      >
        {/* Inner bezel - ultra thin */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 57,
            background: '#000',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Screen content */}
          <div style={{ width: '100%', height: '100%', borderRadius: 57, overflow: 'hidden', position: 'relative' }}>
            {children}
          </div>

          {/* Front camera dot */}
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #1a1a2e, #000)',
              boxShadow: 'inset 0 0 4px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Lens reflection */}
            <div style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, rgba(80,80,255,0.5), rgba(0,0,40,0.9))',
            }} />
            <div style={{
              position: 'absolute',
              top: 2,
              left: 2,
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              filter: 'blur(0.5px)',
            }} />
          </div>
        </div>

        {/* Volume buttons LEFT - ultra thin */}
        <div style={{
          position: 'absolute',
          top: 160,
          left: -2,
          width: 2.5,
          height: 38,
          background: 'linear-gradient(180deg, #3a3a3e, #2a2a2e)',
          borderRadius: '2px 0 0 2px',
          boxShadow: '-1px 0 3px rgba(0,0,0,0.5)',
        }} />
        <div style={{
          position: 'absolute',
          top: 210,
          left: -2,
          width: 2.5,
          height: 60,
          background: 'linear-gradient(180deg, #3a3a3e, #2a2a2e)',
          borderRadius: '2px 0 0 2px',
          boxShadow: '-1px 0 3px rgba(0,0,0,0.5)',
        }} />
        <div style={{
          position: 'absolute',
          top: 282,
          left: -2,
          width: 2.5,
          height: 60,
          background: 'linear-gradient(180deg, #3a3a3e, #2a2a2e)',
          borderRadius: '2px 0 0 2px',
          boxShadow: '-1px 0 3px rgba(0,0,0,0.5)',
        }} />

        {/* Power button RIGHT - ultra thin */}
        <div style={{
          position: 'absolute',
          top: 200,
          right: -2,
          width: 2.5,
          height: 70,
          background: 'linear-gradient(180deg, #3a3a3e, #2a2a2e)',
          borderRadius: '0 2px 2px 0',
          boxShadow: '1px 0 3px rgba(0,0,0,0.5)',
        }} />

        {/* Bottom speaker grill */}
        <div style={{
          position: 'absolute',
          bottom: 18,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 4,
        }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{
              width: 2,
              height: 8,
              borderRadius: 1,
              background: 'rgba(255,255,255,0.12)',
            }} />
          ))}
        </div>

        {/* Top speaker */}
        <div style={{
          position: 'absolute',
          top: 18,
          left: '50%',
          transform: 'translateX(-50%) translateX(30px)',
          width: 40,
          height: 4,
          borderRadius: 2,
          background: 'rgba(255,255,255,0.08)',
        }} />

        {/* Shine effect on glass */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 57,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 10000,
        }} />
      </motion.div>
    </div>
  );
};

export default Hardware;
