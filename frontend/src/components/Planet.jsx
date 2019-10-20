import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { a } from 'react-spring/three';
import waterSrc from '../assets/water.png';
import iceSrc from '../assets/ice.png';
import fireSrc from '../assets/fire.png';
import rockSrc from '../assets/rock.png';
import normalSrc from '../assets/normalGOT.png';

const getTexture = (temperature) => {
    const textureLoader = new THREE.TextureLoader();

    if (temperature < 1) {
        return textureLoader.load(iceSrc);
    }

    if (temperature < 2) {
        return textureLoader.load(waterSrc);
    }

    if (temperature < 3) {
        return textureLoader.load(normalSrc);
    }

    if (temperature < 4) {
        return textureLoader.load(rockSrc);
    }

    return textureLoader.load(fireSrc);
}

const Planet = ({ planetCenter, water, temperature, oxygen }) => {
    const [texture, setTexture] = useState(getTexture(2, 2, 2));

    useEffect(() => {
        setTexture(getTexture(temperature));
    }, [temperature]);

    return (
        <a.mesh
            position={planetCenter}
            recieveShadow
        >
            <ambientLight 
                intensity={0.9}
                color={0x404040}
            />
            <sphereBufferGeometry
                attach="geometry"
                args={[2, 25, 25]}
            />
            <meshLambertMaterial
                attach="material"
                map={texture}
            />
        </a.mesh>
    );
};

export default Planet;