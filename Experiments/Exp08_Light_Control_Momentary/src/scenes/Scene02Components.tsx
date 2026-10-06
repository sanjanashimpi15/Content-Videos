import React from 'react';
import {Audio, staticFile} from 'remotion';
import {ComponentCard} from '../components/Labels';
import {Epod} from '../components/Epod';

export const Scene02Components: React.FC = () => {
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
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <Audio src={staticFile('audio/scene-02.mp3')} />

      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: '#4F46E5',
          letterSpacing: 2,
          marginBottom: 8
        }}
      >
        REQUIRED COMPONENTS
      </div>

      <div
        style={{
          fontSize: 44,
          fontWeight: 900,
          color: '#0F172A',
          marginBottom: 48
        }}
      >
        ePods & Jump Wires
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 28,
          maxWidth: 1400,
          width: '90%'
        }}
      >
        {/* Battery */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div
            style={{
              height: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16
            }}
          >
            <Epod type="battery" scale={0.8} rotation={0} />
          </div>
          <ComponentCard
            name="3V Battery ePod"
            count="1x"
            detail="3V Coin-cell power source"
            color="#2563EB"
            delay={0}
            style={{width: '100%'}}
          />
        </div>

        {/* Tact Switch */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div
            style={{
              height: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16
            }}
          >
            <Epod type="tact-switch" scale={0.65} rotation={0} />
          </div>
          <ComponentCard
            name="Tact Switch ePod"
            count="1x"
            detail="Push button (Terminals A & B)"
            color="#4F46E5"
            delay={10}
            style={{width: '100%'}}
          />
        </div>

        {/* LED Red */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div
            style={{
              height: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16
            }}
          >
            <Epod type="led-red" scale={0.8} rotation={0} />
          </div>
          <ComponentCard
            name="LED – Red ePod"
            count="1x"
            detail="Controlled output indicator"
            color="#DC2626"
            delay={20}
            style={{width: '100%'}}
          />
        </div>

        {/* 3 Jump Wires */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div
            style={{
              height: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16
            }}
          >
            <img
              src={staticFile('assets/jumper-wires.png')}
              alt="Jumper Wires"
              style={{maxHeight: 180, objectFit: 'contain'}}
            />
          </div>
          <ComponentCard
            name="Jump Wires"
            count="3x"
            detail="3 connecting jumper wires"
            color="#D97706"
            delay={30}
            style={{width: '100%'}}
          />
        </div>
      </div>
    </div>
  );
};
