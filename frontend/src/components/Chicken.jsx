import React from 'react';
import AnimatableObjects from './components/AnimatableObjects';
import { calculateHabitability, isHabitable } from './core';
import { chickenConfig } from '../animalPositionConfig';
import { chickenTexture } from '../Texture2DLoader';


const Chicken = ( { water, temperature, oxygen } ) => {
    var habitabilityScore = calculateHabitability(water, temperature, oxygen);

    const chickenTextures = [chickenTexture];

    const chickenComponents = chickenConfig.map((x, y) => 
        <AnimatableObjects 
            x={x}
            y={y}
            textures = {chickenTextures[Math.floor(Math.random() * chickenTextures.length) + 1]}
            animationSpeed = {0.9}
        />
    )

    return chickenComponents;
}

export default Chicken;