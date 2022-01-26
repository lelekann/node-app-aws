const aws  = require('aws-sdk/dist/aws-sdk-react-native');
require('dotenv').config();

const region = "eu-central-1";
const bucketName = "image-uploader-test-bucket";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region, 
    accessKeyId,
    secretAccessKey,
    signatureVersion: '4'
})

export async function generateUploadURL() {
    const imageName = "random image name"

    const params = ({
        Bucket: bucketName,
        key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}