import React, { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const modelURL = './assets/animatedChicken.gltf';

export const Chicken = props => {

    const [model, setModel] = useState();

    useEffect(() => {
        new GLTFLoader().load(modelURL, setModel);
    }, [])

    return model ? <primitive 
                        object={model.scene} 
                        scale={[0.001, 0.001, 0.001]}
                        position={[0, -1, 0]}/> : null
};