import React from 'react';
import {Audio, staticFile} from 'remotion';
import {InfoCard} from '../components/Labels';

export const Scene09SeriesExplanation: React.FC = () => {
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
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '0 80px'
      }}
    >
      <Audio src={staticFile('audio/scene-09.mp3')} />

      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: '#4F46E5',
          letterSpacing: 2,
          marginBottom: 12
        }}
      >
        WORKBOOK LESSON
      </div>

      <div
        style={{
          fontSize: 48,
          fontWeight: 900,
          color: '#0F172A',
          marginBottom: 44,
          textAlign: 'center'
        }}
      >
        How Voltage Divides in Series
      </div>

      <div style={{display: 'flex', gap: 36, width: '100%', maxWidth: 1150}}>
        <InfoCard
          badge="DEFINITION"
          title="Components in Series"
          points={[
            "Two or more components are in 'Series' if connected one after another without another connection in between.",
            "There is only ONE single continuous path for electricity to flow through the entire circuit.",
            "Current passing through all components in a series line remains exactly the same."
          ]}
          style={{flex: 1}}
        />

        <InfoCard
          badge="VOLTAGE DIVISION"
          title="Why the LEDs Do Not Glow"
          points={[
            "In a Series circuit, the total voltage of the 3V Battery gets divided across the components.",
            "Each LED receives only approximately 1.5 Volts.",
            "Because 1.5V is below the required forward operating voltage for each LED, neither LED can turn on!"
          ]}
          style={{flex: 1}}
        />
      </div>
    </div>
  );
};
