'use client';

/**
 * ParticleField Component
 * 
 * This component renders an interactive 3D particle system using Three.js and React Three Fiber.
 * It features mouse interaction (repulsion/imprint) and a wave-like ambient animation.
 * 
 * TWEAKABLE AREAS are marked with [TWEAK] comments.
 */

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSystem = () => {
    // [TWEAK] Number of particles. 
    // Higher = denser field but more performance cost. 
    // Lower = sparser field, faster performance.
    // Try: 5000 for mobile, 15000 for high-end desktop.
    const count = 8000;

    const mesh = useRef<THREE.Points>(null);
    const { viewport } = useThree();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // [TWEAK] Particle Spread / Distribution
            // (Math.random() - 0.5) * START -> Centers around 0
            // * 20 means spread from -10 to +10
            positions[i * 3] = (Math.random() - 0.5) * 20; // x spread
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y spread
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z depth (thickness of the cloud)

            // [TWEAK] Base Size randomization
            sizes[i] = Math.random();
        }

        return { positions, sizes };
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        // [TWEAK] Base Particle Color
        // You can change this hex code to match your brand color.
        uColor: { value: new THREE.Color('#60A5FA') },
    }), []);

    useFrame((state) => {
        const { clock, pointer } = state;
        if (mesh.current) {
            // Update time
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();

            // Update mouse position (lerp for smoothness)
            const targetMouse = new THREE.Vector2(pointer.x * viewport.width / 2, pointer.y * viewport.height / 2);
            // [TWEAK] Mouse Follow Smoothness/Lag
            // 0.1 = slow/smooth, 0.9 = fast/instant
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(targetMouse, 0.1);
        }
    });

    // Custom Vertex Shader
    // This handles the POSITION and SIZE of each particle
    const vertexShader = `
        uniform float uTime;
        uniform vec2 uMouse;
        attribute float aScale;
        varying float vAlpha;

        void main() {
            vec3 pos = position;

            // Distance from mouse to vertex
            float dist = distance(pos.xy, uMouse);
            
            // [TWEAK] Interaction Radius
            // How far away the mouse affects particles. 
            // 4.0 is a wide area, 1.0 would be very tight.
            float radius = 4.0; 
            
            // Calculate force based on distance (closer = stronger)
            float force = smoothstep(radius, 0.0, dist);
            
            // [TWEAK] Ambient Wave Movement
            // sin(pos.x * FREQUENCY + uTime * SPEED) * AMPLITUDE
            // Change '2.0' to make waves tighter/looser
            // Change '0.2' to make waves higher/lower
            pos.z += sin(pos.x * 2.0 + uTime) * 0.2;
            pos.z += cos(pos.y * 2.0 + uTime) * 0.2;

            // [TWEAK] Mouse Interaction Effect
            // Currently: Makes particles ripple in Z-space (depth) when hovered
            // force * STRENGTH * sin(SPEED)
            // pos.z += force * 2.0 * sin(uTime * 5.0); // REMOVED bounce effect
            
            // Optional: Push particles away in X/Y plane (Repulsion)
            // Uncomment the lines below to enable "parting the sea" effect
            vec2 dir = normalize(pos.xy - uMouse);
            pos.xy += dir * force * 2.0; // Increased strength for visible avoidance

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // [TWEAK] Particle Size
            // 40.0 = base size multiplier
            // force * 30.0 = how much larger they get when hovered
            gl_PointSize = (40.0 * aScale + force * 30.0) * (1.0 / -mvPosition.z);
            
            // [TWEAK] Alpha/Opacity Logic
            // 0.6 = base opacity
            // force * 0.4 = extra opacity when hovered (up to 1.0 total)
            vAlpha = 0.6 + force * 0.4;
        }
    `;

    // Custom Fragment Shader
    // This handles the COLOR and SHAPE of each particle
    const fragmentShader = `
        uniform vec3 uColor;
        varying float vAlpha;

        void main() {
            // [TWEAK] Particle Shape
            // This logic creates a soft circle.
            // distance(gl_PointCoord, vec2(0.5)) calculates dist from center of particle square
            float dist = distance(gl_PointCoord, vec2(0.5));
            
            // Discard pixels outside circle radius (0.5) to make it round
            if (dist > 0.5) discard;
            
            // [TWEAK] Glow/Hardness
            // 1.0 - (dist * 2.0) creates a gradient from center to edge
            // pow(..., 2.0) makes the falloff non-linear (softer)
            // Higher power = sharper, smaller core. Lower = glowier.
            float strength = 1.0 - (dist * 2.0);
            strength = pow(strength, 2.0);

            gl_FragColor = vec4(uColor, vAlpha * strength);
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
