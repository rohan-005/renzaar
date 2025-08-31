"use client";

import { FC, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

interface ModelViewerProps {
  url: string;
  width?: number | string;
  height?: number | string;
  autoRotate?: boolean;
}

const Model: FC<{ url: string }> = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

const ModelViewer: FC<ModelViewerProps> = ({
  url,
  width = 400,
  height = 400,
  autoRotate = false,
}) => {
  return (
    <div style={{ width, height }}>
      <Canvas camera={{ position: [0, 1, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model url={url} />
        </Suspense>
        <OrbitControls autoRotate={autoRotate} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
