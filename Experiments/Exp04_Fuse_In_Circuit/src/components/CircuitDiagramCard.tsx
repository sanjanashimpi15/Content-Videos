import React from 'react';
import {Img, staticFile} from 'remotion';

export interface CircuitDiagramCardProps {
  expTitle: string;
  sourceFile?: string;
  width?: number;
}

export const CircuitDiagramCard: React.FC<CircuitDiagramCardProps> = ({
  expTitle,
  sourceFile = 'assets/circuit-diagram.png',
  width = 780
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#FFFFFF',
        borderRadius: 20,
        padding: '24px 32px',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        width
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          borderBottom: '2px solid #E0E0E0',
          paddingBottom: 12,
          marginBottom: 18
        }}
      >
        <div style={{fontSize: 18, fontWeight: 900, color: '#1A237E', letterSpacing: '0.04em'}}>
          WORKBOOK CIRCUIT DIAGRAM
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            background: '#E8EAF6',
            color: '#283593',
            padding: '4px 12px',
            borderRadius: 12
          }}
        >
          {expTitle}
        </div>
      </div>

      <div
        style={{
          background: '#F9FAFB',
          borderRadius: 12,
          padding: 16,
          border: '1px dashed #B0BEC5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Img
          src={staticFile(sourceFile)}
          style={{
            maxWidth: '100%',
            maxHeight: 420,
            objectFit: 'contain',
            borderRadius: 8
          }}
        />
      </div>

      <div
        style={{
          marginTop: 14,
          fontSize: 13,
          color: '#757575',
          fontStyle: 'italic',
          textAlign: 'center'
        }}
      >
        Official schematic from K2 Emico Circito Guidebook
      </div>
    </div>
  );
};
