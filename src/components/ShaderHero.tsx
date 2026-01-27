"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  varying vec2 vUv;

  float noise(vec2 p) {
    return sin(p.x) * sin(p.y);
  }

  void main() {
    vec2 uv = vUv;
    vec2 st = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 m = (u_mouse - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
    st += m * 0.12;

    float t = u_time * 0.6;
    float wave = sin(st.x * 4.0 + t) * 0.15 + cos(st.y * 6.0 - t * 1.2) * 0.1;
    float ripple = sin(length(st) * 6.0 - t * 1.4) * 0.08;
    float n = noise(st * 3.0 + t * 0.4) * 0.08;

    float mask = smoothstep(0.8, 0.2, length(st));
    float highlight = smoothstep(0.55, 0.0, length(st - m * 0.7)) * 0.06;
    float glow = clamp(wave + ripple + n + highlight, -0.4, 0.6) * mask;

    vec3 base = vec3(0.08, 0.1, 0.16);
    vec3 accent = vec3(0.42, 0.35, 0.95);
    vec3 color = mix(base, accent, glow + 0.35);

    gl_FragColor = vec4(color, 0.9);
  }
`;

export default function ShaderHero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);

    mount.appendChild(renderer.domElement);

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: {
        value: new THREE.Vector2(mount.clientWidth, mount.clientHeight),
      },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId = 0;
    const mouse = new THREE.Vector2(0.5, 0.5);
    const target = new THREE.Vector2(0.5, 0.5);

    const render = (time: number) => {
      uniforms.u_time.value = time * 0.001;
      mouse.lerp(target, 0.08);
      uniforms.u_mouse.value.copy(mouse);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    if (prefersReduced) {
      uniforms.u_time.value = 0.0;
      renderer.render(scene, camera);
    } else {
      frameId = requestAnimationFrame(render);
    }

    const handleResize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight);
      uniforms.u_resolution.value.set(clientWidth, clientHeight);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      target.x = (event.clientX - rect.left) / rect.width;
      target.y = 1 - (event.clientY - rect.top) / rect.height;
    };

    const handlePointerLeave = () => {
      target.set(0.5, 0.5);
    };

    window.addEventListener("resize", handleResize);
    mount.addEventListener("pointermove", handlePointerMove);
    mount.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      mount.removeEventListener("pointermove", handlePointerMove);
      mount.removeEventListener("pointerleave", handlePointerLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div aria-hidden="true" className="absolute inset-0" ref={mountRef} />;
}
