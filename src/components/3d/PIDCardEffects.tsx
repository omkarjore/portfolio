import React from 'react';
import { Line } from '@react-three/drei';

interface PIDCardEffectsProps {
  position: [number, number, number];
  cardSize: [number, number, number];
  isHero: boolean;
  hovered: boolean;
  clicked: boolean;
}

export const PIDCardEffects: React.FC<PIDCardEffectsProps> = ({
  position,
  cardSize,
  isHero,
  hovered,
  clicked,
}) => {
  const color = isHero ? '#06b6d4' : '#3b82f6';

  return (
    <group position={position}>
      {/* Blueprint Grid Lines - appears on hover */}
      {hovered && (
        <>
          {/* Horizontal blueprint lines */}
          {[-1.5, -1, -0.5, 0, 0.5, 1, 1.5].map((y, i) => (
            <Line
              key={`h-${i}`}
              points={[
                [-cardSize[0] * 0.6, y, 0.1],
                [cardSize[0] * 0.6, y, 0.1],
              ]}
              color={color}
              lineWidth={1}
              transparent
              opacity={0.3}
            />
          ))}

          {/* Vertical blueprint lines */}
          {[-1, -0.5, 0, 0.5, 1].map((x, i) => (
            <Line
              key={`v-${i}`}
              points={[
                [x, -cardSize[1] * 0.6, 0.1],
                [x, cardSize[1] * 0.6, 0.1],
              ]}
              color={color}
              lineWidth={1}
              transparent
              opacity={0.3}
            />
          ))}
        </>
      )}

      {/* Technical Corner Brackets - appears on hover */}
      {hovered && (
        <>
          {/* Top-left corner */}
          <Line
            points={[
              [-cardSize[0] / 2 - 0.2, cardSize[1] / 2, 0.12],
              [-cardSize[0] / 2 - 0.2, cardSize[1] / 2 + 0.2, 0.12],
              [-cardSize[0] / 2, cardSize[1] / 2 + 0.2, 0.12],
            ]}
            color={color}
            lineWidth={2}
          />

          {/* Top-right corner */}
          <Line
            points={[
              [cardSize[0] / 2 + 0.2, cardSize[1] / 2, 0.12],
              [cardSize[0] / 2 + 0.2, cardSize[1] / 2 + 0.2, 0.12],
              [cardSize[0] / 2, cardSize[1] / 2 + 0.2, 0.12],
            ]}
            color={color}
            lineWidth={2}
          />

          {/* Bottom-left corner */}
          <Line
            points={[
              [-cardSize[0] / 2 - 0.2, -cardSize[1] / 2, 0.12],
              [-cardSize[0] / 2 - 0.2, -cardSize[1] / 2 - 0.2, 0.12],
              [-cardSize[0] / 2, -cardSize[1] / 2 - 0.2, 0.12],
            ]}
            color={color}
            lineWidth={2}
          />

          {/* Bottom-right corner */}
          <Line
            points={[
              [cardSize[0] / 2 + 0.2, -cardSize[1] / 2, 0.12],
              [cardSize[0] / 2 + 0.2, -cardSize[1] / 2 - 0.2, 0.12],
              [cardSize[0] / 2, -cardSize[1] / 2 - 0.2, 0.12],
            ]}
            color={color}
            lineWidth={2}
          />
        </>
      )}

      {/* P&ID Flow Lines - appears on click */}
      {clicked && (
        <>
          {/* Flow arrow line pointing to card */}
          <Line
            points={[
              [-cardSize[0], 0, 0.15],
              [-cardSize[0] / 2 - 0.3, 0, 0.15],
            ]}
            color="#10b981"
            lineWidth={3}
          />

          {/* Arrow head */}
          <mesh position={[-cardSize[0] / 2 - 0.3, 0, 0.15]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.1, 0.2, 3]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>

          {/* Instrumentation tag label */}
          <mesh position={[-cardSize[0] - 0.5, 0.3, 0.15]}>
            <boxGeometry args={[0.4, 0.2, 0.02]} />
            <meshBasicMaterial color={color} />
          </mesh>
        </>
      )}
    </group>
  );
};
