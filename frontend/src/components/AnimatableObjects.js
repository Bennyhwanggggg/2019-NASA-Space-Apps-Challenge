import React from 'react';
import { Container, AnimatedSprite } from '@inlet/react-pixi';

class AnimatableObjects extends React.Component {

    constructor(props) {
        super(props);
        this.textures = [];
        if (this.props.textures) {
            this.props.textures.forEach(texture => {
                this.textures.push(texture);
            });
        }
        this.x = this.props.x != null ? this.props.x : 0;
        this.y = this.props.y != null ? this.props.y : 0;
    }

    render() {
        return (
            <Container 
                position={[this.x, this.y]} // use this to set position of image on canvas
            >
                <AnimatedSprite 
                    textures={this.textures}
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
}

export default AnimatableObjects;