import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CinematicSceneProps {
  onLoaded?: () => void;
}

export const CinematicScene: React.FC<CinematicSceneProps> = ({ onLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check WebGL availability
    try {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    let isDisposed = false;
    let animationFrameId: number;
    let clock = new THREE.Clock();

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090d, 0.045);

    // CAMERA SETUP
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // RENDERER SETUP
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
    } catch (e) {
      console.warn('WebGL initialization failed, falling back:', e);
      setWebglSupported(false);
      return;
    }

    // STUDIO LIGHTING SYSTEM
    // Key Light: Warm violet-white light from top-right
    const keyLight = new THREE.DirectionalLight(0xb5a8ff, 2.8);
    keyLight.position.set(5, 4, 4);
    scene.add(keyLight);

    // Fill Light: Soft cool blue from bottom-left
    const fillLight = new THREE.DirectionalLight(0x4a6d8c, 1.4);
    fillLight.position.set(-5, -3, 2);
    scene.add(fillLight);

    // Rim Light: Sharp highlight from behind
    const rimLight = new THREE.DirectionalLight(0xe4dcfc, 3.2);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    // Subtle Ambient
    const ambientLight = new THREE.AmbientLight(0x181a24, 0.9);
    scene.add(ambientLight);

    // Point Accent Light
    const accentPointLight = new THREE.PointLight(0x8b7cff, 2.0, 12);
    accentPointLight.position.set(0, 0, 0);
    scene.add(accentPointLight);

    // SCULPTURE ROOT GROUP
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // 1. CORE: Faceted Polyhedral Gem (Icosahedron with physical reflection)
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 0);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x141724,
      emissive: 0x1e183a,
      emissiveIntensity: 0.35,
      roughness: 0.14,
      metalness: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    sculptureGroup.add(coreMesh);

    // 1b. WIREFRAME ACCENT OVERLAY for architectural precision
    const wireframeGeometry = new THREE.IcosahedronGeometry(1.61, 0);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b7cff,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    sculptureGroup.add(wireframeMesh);

    // 2. ORBITAL GYROSCOPIC RINGS
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.028, 16, 100);
    const ringMat1 = new THREE.MeshPhysicalMaterial({
      color: 0x8b7cff,
      metalness: 0.95,
      roughness: 0.18,
      clearcoat: 0.8,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    sculptureGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.7, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshPhysicalMaterial({
      color: 0xc4c7d7,
      metalness: 0.9,
      roughness: 0.25,
      clearcoat: 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    sculptureGroup.add(ring2);

    // 3. SATELLITE PRISMS
    const satelliteGeo = new THREE.OctahedronGeometry(0.22, 0);
    const satelliteMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b7cff,
      emissive: 0x8b7cff,
      emissiveIntensity: 0.5,
      roughness: 0.1,
      metalness: 0.85,
    });

    const satellites: THREE.Mesh[] = [];
    const satelliteCount = 5;
    for (let i = 0; i < satelliteCount; i++) {
      const sat = new THREE.Mesh(satelliteGeo, satelliteMat);
      satellites.push(sat);
      sculptureGroup.add(sat);
    }

    // 4. ATMOSPHERIC PARTICLE DUST
    const particleCount = prefersReducedMotion ? 60 : 240;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      particleScales[i] = Math.random() * 0.04 + 0.02;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xa8a5ff,
      size: 0.065,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // POINTER TRACKING & PARALLAX
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousPointerX;
        const deltaY = clientY - previousPointerY;
        dragVelocityX = deltaX * 0.006;
        dragVelocityY = deltaY * 0.006;
        sculptureGroup.rotation.y += dragVelocityX;
        sculptureGroup.rotation.x += dragVelocityY;
        previousPointerX = clientX;
        previousPointerY = clientY;
      } else {
        const rect = container.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
        pointer.targetX = THREE.MathUtils.clamp(normX, -1, 1);
        pointer.targetY = THREE.MathUtils.clamp(normY, -1, 1);
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointerX = clientX;
      previousPointerY = clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('mousedown', handlePointerDown);
    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // RESIZE OBSERVER
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // WEBGL CONTEXT LOSS SAFETY
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(animationFrameId);
    };

    const handleContextRestored = () => {
      handleResize();
      clock.start();
      animate();
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    // CAMERA PUSH-IN INTRO
    let introProgress = 0;
    const targetCameraZ = 6.2;
    camera.position.z = 8.5;

    // VISIBILITY MONITORING (Pause when off-screen)
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    intersectionObserver.observe(container);

    // NOTIFY READY
    if (onLoaded) {
      setTimeout(onLoaded, 100);
    }

    // ANIMATION LOOP (Delta-time based)
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Camera intro push-in
      if (introProgress < 1) {
        introProgress += delta * 0.85;
        const eased = Math.min(introProgress, 1);
        camera.position.z = THREE.MathUtils.lerp(8.5, targetCameraZ, 1 - Math.pow(1 - eased, 3));
      }

      if (!prefersReducedMotion) {
        // Pointer parallax damping
        pointer.x = THREE.MathUtils.lerp(pointer.x, pointer.targetX, 0.04);
        pointer.y = THREE.MathUtils.lerp(pointer.y, pointer.targetY, 0.04);

        camera.position.x = pointer.x * 0.7;
        camera.position.y = pointer.y * 0.45;
        camera.lookAt(0, 0, 0);

        // Core continuous choreographed rotation
        if (!isDragging) {
          dragVelocityX *= 0.92;
          dragVelocityY *= 0.92;
          sculptureGroup.rotation.y += (0.28 * delta) + dragVelocityX;
          sculptureGroup.rotation.x += (0.12 * delta) + dragVelocityY;
        }

        // Counter-rotating orbital rings
        ring1.rotation.z += 0.4 * delta;
        ring2.rotation.z -= 0.3 * delta;

        // Satellite orbital choreography
        for (let i = 0; i < satelliteCount; i++) {
          const angle = elapsedTime * 0.7 + (i * Math.PI * 2) / satelliteCount;
          const radius = 2.45 + Math.sin(elapsedTime * 0.5 + i) * 0.2;
          satellites[i].position.x = Math.cos(angle) * radius;
          satellites[i].position.y = Math.sin(angle * 1.2) * 0.9;
          satellites[i].position.z = Math.sin(angle) * radius;
          satellites[i].rotation.x += 1.5 * delta;
          satellites[i].rotation.y += 1.0 * delta;
        }

        // Particle subtle drift
        particleSystem.rotation.y = elapsedTime * 0.03;
        particleSystem.rotation.x = Math.sin(elapsedTime * 0.02) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('mousedown', handlePointerDown);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      // Dispose resources
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      ring1Geo.dispose();
      ringMat1.dispose();
      ring2Geo.dispose();
      ringMat2.dispose();
      satelliteGeo.dispose();
      satelliteMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion, onLoaded]);

  // Graceful fallback if WebGL is unsupported
  if (!webglSupported) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-radial from-[#151724]/70 to-[#08090D] overflow-hidden pointer-events-none">
        <div className="relative w-72 h-72 rounded-full border border-[#8B7CFF]/20 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-[#8B7CFF]/40 animate-spin" style={{ animationDuration: '24s' }} />
          <div className="absolute w-32 h-32 rounded-full bg-[#8B7CFF]/10 blur-xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
      title="Interactive 3D Sculpture: Drag to inspect or hover for parallax"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Subtle indicator hint */}
      <div 
        className={`absolute bottom-6 right-6 text-[11px] font-mono tracking-wider text-[#A2A5B3]/60 transition-opacity duration-300 pointer-events-none hidden sm:block ${
          isInteracting ? 'opacity-100 text-[#8B7CFF]' : 'opacity-40'
        }`}
      >
        <span>{isInteracting ? "3D ROTATION ACTIVE" : "DRAG TO ROTATE 3D SCULPTURE"}</span>
      </div>
    </div>
  );
};
