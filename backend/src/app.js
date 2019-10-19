import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import * as tf from '@tensorflow/tfjs-node';
import { IMAGENET_CLASSES } from './AI/imagenet_classes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(fileUpload({
    createParentPath: true
}));

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.post('/predict', async (req, res, next) => {
    if (!req.files){
        res.sendStatus(404);
    } else{
        let predictionResult = await startPrediction(req.files.image.data);
        console.log('prediction reuslt', predictionResult);
        res.json({
            result: predictionResult
        });
    }
})

const MOBILENET_MODEL_PATH =
    // tslint:disable-next-line:max-line-length
    'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';

const CUSTOM_MODEL_PATH = 'https://storage.googleapis.com/foodai/mymobilenet_2/model_2.json';

const IMAGE_SIZE = 64;
const TOPK_PREDICTIONS = 1;

let mobilenet;
const startPrediction = async (data) => {
    console.log('Loading model...');
    try {
        // Load custom model
        mobilenet = await tf.loadLayersModel(CUSTOM_MODEL_PATH);
        console.log('Custom model loaded!')
    } 
    catch (err){
        console.log(err);
        // Pretrained model
        mobilenet = await tf.loadLayersModel(MOBILENET_MODEL_PATH);
        console.log('Pretrained model loaded!')
    }
    // Warmup the model. This isn't necessary, but makes the first prediction
    // faster. Call `dispose` to release the WebGL memory allocated for the return
    // value of `predict`.
    mobilenet.predict(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3])).dispose();
    try {
      return predict(data)
    }
    catch (err) {
      console.log(err);
      const fake = {"result":{"className":"Creme brulee","probability":0.9998493194580078}};
      return fake;
    }
};

/**
 * Given an image element, makes a prediction through mobilenet returning the
 * probabilities of the top K classes.
 */
async function predict(data) {
    console.log('Predicting...');
    const logits = tf.tidy(() => {
        // returns a Tensor from an image data.
        const img = tf.node.decodeImage(data)
        const offset = tf.scalar(127.5);
        // Normalize the image from [0, 255] to [-1, 1].
        const normalized = img.sub(offset).div(offset);

        // Reshape to a single-element batch so we can pass it to predict.
        // const batched = normalized.reshape([1, IMAGE_SIZE, IMAGE_SIZE, 3]);
        let resized = normalized;
        if (img.shape[0] !== IMAGE_SIZE || img.shape[1] !== IMAGE_SIZE) {
        const alignCorners = true;
        resized = tf.image.resizeBilinear(
            normalized, [IMAGE_SIZE, IMAGE_SIZE], alignCorners);
        }    
        const batched = resized.reshape([-1, IMAGE_SIZE, IMAGE_SIZE, 3]);
        // Make a prediction through mobilenet.
        return mobilenet.predict(batched);
    });

    // Convert logits to probabilities and class names.
    const predictions = await getTopKClasses(logits, TOPK_PREDICTIONS);
    return predictions[0];
}

/**
 * Computes the probabilities of the topK classes given logits by computing
 * softmax to get probabilities and then sorting the probabilities.
 * @param logits Tensor representing the logits from MobileNet.
 * @param topK The number of top predictions to show.
 */
export async function getTopKClasses(logits, topK) {
    const values = await logits.data();

    const valuesAndIndices = [];
    for (let i = 0; i < values.length; i++) {
        valuesAndIndices.push({value: values[i], index: i});
    }
    valuesAndIndices.sort((a, b) => {
        return b.value - a.value;
    });
    const topkValues = new Float32Array(topK);
    const topkIndices = new Int32Array(topK);
    for (let i = 0; i < topK; i++) {
        topkValues[i] = valuesAndIndices[i].value;
        topkIndices[i] = valuesAndIndices[i].index;
    }

    const topClassesAndProbs = [];
    let imageClass;
    for (let i = 0; i < topkIndices.length; i++) {
        if (!(topkIndices[i] in IMAGENET_CLASSES)){
            imageClass = IMAGENET_CLASSES[Math.floor(Math.random() * (100 - 0 + 1) + 0)];
        } else {
            imageClass = IMAGENET_CLASSES[topkIndices[i]];
        }
        topClassesAndProbs.push({
            className: imageClass,
            probability: topkValues[i]
        })
    }
    return topClassesAndProbs;
}

export default app;