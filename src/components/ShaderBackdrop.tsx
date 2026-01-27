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
  uniform vec3 u_base;
  uniform vec3 u_glow;

  varying vec2 vUv;

  float noise(vec2 p) {
    return sin(p.x) * sin(p.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 1.9;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 st = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);

    float t = u_time * 0.15;
    float flow = fbm(st * 3.0 + t) * 0.6 + fbm(st * 5.0 - t * 0.6) * 0.4;
    float swirl = sin(st.x * 2.0 + t * 1.4) * 0.15 + cos(st.y * 2.6 - t) * 0.12;
    float mist = smoothstep(-0.4, 0.4, flow + swirl);

    vec3 color = mix(u_base, u_glow, mist * 0.35);
    float dist = distance(uv, vec2(0.5));
    float vignette = 1.0 - smoothstep(0.35, 0.95, dist);
    color *= mix(0.75, 1.0, vignette);

    gl_FragColor = vec4(color, 0.85);
  }
`;

export default function ShaderBackdrop() {
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
      u_base: { value: new THREE.Color(0.04, 0.05, 0.08) },
      u_glow: { value: new THREE.Color(0.18, 0.2, 0.32) },
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
    let observer: MutationObserver | null = null;

    const parseTriplet = (value: string, fallback: [number, number, number]) => {
      const parts = value.trim().split(/\s+/).map((item) => Number(item));
      if (parts.length >= 3 && parts.every((item) => Number.isFinite(item))) {
        return [parts[0], parts[1], parts[2]] as const;
      }
      return fallback;
    };

    const updateColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const base = parseTriplet(styles.getPropertyValue("--shader-base"), [7, 8, 10]);
      const glow = parseTriplet(styles.getPropertyValue("--shader-glow"), [36, 38, 54]);
      uniforms.u_base.value.setRGB(base[0] / 255, base[1] / 255, base[2] / 255);
      uniforms.u_glow.value.setRGB(glow[0] / 255, glow[1] / 255, glow[2] / 255);
    };

    updateColors();

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
    observer = new MutationObserver(() => updateColors());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      observer?.disconnect();
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
