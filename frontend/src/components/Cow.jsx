import React from 'react';
import AnimatableObjects from './AnimatableObjects';
import { calculateHabitability, isHabitable } from '../core';
import { cowConfig } from '../animalPositionConfig';
import { cowTextures } from '../Texture2DLoader';


const Cow = ( { water, temperature, oxygen } ) => {
    var habitabilityScore = calculateHabitability(water, temperature, oxygen);

    const flip = Math.random() >= 0.5;
    const cowTexturesCollections = [cowTextures];

    const cowComponents = cowConfig.map(({ position: {x, y} }) => 
        <AnimatableObjects 
            key={`${x}__${y}`}
            x={x}
            y={y}
            flipHorizontal={flip}
            randomResize={true}
            textures = {cowTexturesCollections[Math.floor(Math.random() * cowTexturesCollections.length)]}
            animationSpeed={0.1}
        />
    )

    return cowComponents;
}

export default Cow;