const db = require('../models')
const apiResponse = require('../helpers/apiResponser')
const cloudinary = require('./cloudinary')
const ApiError = require('../helpers/apiError')

async function getDirectors_board(req, res, next) {
    const { association_id } = req.params
    try {
        const Directors_board_members = await db.directors_board.findAll({
            where: {
                association_id
            }
        })
        return new apiResponse(res, { Directors_board_members })
        // res.status(200).json({ result: activities })
    } catch (error) {
        next(error)
    }
}

async function addDirectors_board(req, res, next) {
    console.log(req.body)
    const data = {
        name,
        ID_number,
        address,
        gender,
        birth_date,
        mobile,
        email,
        // image,
        joining_date,
        membership_type,
        employer,
        is_founding_member,
        is_board_directores_member,
        educational_level,
        joining_way,
        job,
        job_description,
        insurance_number,
        salary_support,
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
        const Directors_board_member = await db.directors_board.create(data)
        return new apiResponse(res, { Directors_board_member })
    } catch (error) {
        next(error)
    }
}
async function updateDirectors_board(req, res, next) {
    const { id } = req.params
    const updatedData = req.body
    try {
        const directors_board = await db.directors_board.findByPk(id)
        if (!directors_board) throw new ApiError('المستخدم غير موجود')
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
        const updatedDirectors_board = await directors_board.update(updatedData)
        directors_board.save()
        return new apiResponse(res, { updatedDirectors_board })
    } catch (error) {
        next(error)
    }
}
async function deleteDirectorsBoardMember(req, res, next) {

    const { id } = req.params
    try {
        const Directors_board_member = await db.directors_board.findByPk(id)
        if (!Directors_board_member) throw new ApiError('المستخدم غير موجود')
        await Directors_board_member.destroy();
        res.status(200).json('done')
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getDirectors_board,
    addDirectors_board,
    updateDirectors_board,
    deleteDirectorsBoardMember
}