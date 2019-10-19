import React from 'react';
import request from 'request';
import Button from './Button';

class ImageUploadButton extends React.Component {

    constructor(props){
        super(props);
        this.aiURL = "https://food-predictor-ai.herokuapp.com/predict";
    }

    sendImageToAI = (imageFile) => {
        console.log(imageFile);
        request.post({url: this.aiURL}, function optionalCallback(err, httpResponse, body) {
            if (err) {
              return console.error('upload failed:', err);
            }
            console.log('Upload successful!  Server responded with:', body);
            // Update this to do something to update the game
        });
    }

    render() {
        return (
            <div style={{
                    position: "absolute" // to show on top of canvas
                }}
            >
                <label for="imageUpload">Send Food!</label>
                <input type="file" accept="image/*" capture="camera" id="imageUpload" onChange={this.sendImageToAI}></input>
                <Button
                    label="Send Image!"
                    onClickFunction={this.sendImageToAI}
                    style={{
                        position: "absolute" // to show on top of canvas
                    }}
                />
            </div>
        )
    }
}

export default ImageUploadButton;