import React from 'react';

const Earth = props => {
    return (
        <mesh>
            <sphereBufferGeometry
                attach="geometry"
                args={[3, 34, 34]}
            />
            <meshBasicMaterial attach="material" color="hotpink" />
        </mesh>
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