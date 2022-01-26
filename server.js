import express from 'express';
import aws from 'aws-sdk';
import dotenv from 'dotenv'
import crypto  from 'crypto';
// const promisify = require('util/promisify');
import { promisify } from 'util';
const randomBytes = promisify(crypto.randomBytes)

dotenv.config();

const app = express();
app.use(express.static('front'))

const region = "eu-central-1";
const bucketName = "image-uploader-test-bucket";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region, 
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

async function generateUploadURL() {
    const rawBytes = await crypto.randomBytes(16);
    const imageName = rawBytes.toString('hex')

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}

app.get('/s3Url', async (req, res) => {
    const url = await generateUploadURL()
    res.send({url})
})

app.listen(8080, () => console.log("listening on port 8080"))