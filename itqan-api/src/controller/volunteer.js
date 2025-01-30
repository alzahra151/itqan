const db = require('../models')
const apiResponse = require('../helpers/apiResponser')
const cloudinary = require('./cloudinary')

async function getVolunteers(req, res, next) {
    const { association_id } = req.params
    try {
        const volunteers = await db.volunteer.findAll({
            where: {
                association_id
            }
        })
        return new apiResponse(res, { volunteers })
        // res.status(200).json({ result: activities })
    } catch (error) {
        next(error)
    }
}

async function addVolunteer(req, res, next) {
    console.log(req.body)
    const data = {
        name,
        ID_number,
        mobile,
        email,
        image,
        volunteer_opportunity_name,
        volunteering_type,
        volunteering_nature,
        volunteering_place,
        volunteering_readiness,
        start_date,
        end_date,
        association_id
    } = req.body
    try {
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
                        console.log(result.secure_url)
                        return {
                            url: result.secure_url,  // Cloudinary URL
                            name: file.originalname,  // Original filename
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
        const volunteer = await db.volunteer.create(data)
        return new apiResponse(res, { volunteer })
    } catch (error) {
        next(error)
    }
}
async function updateVolunteer(req, res, next) {
    const { id } = req.params
    const updatedData = req.body
    try {
        const volunteer = await db.volunteer.findByPk(id)
        if (!volunteer) throw new ApiError('المستخدم غير موجود')
        if (req.files['image'] && req.files['image'][0]) {
            const imageFile = req.files['image'][0];
            const imageUpload = await cloudinary.uploader.upload(imageFile.path);
            updatedData.image = imageUpload.secure_url;
        }
        // if (volunteer.attachments && volunteer.attachments.length > 0) {
        //     await Promise.all(volunteer.attachments.map((file) => {
        //         return cloudinary.uploader.destroy(file.public_id);
        //     }));
        // }
        // // Process attachments upload (if any)
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
        const updatedVolunteer = await volunteer.update(updatedData)
        volunteer.save()
        return new apiResponse(res, { updatedVolunteer })
    } catch (error) {
        next(error)
    }
}
async function deleteVolunteer(req, res, next) {

    const { id } = req.params
    try {
        const volunteer = await db.volunteer.findByPk(id)
        // console.log()
        if (!volunteer) throw new ApiError('المستخدم غير موجود')
        await volunteer.destroy();
        res.status(200).json('done')
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getVolunteers,
    addVolunteer,
    updateVolunteer,
    deleteVolunteer
}