"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { InstancedMesh, Object3D } from "three";
import { DotManager } from "../app/classes/DotManager";
import AboutDebug from "@/components/AboutDebug";
import NavBar from "./NavBar";
import MercatorMap from "./MercatorMap";
import styles from "./DotGrid.module.css";

export default function DotGrid() {
  const [showMap, setShowMap] = useState(false);
  const [showTooltips, setShowTooltips] = useState(false);
  const meshRef = useRef<InstancedMesh>(null!);
  const navRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(50);
  const [canvasSize, setCanvasSize] = useState({ width: 10, height: 5 });

  const dotManager = DotManager.getInstance();

  useEffect(() => {
    console.log("Initializing DotGrid...");

    dotManager.initiate();

    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (mapRef.current) {
        const rect = mapRef.current.getBoundingClientRect();
        const width = rect.width / 100;
        const height = rect.height / 100;

        console.log(`📏 Resizing grid: ${width}x${height}`);
        setCanvasSize({ width, height });
        dotManager.updateGrid(width, height);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function DotUpdater() {
    const dummy = new Object3D();
    useFrame(() => {
      if (!meshRef.current) return;

      const activeDots = dotManager.activeDots;
      for (let i = 0; i < activeDots.length; i++) {
        const dot = activeDots[i];
        dummy.position.copy(dot.object.position);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    });
    return null;
  }

  return (
    <>
      <div ref={navRef} className={styles.navbarContainer}>
        <NavBar />
      </div>

      {showMap && (
        <div ref={mapRef}>
          <MercatorMap navHeight={navHeight} />
        </div>
      )}

      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} />
        <DotUpdater />

        <instancedMesh
          ref={meshRef}
          args={[undefined, undefined, dotManager.activeDots.length]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial vertexColors />
        </instancedMesh>
      </Canvas>

      <AboutDebug
        showMap={showMap}
        setShowMap={setShowMap}
        showTooltips={showTooltips}
        setShowTooltips={setShowTooltips}
      />
    </>
  );
}
