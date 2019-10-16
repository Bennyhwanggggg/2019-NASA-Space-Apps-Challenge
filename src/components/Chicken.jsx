import React, { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const modelURL = './assets/animatedChicken.gltf';

export const Chicken = props => {

    const [model, setModel] = useState();

    const playAnimation = () => {
        const mixer = new THREE.AnimationMixer(model.scene);
        const { animations: clips } = model;

        clips.forEach(clip => {
            mixer.clipAction(clip).play();
        });
    }

    useEffect(() => {
        new GLTFLoader().load(modelURL, setModel);
    }, [])

    useEffect(() => {
        if (!model) return;

        playAnimation();
    }, [model]);


    return model ? <primitive 
                        object={model.scene} 
                        scale={[0.001, 0.001, 0.001]}
                        position={[0, -0.95, 0]}/> : null
};