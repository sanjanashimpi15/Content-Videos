import React from 'react';
import {Audio, staticFile} from 'remotion';
import {HeaderBanner} from '../components/Labels';

export const Scene08Explanation: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F8FAFC',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-08.mp3')} />

      <HeaderBanner
        expNumber="EXPERIMENT 01"
        title="Key Educational Concepts"
        subtitle="Energy source, conversion of energy, and uni-directional flow"
      />

      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 80,
          right: 80,
          bottom: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: 40
        }}
      >
        {/* Card 1: Battery Power */}
        <div
          style={{
            flex: 1,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '32px 28px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: '#3B82F6',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 8
            }}
          >
            Energy Source
          </div>
          <div style={{fontSize: 24, fontWeight: 900, color: '#1E293B', marginBottom: 16}}>
            3V Battery
          </div>
          <div style={{fontSize: 16, color: '#475569', lineHeight: 1.6, flex: 1}}>
            <p>• The battery is the source of electricity and power supply in the circuit.</p>
            <p>• It provides voltage (potential difference) and current.</p>
            <p>• <strong>3V</strong> stands for 3 volts. Without an energy source, no circuit can function.</p>
          </div>
          <div
            style={{
              background: '#EFF6FF',
              padding: '12px 16px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 700,
              color: '#1D4ED8'
            }}
          >
            ⚡ Source of Voltage & Current
          </div>
        </div>

        {/* Card 2: LED Output */}
        <div
          style={{
            flex: 1,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '32px 28px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: '#EF4444',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 8
            }}
          >
            Output Device
          </div>
          <div style={{fontSize: 24, fontWeight: 900, color: '#1E293B', marginBottom: 16}}>
            LED – Red
          </div>
          <div style={{fontSize: 16, color: '#475569', lineHeight: 1.6, flex: 1}}>
            <p>• <strong>LED</strong> stands for Light Emitting Diode.</p>
            <p>• It is an output device that converts electrical energy into light energy.</p>
            <p>• Energy conversion takes place: electrical ➔ light.</p>
          </div>
          <div
            style={{
              background: '#FEF2F2',
              padding: '12px 16px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 700,
              color: '#B91C1C'
            }}
          >
            💡 Electrical ➔ Light Energy
          </div>
        </div>

        {/* Card 3: Uni-directional Diode */}
        <div
          style={{
            flex: 1,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '32px 28px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            border: '2px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: '#8B5CF6',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 8
            }}
          >
            Property
          </div>
          <div style={{fontSize: 24, fontWeight: 900, color: '#1E293B', marginBottom: 16}}>
            Uni-directional
          </div>
          <div style={{fontSize: 16, color: '#475569', lineHeight: 1.6, flex: 1}}>
            <p>• An LED only allows current to flow in one direction: from anode (P) to cathode (N).</p>
            <p>• Components that allow current in one direction only are called <strong>uni-directional</strong>.</p>
            <p>• Reverse connection blocks current flow.</p>
          </div>
          <div
            style={{
              background: '#F5F3FF',
              padding: '12px 16px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 700,
              color: '#6D28D9'
            }}
          >
            ➔ Flows Anode (P) to Cathode (N)
          </div>
        </div>
      </div>
    </div>
  );
};
