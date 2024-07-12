class S3ImageUploadController {
    static async uploadImage({ files }, res) {
        console.log("here***");
        let response, status;
        const uploadParams = {
            Bucket: 'musician-management-app',
            Key: files.file.name,
            Body: Buffer.from(files.file.data),
            ContentType: files.file.mimetype,
            ACL: 'public-read'
        }
        try {
            const data = await s3.upload(uploadParams).promise();
            response = {
                message: "Uploaded successfully!",
                imageURL: data.Location
            };
            status = 200;
        } catch (error) {
            response = error.message;
            status = 500;
        } finally {
            res.status(status).send(response);
        }
    }
}

module.exports = { S3ImageUploadController };