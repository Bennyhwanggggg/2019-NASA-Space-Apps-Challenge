import React from 'react';
import * as PIXI from 'pixi.js';
import AnimatableObjects from './AnimatableObjects';
import { calculateHabitability } from '../core';
import { mountainConfig } from '../landScapePositionConfig';
import iceMountain from '../assets/2DLandScapes/iceberg.png';
import normalMountain from '../assets/2DLandScapes/normal.png';
import rockMountain from '../assets/2DLandScapes/rock_mountain.png';
import fireMountain from '../assets/2DLandScapes/valcano.png';

const iceMountainTexture = PIXI.Texture.from(iceMountain);
const rockMountainTexture = PIXI.Texture.from(rockMountain);
const fireMountainTexture = PIXI.Texture.from(fireMountain);
const normalMountainTexture = PIXI.Texture.from(normalMountain);


const Mountain = ( { temperature } ) => {
    let mountainTexture;
    switch (temperature) {
        case temperature <= 1:
            mountainTexture = iceMountainTexture;
            break;
        case temperature <= 2:
            mountainTexture = rockMountainTexture;
            break;
        case temperature < 3:
            mountainTexture = normalMountainTexture;
        default:
            mountainTexture = fireMountainTexture;
    }

    const textures = [mountainTexture];

    mountainConfig.sort((a, b) => a.position.y - b.position.y);
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