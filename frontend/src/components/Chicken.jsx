import React from 'react';
import AnimatableObjects from './AnimatableObjects';
import { calculateHabitability, isHabitable } from '../core';
import { chickenConfig } from '../animalPositionConfig';
import { chickenTextures } from '../Texture2DLoader';


const Chicken = ( { amount } ) => {

    const flip = Math.random() >= 0.5;
    const chickenTexturesCollection = [chickenTextures];

    var rescaleValue = Math.random()/2;
    rescaleValue = rescaleValue > 0.2 ? rescaleValue : 0.2;

    chickenConfig.sort((a, b) => a.position.y - b.position.y);
    const chickenComponents = chickenConfig.slice(0, amount).map(({ position: {x, y} }) => 
        <AnimatableObjects 
            key={`${x}__${y}`}
            x={x}
            y={y}
            resize={rescaleValue + (Math.random()/4)}
            flipHorizontal={flip}
            textures = {chickenTexturesCollection[Math.floor(Math.random() * chickenTexturesCollection.length)]}
            animationSpeed={0.14}
        />
    )

    return chickenComponents;
}

export default Chicken;