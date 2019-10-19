import React, { useRef } from 'react';
import * as THREE from 'three';
import { a } from 'react-spring/three';

import water from '../assets/ice-earth.jpg';


const Planet = ({ textureSrc, planetCenter }) => {

    const meshRef = useRef();

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(textureSrc);

    return (
        <a.mesh
            ref={meshRef}
            position={planetCenter}
            recieveShadow
        >
            <ambientLight 
                intensity={0.3}
                color={0x404040}
            />
            <sphereBufferGeometry
                attach="geometry"
                args={[2, 25, 25]}
            />
            <meshBasicMaterial
                attach="material"
                map={texture}
            />
        </a.mesh>
    );
};

export default Planet;