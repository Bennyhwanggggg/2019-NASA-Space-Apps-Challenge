import React from 'react';
import { Sprite, Container } from '@inlet/react-pixi';
import iceLand from '../assets/2DBackgrounds/iceland.png'
import greenLand from '../assets/2DBackgrounds/greenland.png';
import rockLand from '../assets/2DBackgrounds/rockland.png';
import yellowLand from '../assets/2DBackgrounds/yellowland.png';
import { calculateHabitability } from '../core';

const Background = ( { water, temperature, oxygen, width, height } ) => {

    var habitabilityScore = calculateHabitability(water, temperature, oxygen);

    habitabilityScore = Math.floor(habitabilityScore);
    let backgroundImage;
    switch (habitabilityScore) {
        case 0:
                backgroundImage = iceLand;
            break;
        case 1:
                backgroundImage = rockLand;
            break;
        case 2:
        case 3:
                backgroundImage = greenLand;
            break;
        case 4:
                backgroundImage = yellowLand;
            break;
        default:
                backgroundImage = yellowLand;
    }

    return (
        <Container>
            <Sprite
                // image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
                image={backgroundImage}
                x={0} // anchor x
                y={0} // anchor y
                width={width} 
                height={height}
                />
        </Container>
    )
}

export default Background