import React from 'react';
import AnimatableObjects from './AnimatableObjects';
import { calculateHabitability, isHabitable } from '../core';
import { chickenConfig } from '../animalPositionConfig';
import { chickenTextures } from '../Texture2DLoader';


const Chicken = ( { water, temperature, oxygen } ) => {
    var habitabilityScore = calculateHabitability(water, temperature, oxygen);

    const chickenTexturesCollection = [chickenTextures];

    const chickenComponents = chickenConfig.map((x, y) => 
        <AnimatableObjects 
            key={`${x}__${y}`}
            x={x}
            y={y}
            textures = {chickenTexturesCollection[Math.floor(Math.random() * chickenTexturesCollection.length)]}
            animationSpeed={0.14}
        />
    )

    return chickenComponents;
}

export default Chicken;