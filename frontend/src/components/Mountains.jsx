import React from 'react';
import * as PIXI from 'pixi.js';
import AnimatableObjects from './AnimatableObjects';
import { calculateHabitability, isHabitable } from '../core';
import { mountainConfig } from '../landScapePositionConfig';
import iceMountain from '../assets/2DMountains/iceberg.png';
import normalMountain from '../assets/2DMountains/normal.png';
import rockMountain from '../assets/2DMountains/rock_mountain.png';
import fireMountain from '../assets/2DMountains/valcano.png';

const iceMountainTexture = PIXI.Texture.from(iceMountain);
const rockMountainTexture = PIXI.Texture.from(rockMountain);
const fireMountainTexture = PIXI.Texture.from(fireMountain);
const normalMountainTexture = PIXI.Texture.from(normalMountain);


const Mountain = ( { water, temperature, oxygen } ) => {
    var habitabilityScore = calculateHabitability(water, temperature, oxygen);

    const textures = [rockMountainTexture];

    const mountainComponents = mountainConfig.map(({ position: {x, y} }) => 
        <AnimatableObjects 
            key={`${x}__${y}_mountain`}
            x={x}
            y={y}
            textures={textures}
            animationSpeed={0.1}
            randomResize={false}
        />
    )

    return mountainComponents;
}

export default Mountain;