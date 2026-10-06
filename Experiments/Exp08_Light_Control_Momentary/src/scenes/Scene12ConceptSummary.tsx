import React from 'react';
import {Audio, staticFile} from 'remotion';

export const Scene12ConceptSummary: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 80px',
        fontFamily: 'Inter, system-ui, sans-serif',
        boxSizing: 'border-box'
      }}
    >
      <Audio src={staticFile('audio/scene-12.mp3')} />

      <div
        style={{
          background: '#EEF2FF',
          color: '#4F46E5',
          fontSize: 14,
          fontWeight: 800,
          padding: '6px 18px',
          borderRadius: 999,
          letterSpacing: 1.5,
          marginBottom: 12
        }}
      >
        WORKBOOK LOGIC FLOW
      </div>

      <div
        style={{
          fontSize: 42,
          fontWeight: 900,
          color: '#0F172A',
          marginBottom: 48
        }}
      >
        Cause & Effect of Momentary Switching
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          maxWidth: 1200,
          width: '100%'
        }}
      >
        {/* Column 1: Press sequence */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 36,
            border: '2px solid #3B82F6',
            boxShadow: '0 12px 36px rgba(59, 130, 246, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16
          }}
        >
          <div
            style={{
              background: '#EFF6FF',
              border: '2px solid #3B82F6',
              borderRadius: 12,
              padding: '12px 32px',
              fontSize: 22,
              fontWeight: 900,
              color: '#1D4ED8',
              width: '80%',
              textAlign: 'center'
            }}
          >
            PRESS SWITCH
          </div>

          <div style={{fontSize: 28, color: '#3B82F6', fontWeight: 900}}>↓</div>

          <div
            style={{
              background: '#EFF6FF',
              border: '2px solid #3B82F6',
              borderRadius: 12,
              padding: '12px 32px',
              fontSize: 22,
              fontWeight: 900,
              color: '#1D4ED8',
              width: '80%',
              textAlign: 'center'
            }}
          >
            CLOSED CIRCUIT
          </div>

          <div style={{fontSize: 28, color: '#3B82F6', fontWeight: 900}}>↓</div>

          <div
            style={{
              background: '#FEF2F2',
              border: '2px solid #EF4444',
              borderRadius: 12,
              padding: '14px 32px',
              fontSize: 24,
              fontWeight: 900,
              color: '#DC2626',
              width: '80%',
              textAlign: 'center',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.25)'
            }}
          >
            LED ON
          </div>
        </div>

        {/* Column 2: Release sequence */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 36,
            border: '2px solid #CBD5E1',
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16
          }}
        >
          <div
            style={{
              background: '#F1F5F9',
              border: '2px solid #64748B',
              borderRadius: 12,
              padding: '12px 32px',
              fontSize: 22,
              fontWeight: 900,
              color: '#334155',
              width: '80%',
              textAlign: 'center'
            }}
          >
            RELEASE SWITCH
          </div>

          <div style={{fontSize: 28, color: '#64748B', fontWeight: 900}}>↓</div>

          <div
            style={{
              background: '#F1F5F9',
              border: '2px solid #64748B',
              borderRadius: 12,
              padding: '12px 32px',
              fontSize: 22,
              fontWeight: 900,
              color: '#334155',
              width: '80%',
              textAlign: 'center'
            }}
          >
            OPEN CIRCUIT
          </div>

          <div style={{fontSize: 28, color: '#64748B', fontWeight: 900}}>↓</div>

          <div
            style={{
              background: '#F8FAFC',
              border: '2px solid #94A3B8',
              borderRadius: 12,
              padding: '14px 32px',
              fontSize: 24,
              fontWeight: 900,
              color: '#64748B',
              width: '80%',
              textAlign: 'center'
            }}
          >
            LED OFF
          </div>
        </div>
      </div>
    </div>
  );
};
