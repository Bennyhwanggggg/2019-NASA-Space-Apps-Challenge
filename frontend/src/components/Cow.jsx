import React from 'react';
import AnimatableObjects from './components/AnimatableObjects';
import { calculateHabitability, isHabitable } from './core';
import { cowConfig } from '../animalPositionConfig';
import { cowTexture } from '../Texture2DLoader';


const Cow = ( { water, temperature, oxygen } ) => {
    var habitabilityScore = calculateHabitability(water, temperature, oxygen);

    const cowTextures = [cowTexture];

    const cowComponents = cowConfig.map((x, y) => 
        <AnimatableObjects 
            x={x}
            y={y}
            textures = {cowTextures[Math.floor(Math.random() * cowTextures.length) + 1]}
            animationSpeed = {0.9}
        />
    )

    return cowComponents;
}

export default Cow;