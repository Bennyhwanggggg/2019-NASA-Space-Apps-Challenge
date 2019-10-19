import React from 'react';
import { Sprite, Container } from '@inlet/react-pixi';
import BackgroundImage from '../assets/frog_3.jpg';

class Background extends React.Component {
    render() {
        return (
            <Container>
                <Sprite
                    // image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
                    image={BackgroundImage}
                    // I think: http://pixijs.download/release/docs/PIXI.Sprite.html#anchor
                    x={400} // anchor x
                    y={400} // anchor y
                />
            </Container>
        )
    }
}

export default Background