import React from 'react';
import { Sprite, Container } from '@inlet/react-pixi';
import BackgroundImage from '../assets/frog_3.jpg';

const Background = props => {

    return (
        <Container>
            <Sprite
                // image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
                image={BackgroundImage}
                // I think: http://pixijs.download/release/docs/PIXI.Sprite.html#anchor
                x={0} // anchor x
                y={0} // anchor y
                width={props.width} 
                height={props.height}
                />
        </Container>
    )
}

export default Background