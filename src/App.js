import React, { useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import Earth from './components/Earth';
import * as THREE from 'three';
import { Light } from './components/Light';

function App() {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
  const [cam, setCam] = useState(camera);

  return (
    <div className="main">
      <Canvas camera={cam}>
        <Light />
        <Earth />
      </Canvas>
    </div>
  );
}

export default App;
