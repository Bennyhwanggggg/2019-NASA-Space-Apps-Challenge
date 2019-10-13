import {a , useSpring} from 'react-spring/three';
import React from 'react';

const Earth = props => {
    const [spring] = useSpring(() => ({ position: [0, 0, 0], config: { mass: 4, friction: 50, tension: 1500 } }));
    return (
        <a.mesh {...spring}>
            <sphereBufferGeometry attach="geometry" args={[5, 32, 32]} />
            <meshBasicMaterial attach="material" color="hotpink" />
        </a.mesh>
    );
}

// function Thing() {
//     return (
//       <mesh
//         onClick={e => console.log('click')}
//         onPointerOver={e => console.log('hover')}
//         onPointerOut={e => console.log('unhover')}>
//         <planeBufferGeometry attach="geometry" args={[1, 1]} />
//         <meshBasicMaterial attach="material" color="hotpink" opacity={0.5} transparent />
//       </mesh>
//     )
//   }

export default Earth;