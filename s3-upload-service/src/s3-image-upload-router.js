const Router = require('express');
const { S3ImageUploadController } = require('./s3-image-upload-controller');

class S3ImageUploadRouter {
    static getRouter() {
        const router = Router();

        router.post(
            "/",
            S3ImageUploadController.uploadImage
        );
        return router;
    }
}

module.exports = { S3ImageUploadRouter };