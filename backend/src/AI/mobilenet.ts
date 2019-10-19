import * as tf from '@tensorflow/tfjs';
import { IMAGENET_CLASSES } from './imagenet_classes';

const IMAGE_SIZE = 64;

export type MobileNetVersion = 1|2;
export type MobileNetAlpha = 0.25|0.50|0.75|1.0;

const EMBEDDING_NODES: {[version: string]: string} = {
    '1.00': 'module_apply_default/MobilenetV1/Logits/global_pool',
    '2.00': 'module_apply_default/MobilenetV2/Logits/AvgPool'
};

const MODEL_INFO: {[version: string]: {[alpha: string]: string}} = {
    '1.00': {
        '0.25':
            'https://tfhub.dev/google/imagenet/mobilenet_v1_025_224/classification/1',
        '0.50':
            'https://tfhub.dev/google/imagenet/mobilenet_v1_050_224/classification/1',
        '0.75':
            'https://tfhub.dev/google/imagenet/mobilenet_v1_075_224/classification/1',
        '1.00':
            'https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1'
    },
    '2.00': {
        '0.50':
            'https://tfhub.dev/google/imagenet/mobilenet_v2_050_224/classification/2',
        '0.75':
            'https://tfhub.dev/google/imagenet/mobilenet_v2_075_224/classification/2',
        '1.00':
            'https://tfhub.dev/google/imagenet/mobilenet_v2_100_224/classification/2'
    }
};

export async function load(
    version: MobileNetVersion = 1, alpha: MobileNetAlpha = 1.0, isCustom: boolean = false) {
    if (tf == null) {
        throw new Error(
            `Cannot find TensorFlow.js. If you are using a <script> tag, please ` +
            `also include @tensorflow/tfjs on the page before using this model.`);
    }

    const versionStr = version.toFixed(2);
    const alphaStr = alpha.toFixed(2);
    if (!(versionStr in MODEL_INFO)) {
        throw new Error(
            `Invalid version of MobileNet. Valid versions are: ` +
            `${Object.keys(MODEL_INFO)}`);
    }
    if (!(alphaStr in MODEL_INFO[versionStr])) {
        throw new Error(
            `MobileNet constructed with invalid alpha ${alpha}. Valid ` +
            `multipliers for this version are: ` +
            `${Object.keys(MODEL_INFO[versionStr])}.`);
    }

    const mobilenet = new MobileNet(versionStr, alphaStr, isCustom);
    await mobilenet.load();
    return mobilenet;
}

export class MobileNet {
    model: tf.GraphModel|tf.LayersModel;

    private normalizationOffset: tf.Scalar;
    private isCustom: boolean;

    constructor(public version: string, public alpha: string, isCustom: boolean) {
        this.normalizationOffset = tf.scalar(127.5);
        this.isCustom = isCustom;
    }

    async load() {
        if (this.isCustom) {
        this.model = await tf.loadLayersModel('mymobilenet/model.json');
        } else {
        const url = MODEL_INFO[this.version][this.alpha];
        this.model = await tf.loadGraphModel(url, {fromTFHub: true});
        }


        // Warmup the model.
        const result = tf.tidy(
                        () => this.model.predict(tf.zeros(
                            [1, IMAGE_SIZE, IMAGE_SIZE, 3]))) as tf.Tensor;
        await result.data();
        result.dispose();
    }

    /**
     * Computes the logits (or the embedding) for the provided image.
     *
     * @param img The image to classify. Can be a tensor or a DOM element image,
     *     video, or canvas.
     * @param embedding If true, it returns the embedding. Otherwise it returns
     *     the 1000-dim logits.
     */
    infer(
        img: tf.Tensor|ImageData|HTMLImageElement|HTMLCanvasElement|
        HTMLVideoElement,
        embedding = false): tf.Tensor {
        return tf.tidy(() => {
        if (!(img instanceof tf.Tensor)) {
            img = tf.browser.fromPixels(img);
        }

        // Normalize the image from [0, 255] to [-1, 1].
        const normalized = img.toFloat()
                                .sub(this.normalizationOffset)
                                .div(this.normalizationOffset) as tf.Tensor3D;

        // Resize the image to
        let resized = normalized;
        if (img.shape[0] !== IMAGE_SIZE || img.shape[1] !== IMAGE_SIZE) {
            const alignCorners = true;
            resized = tf.image.resizeBilinear(
                normalized, [IMAGE_SIZE, IMAGE_SIZE], alignCorners);
        }

        // Reshape so we can pass it to predict.
        const batched = resized.reshape([-1, IMAGE_SIZE, IMAGE_SIZE, 3]);

        let result: tf.Tensor2D;

        if (embedding) {
            const embeddingName = EMBEDDING_NODES[this.version];
            const internal =
                this.model.execute(batched, embeddingName) as tf.Tensor4D;
            result = internal.squeeze([1, 2]);
        } else {
            const logits1001 = this.model.predict(batched) as tf.Tensor2D;
            console.log(logits1001);
            // Remove the very first logit (background noise).
            // result = logits1001.slice([0, 1], [-1, 1000]);
            result = logits1001;
        }

        return result;
        });
    }

    /**
     * Classifies an image from the 1000 ImageNet classes returning a map of
     * the most likely class names to their probability.
     *
     * @param img The image to classify. Can be a tensor or a DOM element image,
     * video, or canvas.
     * @param topk How many top values to use. Defaults to 3.
     */
    async classify(
        img: tf.Tensor3D|ImageData|HTMLImageElement|HTMLCanvasElement|
        HTMLVideoElement,
        topk = 3): Promise<Array<{className: string, probability: number}>> {
        const logits = this.infer(img) as tf.Tensor2D;

        const classes = await getTopKClasses(logits, topk);

        logits.dispose();

        return classes;
    }
}

async function getTopKClasses(logits: tf.Tensor2D, topK: number):
    Promise<Array<{className: string, probability: number}>> {
    const softmax = logits.softmax();
    const values = await softmax.data();
    softmax.dispose();

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
    for (let i = 0; i < topkIndices.length; i++) {
        topClassesAndProbs.push({
        className: IMAGENET_CLASSES[topkIndices[i]],
        probability: topkValues[i]
        });
    }
    return topClassesAndProbs;
}