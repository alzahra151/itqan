const db = require('../models')
const apiError = require('../helpers/apiError')
const cloudinary = require('./cloudinary')
async function addAssociation(req, res, next) {
    // console.log(req.body)
    // const { manager_Id } = req.params
    try {
        const associationData = {
            name,
            description,
            number,
            address,
            mobile,
            phone,
            CR_number,
            tax_number,
            manager_Id,
            image
        } = req.body
        console.log(manager_Id)
        // console.log(`${req.protocol}://${req.get('host')}/uploads/images`)
        // associationData.image = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`
        if (req.file) {
            console.log(req.file)
            const Image = await cloudinary.uploader.upload(req.file.path)
            console.log(Image)
            associationData.image = Image.secure_url
        }
        const association = await db.association.create(associationData)
        const manager = await db.employee.findByPk(manager_Id)
        if (!manager) throw new apiError("المستخدم غير مجود")
        console.log(association)
        await manager.update({ association_id: association.id })
        manager.save()
        res.status(200).json(association)
    } catch (error) {
        next(error)
    }
}
async function getAssociation(req, res, next) {
    const { id } = req.params;
    try {

        const association = await db.association.findAll({
            where: {
                id
            },
        })
        res.status(200).json(association[0])
    } catch (error) {
        next(error)
    }
}
module.exports = {
    addAssociation,
    getAssociation
}