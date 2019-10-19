import React from 'react';
import { Container, AnimatedSprite } from '@inlet/react-pixi';

const AnimatableObjects = props => {

    const textures = [];
    if (props.textures) {
        props.textures.forEach(texture => {
            textures.push(texture);
        });
    }

    const x = props.x != null ? props.x : 0;
    const y = props.y != null ? props.y : 0;

    return (
        <Container 
            position={[x, y]} // use this to set position of image on canvas
        >
            <AnimatedSprite 
                textures={textures}
                anchor={0.5} // anchor is the orgin point of the image, defaults to topleft of an image. 0.5 is the centre
                isPlaying={true}
                initialFrame={0}
                animationSpeed={0.2}
                interactive={true} // this must be set to true for events
                click={() => {
                    console.log('sprite clicked.') // http://pixijs.download/dev/docs/PIXI.interaction.InteractionManager.html
                }}
            />
        </Container>
    )
}

export default AnimatableObjects;