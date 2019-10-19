import React, { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const modelURL = './assets/animatedChicken.gltf';

export const Model =({ modelSrc }) => {

    const [model, setModel] = useState();

    useEffect(() => {
        new GLTFLoader().load(modelSrc, setModel);
    }, [modelSrc])

    return model ? <primitive 
                        object={model.scene} 
                        scale={[0.001, 0.001, 0.001]}
                        position={[0, -0.95, 0]}/> : null
};