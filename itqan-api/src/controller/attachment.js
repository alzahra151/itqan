const db = require('../models')
const apiError = require('../helpers/apiError')
const uploader = require("./multer");
const cloudinary = require("./cloudinary");
const ApiError = require('../helpers/apiError');
const ApiResponser = require('../helpers/apiResponser');
async function addAttachment(req, res, next) {
    let result = [];
    const { beneficiaryId } = req.params
    try {
        console.log(req.files)
        const { illness_attachment, contact_attachment, certificate_attachment, image } = req.files
        // console.log(certificate_attachment)
        if (req.files) {
            console.log(req.files)
            if (illness_attachment) {
                const uploadResults = await Promise.all(
                    illness_attachment.map((file) =>
                        cloudinary.uploader.upload(file.path)
                            .then(result => {
                                return {
                                    url: result.secure_url,      // Return the secure URL
                                    originalName: file.originalname // Return the original filename
                                };
                            })
                            .catch(error => {
                                console.error('Error uploading to Cloudinary:', error);
                                throw error;
                            })
                    )
                )
                const Attchment = {
                    urls: uploadResults,
                    type: "illness",
                    beneficiary_id: beneficiaryId
                }
                const attachments = await db.attachment.create(Attchment)
                result.push(attachments)
            }
            if (contact_attachment) {
                const uploadResults = await Promise.all(
                    contact_attachment.map((file) =>
                        cloudinary.uploader.upload(file.path)
                            .then(result => {
                                return {
                                    url: result.secure_url,      // Return the secure URL
                                    originalName: file.originalname // Return the original filename
                                };
                            })
                            .catch(error => {
                                console.error('Error uploading to Cloudinary:', error);
                                throw error; // Re-throw the error to be caught by Promise.all
                            })
                    )
                )
                console.log(uploadResults)
                const Attchment = {
                    urls: uploadResults,
                    type: "contact",
                    beneficiary_id: beneficiaryId
                }
                const attachments = await db.attachment.create(Attchment)
                result.push(attachments)
            }
            if (certificate_attachment) {
                console.log(certificate_attachment)
                const uploadResults = await Promise.all(
                    certificate_attachment.map((file) =>
                        cloudinary.uploader.upload(file.path)
                            .then(result => {
                                return {
                                    url: result.secure_url,      // Return the secure URL
                                    originalName: file.originalname // Return the original filename
                                };
                            })
                            .catch(error => {
                                console.error('Error uploading to Cloudinary:', error);
                                throw error; // Re-throw the error to be caught by Promise.all
                            })
                    )
                )
                const Attchment = {
                    urls: uploadResults,
                    type: "certificate",
                    beneficiary_id: beneficiaryId
                }
                const attachments = await db.attachment.create(Attchment)
                result.push(attachments)
            }
            if (image) {
                console.log(image[0])
                const uploadImage = await cloudinary.uploader.upload(image[0].path)
                console.log(uploadImage)
                const Attchment = {
                    urls: [uploadImage.secure_url],
                    type: "image",
                    beneficiary_id: beneficiaryId
                }
                result.push(Attchment)
            }
        }
        return new ApiResponser(res, { result })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addAttachment
}