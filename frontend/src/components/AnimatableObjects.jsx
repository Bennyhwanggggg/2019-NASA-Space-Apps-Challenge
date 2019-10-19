import React from 'react';
import { Container, AnimatedSprite } from '@inlet/react-pixi';

const AnimatableObjects = props => {

    const textures = props.textures !== null ? props.textures : [];

    const x = props.x || 0;
    const y = props.y || 0;

    const animateionSpeed = props.animationSpeed || 0.2;

    const resize = props.randomResize ? (Math.random()+1)/2 : props.resize || 1;
    const flipHorizontal = props.flipHorizontal || false;
    const flip = flipHorizontal ? -1 : 1

    return (
        <Container 
            position={[x, y]} // use this to set position of image on canvas
        >
            <AnimatedSprite 
                textures={textures}
                anchor={0.5} // anchor is the orgin point of the image, defaults to topleft of an image. 0.5 is the centre
                isPlaying={true}
                initialFrame={0}
                animationSpeed={animateionSpeed}
                scale= {{ x: resize*flip, y: resize}}
                interactive={true} // this must be set to true for events
                click={() => {
                    console.log('sprite clicked.') // http://pixijs.download/dev/docs/PIXI.interaction.InteractionManager.html
                }}
            />
        </Container>
    )
}

export default AnimatableObjects;