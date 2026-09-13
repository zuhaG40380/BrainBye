import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { animate, useMotionValue } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import SceneErrorBoundary from './SceneErrorBoundary'

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

interface SceneProps {
  scrollProgress: MotionValue<number>
  reducedMotion: boolean
  isMobile: boolean
}

/** The central sculptural blob: a distorted sphere reading as molten chrome. */
function LiquidBlob({ scrollProgress, reducedMotion, isMobile: isMobileFallback }: SceneProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)
  const { viewport } = useThree()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  // One-time entrance: the sculpture punches out to fill most of the screen,
  // then settles back into its resting composition size. Runs once on mount,
  // independent of scroll.
  const introScale = useMotionValue(reducedMotion ? 1 : 0.3)
  useEffect(() => {
    if (reducedMotion) return
    const controls = animate(introScale, [0.3, 2.6, 1], {
      duration: 2.4,
      times: [0, 0.5, 1],
      ease: ['easeOut', 'easeInOut'],
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const handler = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [reducedMotion])

  useFrame((state, delta) => {
    if (!mesh.current) return
    const p = scrollProgress.get()

    // slow continuous rotation, speeds up subtly on scroll
    mesh.current.rotation.y += delta * (0.12 + p * 0.25)
    mesh.current.rotation.x = THREE.MathUtils.lerp(
      mesh.current.rotation.x,
      p * 0.8 + mouse.y * 0.15,
      0.04
    )
    mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, mouse.x * 0.08, 0.04)

    const baseScale = Math.min(viewport.width, 3.2) * 0.42
    mesh.current.scale.setScalar(baseScale * introScale.get())

    // camera drifts closer as user scrolls through hero
    const targetZ = 6.4 - p * 2.4
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.x * 0.3, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouse.y * 0.2, 0.05)
    state.camera.lookAt(0, 0, 0)

    if (materialRef.current) {
      materialRef.current.distort = THREE.MathUtils.lerp(0.35, 0.55, p) + Math.sin(state.clock.elapsedTime * 0.3) * 0.03
    }
  })

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, isMobileFallback ? 3 : 5]} />
      <MeshDistortMaterial
        ref={materialRef}
        color="#c9c2b3"
        roughness={0.18}
        metalness={0.92}
        distort={0.4}
        speed={reducedMotion ? 0 : 1.4}
        envMapIntensity={1.4}
      />
    </mesh>
  )
}

/** Thin sculptural ring, orbiting the blob. */
function MetalRing({
  radius,
  tilt,
  speed,
  color = '#a8a39a',
}: {
  radius: number
  tilt: number
  speed: number
  color?: string
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })
  return (
    <mesh ref={ref} rotation={[tilt, 0.4, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial color={color} roughness={0.25} metalness={0.9} />
    </mesh>
  )
}

/** Small drifting glass fragment. */
function GlassPanel({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + position[0]) * 0.15
  })
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeGeometry args={[0.8, 1.1]} />
      <meshPhysicalMaterial
        color="#f1ebdd"
        transparent
        opacity={0.08}
        roughness={0.1}
        metalness={0.1}
        transmission={0.9}
        thickness={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function SceneContents(props: SceneProps) {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 5, 14]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#f1ebdd" />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#8a6e52" />
      <pointLight position={[0, 2, 3]} intensity={0.6} color="#d8d1c2" />

      <LiquidBlob {...props} />
      <MetalRing radius={2.1} tilt={0.6} speed={props.reducedMotion ? 0 : 0.08} color="#d8d1c2" />
      {!props.isMobile && (
        <MetalRing radius={2.6} tilt={-0.3} speed={props.reducedMotion ? 0 : -0.05} color="#8a6e52" />
      )}

      {!props.isMobile && (
        <>
          <GlassPanel position={[-2.4, 0.6, -1]} rotation={[0.1, 0.5, 0.1]} />
          <GlassPanel position={[2.2, -0.4, -0.6]} rotation={[-0.1, -0.4, 0.05]} />
        </>
      )}

      {!props.reducedMotion && !props.isMobile && (
        <Sparkles count={40} scale={[8, 5, 4]} size={1.4} speed={0.2} color="#d8d1c2" opacity={0.4} />
      )}
    </>
  )
}

/** Static, non-WebGL fallback: a soft radial gradient reading as the same palette. */
function Fallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(circle at 50% 45%, #2a2825 0%, #171717 45%, #050505 80%)',
      }}
    />
  )
}

export default function LiquidMetalScene({ scrollProgress, reducedMotion, isMobile }: SceneProps) {
  const [webglOk] = useState(hasWebGL)

  if (!webglOk) return <Fallback />

  return (
    <SceneErrorBoundary fallback={<Fallback />}>
      <div className="absolute inset-0">
        <Canvas
          dpr={isMobile ? [1, 1] : [1, 1.5]}
          camera={{ position: [0, 0, 6.4], fov: 42 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <SceneContents scrollProgress={scrollProgress} reducedMotion={reducedMotion} isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>
    </SceneErrorBoundary>
  )
}
