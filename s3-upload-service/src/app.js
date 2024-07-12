const express= require('express');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const AWS = require('aws-sdk');
const { S3ImageUploadRouter } = require('./s3-image-upload-router');

AWS.config.update({region: 'eu-central-1'})

dotenv.config();

const app = express();
const json = express.json();
const PORT = parseInt(process.env.PORT || '3002');

app.use(json);
app.use(fileUpload());

s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY 
    }
});

app.use("/s3-upload-service", S3ImageUploadRouter.getRouter());

app.get("/", async (req, res) => {
    return res.status(200).send({
        message: "Hello World!",
    });
});

app.listen(PORT, () => {
    console.log(`Connected successfully on port ${PORT}`);
});