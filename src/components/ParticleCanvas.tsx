import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ParticleCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for 3D Floating Extruded Hearts
    const group = new THREE.Group();
    scene.add(group);

    // Helper to create Extruded 3D Heart Mesh
    const createHeart = (colorHex: number) => {
      const shape = new THREE.Shape();
      const x = 0, y = 0;
      shape.moveTo(x + 5, y + 5);
      shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
      shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
      shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
      shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
      shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
      shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 3
      });

      const material = new THREE.MeshPhongMaterial({
        color: colorHex,
        shininess: 90,
        specular: 0xffffff,
        transparent: true,
        opacity: 0.8
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(0.055, 0.055, 0.055);
      mesh.rotation.z = Math.PI; // Flip heart upright
      return mesh;
    };

    // Color palette: Pastel Pink, Hot Pink, Rose, Soft Lavender, Gold
    const colors = [0xFFB6C1, 0xFF69B4, 0xE91E63, 0xE1BEE7, 0xFFD700];
    const heartsCount = 30;

    for (let i = 0; i < heartsCount; i++) {
      const heartMesh = createHeart(colors[Math.floor(Math.random() * colors.length)]);
      heartMesh.position.set(
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 35
      );
      heartMesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      heartMesh.userData = {
        speed: 0.012 + Math.random() * 0.02,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02
      };
      group.add(heartMesh);
    }

    // Directional & Ambient Lighting
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(1, 1.5, 1);
    scene.add(dirLight);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 100;
      mouseY = (e.clientY - window.innerHeight / 2) / 100;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Window Resize Handler
    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      // Upward floating motion & 3D rotation
      group.children.forEach((child) => {
        child.position.y += child.userData.speed;
        child.rotation.x += child.userData.rotSpeedX;
        child.rotation.y += child.userData.rotSpeedY;

        // Loop bottom when floating beyond top
        if (child.position.y > 24) {
          child.position.y = -24;
          child.position.x = (Math.random() - 0.5) * 45;
        }
      });

      // Parallax rotation towards mouse
      group.rotation.y += (mouseX - group.rotation.y) * 0.04;
      group.rotation.x += (mouseY - group.rotation.x) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      group.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-85"
    />
  );
};
