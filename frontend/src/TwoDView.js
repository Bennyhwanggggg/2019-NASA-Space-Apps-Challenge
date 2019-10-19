import React from 'react';
import { Stage, } from '@inlet/react-pixi';
import Background from './components/Background';
import { calculateHabitability, isHabitable } from './core';
import Chicken from './components/Chicken';
import Bird from './components/Bird';
import Cow from './components/Cow';
import Mountain from './components/Mountains';

const redSky = 0xe33719;
const greySky = 0x6b6361;
const normalSky = 0x00aaff;
const waterSky = 0x4d98d1;
const iceSky = 0xb8e7ff;

const TwoDView = ( { water, temperature, oxygen }) => {

    var habitabilityScore = calculateHabitability(water, temperature, oxygen);

    let skyColor;

    habitabilityScore = Math.floor(habitabilityScore);
    switch (habitabilityScore) {
        case 0:
            skyColor = redSky;
            break;
        case 1:
            skyColor = greySky;
            break;
        case 2:
            skyColor = normalSky;
            break;
        case 3:
            skyColor = waterSky;
            break;
        case 4:
            skyColor = iceSky;
            break;
        default:
            skyColor = normalSky;
    }

    const canvas = {
        width: 2560,
        height: 1440
    }

    return (
        <div>
            <Stage 
                width={canvas.width} 
                height={canvas.height} 
                options={{
                    autoStart: true,
                    backgroundColor: skyColor
                    }}
                style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
            >
                <Mountain/>
                <Background
                    width={canvas.width}
                    height={canvas.height}
                />
                <Chicken/>
                <Cow/>
                <Bird/>
            </Stage>
        </div>
    );
}

export default TwoDView;
