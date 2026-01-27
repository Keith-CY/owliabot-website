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

  varying vec2 vUv;

  float noise(vec2 p) {
    return sin(p.x) * sin(p.y);
  }

  void main() {
    vec2 uv = vUv;
    vec2 st = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);

    float t = u_time * 0.6;
    float wave = sin(st.x * 4.0 + t) * 0.15 + cos(st.y * 6.0 - t * 1.2) * 0.1;
    float ripple = sin(length(st) * 6.0 - t * 1.4) * 0.08;
    float n = noise(st * 3.0 + t * 0.4) * 0.08;

    float mask = smoothstep(0.8, 0.2, length(st));
    float glow = clamp(wave + ripple + n, -0.4, 0.6) * mask;

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

    const render = (time: number) => {
      uniforms.u_time.value = time * 0.001;
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

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
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
