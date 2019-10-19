import * as PIXI from 'pixi.js';

import birdA1 from './assets/2DAnimals/birdA.png';
import birdA2 from './assets/2DAnimals/birdA-flying.png';
import birdB1 from './assets/2DAnimals/birdB.png';
// import birdB2 from './assets/2DAnimals/birdB.png';
import birdC1 from './assets/2DAnimals/birdC.png';
import chicken from './assets/2DAnimals/chicken.png';
import cow from './assets/2DAnimals/cow.png';

export const birdATextures = [PIXI.Texture.from(birdA1), PIXI.Texture.from(birdA2)];
export const birdBTextures = [PIXI.Texture.from(birdB1), PIXI.Texture.from(birdB1)];
export const birdCTextures = [PIXI.Texture.from(birdC1), PIXI.Texture.from(birdC1)];

export const chickenTextures = [PIXI.Texture.from(chicken), PIXI.Texture.from(chicken)];

export const cowTextures = [PIXI.Texture.from(cow), PIXI.Texture.from(cow)];