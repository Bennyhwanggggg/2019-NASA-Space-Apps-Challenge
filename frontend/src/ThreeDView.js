import React from 'react';
import { Canvas } from 'react-three-fiber';
import Planet from './components/Planet';
import * as THREE from 'three';
import { Light } from './components/Light';
import { Controls } from './components/Controls';

const ThreeDView = ({ water, temperature, oxygen }) => {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const planetCenter = new THREE.Vector3(0, -3, 0);

    const secondLightPos = {
        x: -100,
        y: -100,
        z: -100
    }

    return (
        <Canvas 
            camera={camera}
            onCreated={({ gl }) => {
                gl.shadowMap.enabled = true
                gl.shadowMap.type = THREE.PCFSoftShadowMap
            }}
        >
            <Light />
            <Light 
                position={secondLightPos}
                intensity={0.1}
            />
            <Controls
                planetCenter={planetCenter}
            />
            <Planet
                planetCenter={planetCenter}
                water={water}
                oxygen={oxygen}
                temperature={temperature}
            />
        </Canvas>
    );
};

export default ThreeDView;