import React from 'react';
import AnimatableObjects from './AnimatableObjects';
import { calculateHabitability, isHabitable } from '../core';
import { birdConfig } from '../animalPositionConfig';
import { birdATextures } from '../Texture2DLoader';
import { birdBTextures } from '../Texture2DLoader';
import { birdCTextures } from '../Texture2DLoader';


const Bird = ( { water, temperature, oxygen } ) => {
    var habitabilityScore = calculateHabitability(water, temperature, oxygen);

    const birdTexturesCollection = [birdATextures, birdBTextures, birdCTextures];

    const birdComponents = birdConfig.map(({ position: {x, y} }) => 
        <AnimatableObjects 
            key={`${x}__${y}`}
            x={x}
            y={y}
            textures={birdTexturesCollection[Math.floor(Math.random() * birdTexturesCollection.length)]}
            animationSpeed={1.2}
        />
    )

    return birdComponents;
}

export default Bird;