import React from 'react';
import AnimatableObjects from './AnimatableObjects';
import { calculateHabitability, isHabitable } from '../core';
import { cowConfig } from '../animalPositionConfig';
import { cowTextures } from '../Texture2DLoader';


const Cow = ( { water, temperature, oxygen } ) => {
    var habitabilityScore = calculateHabitability(water, temperature, oxygen);

    const cowTexturesCollections = [cowTextures];

    const cowComponents = cowConfig.map((x, y) => 
        <AnimatableObjects 
            key={`${x}__${y}`}
            x={x}
            y={y}
            textures = {cowTexturesCollections[Math.floor(Math.random() * cowTexturesCollections.length)]}
            animationSpeed={1.9}
        />
    )

    return cowComponents;
}

export default Cow;