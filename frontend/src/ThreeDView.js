import React from 'react';
import { Canvas } from 'react-three-fiber';
import Planet from './components/Planet';
import * as THREE from 'three';
import { Light } from './components/Light';
import { Controls } from './components/Controls';
import water from './assets/water.jpg';
import earth from './assets/earth.png';
import ice from './assets/ice-earth.jpg';

const SURFACES_TEXTURE_SRC = {
    ice,
    earth,
    water, 
};

function ThreeDView() {
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const planetCenter = new THREE.Vector3(0, -3, 0);

    return (
        <div className="main">
            <Canvas 
                camera={camera}
                onCreated={({ gl }) => {
                    gl.shadowMap.enabled = true
                    gl.shadowMap.type = THREE.PCFSoftShadowMap
                }}>
                <Light />
                <Controls
                    planetCenter={planetCenter}
                />
                <Planet 
                    planetCenter={planetCenter}
                    textureSrc={SURFACES_TEXTURE_SRC.water}
                />
            </Canvas>
        </div>
    );
};

export default ThreeDView;