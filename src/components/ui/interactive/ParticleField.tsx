'use client';

/**
 * ParticleField Component
 * 
 * This component renders an interactive 3D particle system using Three.js and React Three Fiber.
 * It features mouse interaction (repulsion/imprint) and a wave-like ambient animation.
 * In dark mode, particles transform into a twinkling starfield.
 * 
 * TWEAKABLE AREAS are marked with [TWEAK] comments.
 */

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

const ParticleSystem = () => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    // [TWEAK] Number of particles. 
    // Higher = denser field but more performance cost. 
    // Lower = sparser field, faster performance.
    // Try: 5000 for mobile, 15000 for high-end desktop.
    const count = isDark ? 10000 : 8000; // More particles for starfield

    const mesh = useRef<THREE.Points>(null);
    const { viewport } = useThree();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const twinkle = new Float32Array(count); // Random offset for twinkling

        for (let i = 0; i < count; i++) {
            // [TWEAK] Particle Spread / Distribution
            positions[i * 3] = (Math.random() - 0.5) * 20; // x spread
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y spread
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z depth

            // [TWEAK] Base Size randomization
            // In dark mode, more varied sizes for realistic stars
            sizes[i] = isDark ? Math.random() * Math.random() : Math.random();

            // Random phase for twinkling (dark mode only)
            twinkle[i] = Math.random() * Math.PI * 2;
        }

        return { positions, sizes, twinkle };
    }, [count, isDark]);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        // [TWEAK] Particle Color - changes based on theme
        uColor: { value: isDark ? new THREE.Color('#FFFFFF') : new THREE.Color('#60A5FA') },
        uIsDark: { value: isDark ? 1.0 : 0.0 },
    }), [isDark]);

    // Update uniforms when theme changes
    useEffect(() => {
        if (mesh.current) {
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uColor.value =
                isDark ? new THREE.Color('#FFFFFF') : new THREE.Color('#60A5FA');
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uIsDark.value = isDark ? 1.0 : 0.0;
        }
    }, [isDark]);

    useFrame((state) => {
        const { clock, pointer } = state;
        if (mesh.current) {
            // Update time
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();

            // Update mouse position (lerp for smoothness)
            const targetMouse = new THREE.Vector2(pointer.x * viewport.width / 2, pointer.y * viewport.height / 2);
            // [TWEAK] Mouse Follow Smoothness/Lag
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(targetMouse, 0.1);
        }
    });

    // Custom Vertex Shader
    const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uIsDark;
    attribute float aScale;
    attribute float aTwinkle;
    varying float vAlpha;
    varying float vBrightness;

    void main() {
      vec3 pos = position;

      // Distance from mouse to vertex
      float dist = distance(pos.xy, uMouse);
      float radius = 4.0; 
      float force = smoothstep(radius, 0.0, dist);
      
      if (uIsDark > 0.5) {
        // DARK MODE: Starfield behavior
        // Very subtle wave, stars are mostly static
        pos.z += sin(pos.x * 0.5 + uTime * 0.1) * 0.1;
        
        // Twinkling effect - each star has its own phase
        vBrightness = 0.3 + 0.7 * (0.5 + 0.5 * sin(uTime * 2.0 + aTwinkle));
        
        // Minimal mouse interaction for stars
        vec2 dir = normalize(pos.xy - uMouse);
        pos.xy += dir * force * 0.5;
      } else {
        // LIGHT MODE: Original particle behavior
        pos.z += sin(pos.x * 2.0 + uTime) * 0.2;
        pos.z += cos(pos.y * 2.0 + uTime) * 0.2;
        
        // Stronger mouse repulsion in light mode
        vec2 dir = normalize(pos.xy - uMouse);
        pos.xy += dir * force * 2.0;
        
        vBrightness = 1.0;
      }

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // [TWEAK] Particle Size
      if (uIsDark > 0.5) {
        // Stars: varied sizes, subtle interaction
        gl_PointSize = (25.0 + aScale * 60.0 + force * 10.0) * (1.0 / -mvPosition.z);
      } else {
        // Original particle size
        gl_PointSize = (40.0 * aScale + force * 30.0) * (1.0 / -mvPosition.z);
      }
      
      // Alpha logic
      vAlpha = 0.6 + force * 0.4;
    }
  `;

    // Custom Fragment Shader
    const fragmentShader = `
    uniform vec3 uColor;
    uniform float uIsDark;
    varying float vAlpha;
    varying float vBrightness;

    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5));
      if (dist > 0.5) discard;
      
      float strength = 1.0 - (dist * 2.0);
      
      if (uIsDark > 0.5) {
        // DARK MODE: Star rendering with glow
        strength = pow(strength, 1.5); // Sharper core, softer glow
        
        // Add slight color variation for stars
        vec3 starColor = uColor;
        // Some stars slightly warmer (yellowish)
        if (vBrightness > 0.7) {
          starColor = mix(uColor, vec3(1.0, 0.95, 0.8), 0.3);
        }
        
        gl_FragColor = vec4(starColor, vAlpha * strength * vBrightness);
      } else {
        // LIGHT MODE: Original particle rendering
        strength = pow(strength, 2.0);
        gl_FragColor = vec4(uColor, vAlpha * strength);
      }
    }
  `;

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.positions.length / 3}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    count={particles.sizes.length}
                    array={particles.sizes}
                    itemSize={1}
                />
                <bufferAttribute
                    attach="attributes-aTwinkle"
                    count={particles.twinkle.length}
                    array={particles.twinkle}
                    itemSize={1}
                />
            </bufferGeometry>
            <shaderMaterial
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                transparent={true}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </points>
    );
};

export default function ParticleField() {
    return (
        <div className="absolute inset-0 z-10 w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <ParticleSystem />
            </Canvas>
        </div>
    );
}

