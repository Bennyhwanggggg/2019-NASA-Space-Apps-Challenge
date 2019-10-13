import React, { useRef, useState } from 'react';
import { useSpring, a } from 'react-spring/three';
import { useFrame } from 'react-three-fiber';

const Earth = props => {

    const [active, setActive] = useState(false);
    const properties = useSpring({
        scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    })

    const meshRef = useRef();
    return (
        <a.mesh ref={meshRef}
            onClick={() => setActive(!active)}
            scale={properties.scale}>
            <sphereBufferGeometry
                attach="geometry"
                args={[1, 25, 25]}
            />
            <meshPhongMaterial attach="material" color="hotpink" />
        </a.mesh>
    );
}

export default Earth;