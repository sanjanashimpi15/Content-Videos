import React from 'react';
import {Audio, staticFile} from 'remotion';
import {InfoCard} from '../components/Labels';

export const Scene02Objective: React.FC = () => {
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
      <Audio src={staticFile('audio/scene-02.mp3')} />

      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: '#4F46E5',
          letterSpacing: 2,
          marginBottom: 12
        }}
      >
        EXPERIMENT OBJECTIVE
      </div>

      <div
        style={{
          fontSize: 48,
          fontWeight: 900,
          color: '#0F172A',
          marginBottom: 48,
          textAlign: 'center'
        }}
      >
        Understanding the Series Circuit
      </div>

      <div style={{display: 'flex', gap: 36, width: '100%', maxWidth: 1100}}>
        <InfoCard
          badge="SOURCE PURPOSE"
          title="Workbook Objective"
          points={[
            "To see the effect on 2 LEDs connected one after another.",
            "To learn how electric current and voltage behave in a Series circuit.",
            "To observe whether a single 3V Battery provides enough voltage for both LEDs."
          ]}
          style={{flex: 1}}
        />

        <InfoCard
          badge="KEY CONCEPT"
          title="What is a Series Circuit?"
          points={[
            "Components are connected end-to-end along a single path.",
            "Electricity has only one route to flow from positive to negative.",
            "Voltage divides among series components, while current remains identical throughout."
          ]}
          style={{flex: 1}}
        />
      </div>
    </div>
  );
};
