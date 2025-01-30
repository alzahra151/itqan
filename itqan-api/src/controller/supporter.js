const db = require('../models')
const apiResponse = require('../helpers/apiResponser')
const cloudinary = require('./cloudinary')
const ApiError = require('../helpers/apiError')

async function getSupporters(req, res, next) {
    const { association_id } = req.params
    try {
        const supporters = await db.supporter.findAll({
            where: {
                association_id
            }
        })
        return new apiResponse(res, { supporters })
        // res.status(200).json({ result: activities })
    } catch (error) {
        next(error)
    }
}

async function addSupporter(req, res, next) {
    console.log(req.body)
    const data = {
        name,
        ID_number,
        mobile,
        email,
        image,
        attachments,
        entity_name,
        city,
        donation_type,
        donation_way,
        donate_periodically,
        repeat_donation,
        end_date,
        association_id
    } = req.body
    try {
        // if (req.file) {
        //     const Image = await cloudinary.uploader.upload(req.file.path)
        //     data.image = Image.secure_url
        //     console.log(data)
        // }
        if (req.files['image'] && req.files['image'][0]) {
            const imageFile = req.files['image'][0];
            const imageUpload = await cloudinary.uploader.upload(imageFile.path);
            data.image = imageUpload.secure_url;
        }

        // Process attachments upload (if any)
        if (req.files['attachments']) {
            const attachmentUploads = await Promise.all(
                req.files['attachments'].map(async (file) => {
                    try {
                        const result = await cloudinary.uploader.upload(file.path);
                        console.log(result)
                        return {
                            url: result.secure_url,  // Cloudinary URL
                            name: file.originalname,
                            public_id: result.public_id// Original filename
                        };
                        
                    } catch (error) {
                        console.error('Error uploading attachment to Cloudinary:', error);
                        throw error;
                    }
                })
            );
            data.attachments = attachmentUploads;
        }
        console.log(data.attachments)
        const supporter = await db.supporter.create(data)
        return new apiResponse(res, { supporter })
    } catch (error) {
        next(error)
    }
}
async function updateSupporter(req, res, next) {
    const { id } = req.params
    const updatedData = req.body
    try {
        const supporter = await db.supporter.findByPk(id)
        if (!supporter) throw new ApiError('المستخدم غير موجود')
        if (req.files['image'] && req.files['image'][0]) {
            const imageFile = req.files['image'][0];
            const imageUpload = await cloudinary.uploader.upload(imageFile.path);
            updatedData.image = imageUpload.secure_url;
        }

        // if (Array.isArray(supporter.attachments) && supporter.attachments.length > 0) {
        //     await Promise.all(supporter.attachments.map((file) => {
        //         return cloudinary.uploader.destroy(file.public_id);
        //     }));
        // }
        // Process attachments upload (if any)
        // if (req.files['attachments']) {
        //     const attachmentUploads = await Promise.all(
        //         req.files['attachments'].map(async (file) => {
        //             try {
        //                 const result = await cloudinary.uploader.upload(file.path);
        //                 console.log(result.secure_url)
        //                 return {
        //                     url: result.secure_url,  // Cloudinary URL
        //                     name: file.originalname,  // Original filename
        //                     public_id: result.public_id// Original filename
        //                 };

        //             } catch (error) {
        //                 console.error('Error uploading attachment to Cloudinary:', error);
        //                 throw error;
        //             }
        //         })
        //     );
        //     updatedData.attachments = attachmentUploads;
        // }
        const updatedSupporter = await supporter.update(updatedData)
        supporter.save()
        return new apiResponse(res, { updatedSupporter })
    } catch (error) {
        next(error)
    }
}
async function deleteSupporter(req, res, next) {

    const { id } = req.params
    try {
        const supporter = await db.supporter.findByPk(id)
        // console.log()
        if (!supporter) throw new ApiError('المستخدم غير موجود')
        await supporter.destroy();
        res.status(200).json('done')
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getSupporters,
    addSupporter,
    updateSupporter,
    deleteSupporter
}