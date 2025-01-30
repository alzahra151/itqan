const db = require('../models')
const apiResponse = require('../helpers/apiResponser');
const ApiError = require('../helpers/apiError');
const ApiResponser = require('../helpers/apiResponser');
const { Op } = require('sequelize');
const { users } = require('./faker')

async function addBeneficiary(req, res, next) {
    try {
        const result = await db.sequelize.transaction(async (transaction) => {
            let { name,
                record_history,
                file_no,
                gender,
                birth_date,
                nationality,
                marital_status,
                educational_level,
                job,
                scientific_certificates,
                employer,
                monthly_income_from,
                monthly_income_to,
                housing_type,
                mobility_status,
                email,
                home_address,
                work_address,
                Image,
                // age,
                type,
                association_id,
                /// associated 
                identity,
                colse_person,
                illnesses,
                dependents,
                services,
                home_number,
                work_number,
                phone_number,
                whatsApp_number
            } = req.body

            const beneficiary = await db.beneficiary.create({
                name,
                record_history,
                file_no,
                gender,
                birth_date,
                nationality,
                marital_status,
                educational_level,
                job,
                scientific_certificates,
                employer,
                monthly_income_from,
                monthly_income_to,
                housing_type,
                mobility_status,
                email,
                home_address,
                work_address,
                Image,
                // age,
                type,
                association_id
            },
                { transaction }
            )

            let Identity = { ...identity, beneficiary_id: beneficiary.id }
            let Colse_person = { ...colse_person, beneficiary_id: beneficiary.id }
            let Illnesses = { ...illnesses, beneficiary_id: beneficiary.id }
            let Dependents = dependents.map((dependent) => ({
                ...dependent,
                beneficiary_id: beneficiary.id,
            }))
            let Services = services.map((service) => ({
                ...service,
                beneficiary_id: beneficiary.id,
            }))
            let contactNumbers = [home_number, work_number, phone_number, whatsApp_number]
            let contactNumberList = contactNumbers.map((number) => ({
                ...number,
                beneficiary_id: beneficiary.id,
            }))
            console.log(contactNumberList)
            const addedTdentity = await db.identity.create(Identity, { transaction })
            const addedColse_person = await db.close_person.create(Colse_person, { transaction })
            const addedIllnesses = await db.illness.create(Illnesses, { transaction })
            const addedDependents = await db.dependent.bulkCreate(Dependents, { transaction })
            const addedServices = await db.beneficiary_sevice.bulkCreate(Services, { transaction })
            const addedContactNums = await db.contact_number.bulkCreate(contactNumberList, { transaction })

            return {
                beneficiary,
                addedTdentity,
                addedColse_person,
                addedIllnesses,
                addedDependents,
                addedContactNums,
                addedServices
            }
        })
        // return new ApiResponser(res, { result })
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}
async function getBeneficaries(req, res, next) {
    const { association_id } = req.params
    try {
        let where = {
            association_id
        }
        const {
            name,
            file_no,
            contact_number,
            illness_name,
            serviceId,
            type,
            identity,
            end_date,
            start_date,
            // minAge,
            // maxAge
        } = req.query
        console.log(req.query)
        // if (minAge && maxAge) {
        //     where.age = { [Op.between]: [parseInt(minAge), parseInt(maxAge)] };
        // } else if (minAge) {
        //     where.age = { [Op.gte]: parseInt(minAge) };
        // } else if (maxAge) {
        //     where.age = { [Op.lte]: parseInt(maxAge) };
        // }
        if (type) where.type = type
        if (name) where.name = { [Op.like]: `%${name}%` };
        if (file_no) where.file_no = { [Op.like]: `%${file_no}%` };
        if (start_date && end_date) where.createdAt = { [Op.between]: [start_date, end_date] }
        const beneficiaries = await db.beneficiary.findAll({
            order: [['id', 'ASC']],
            where,
            include: [
                {
                    model: db.contact_number,
                    as: "contact_numbers",
                    ...(contact_number && {
                        where: {
                            number: { [Op.like]: `%${contact_number}%` }
                        }
                    })
                },
                {
                    model: db.dependent,
                    as: "dependents"
                },
                {
                    model: db.illness,
                    as: "illnesse",
                    ...(illness_name && {
                        where: {
                            name: { [Op.like]: `%${illness_name}%` }
                        }
                    })
                },
                { model: db.attachment, as: "attachments" },
                {
                    model: db.beneficiary_sevice, as: "beneficiary_sevices",
                    ...(serviceId && {
                        where: {
                            service_id: serviceId
                        },
                    }),
                    include: [
                        {
                            model: db.service,
                            as: "service"
                        }
                    ]
                },
                { model: db.close_person, as: "close_person" },
                {
                    model: db.identity, as: "identity",
                    ...(identity && {
                        where: {
                            value: { [Op.like]: `%${identity}%` }
                        }
                    })

                }
            ]
        })
        return new ApiResponser(res, { beneficiaries })
    } catch (error) {
        next(error)
    }
}
async function getBeneficiaryByTd(req, res, next) {
    const { id } = req.params
    try {
        const beneficiary = await db.beneficiary.findByPk(id, {
            include: [
                {
                    model: db.contact_number,
                    as: "contact_numbers",
                   
                },
                {
                    model: db.dependent,
                    as: "dependents"
                },
                {
                    model: db.illness,
                    as: "illnesse",
                   
                },
                { model: db.attachment, as: "attachments" },
                {
                    model: db.beneficiary_sevice,
                    as: "beneficiary_sevices",
                   
                    include: [
                        {
                            model: db.service,
                            as: "service"
                        }
                    ]
                },
                { model: db.close_person, as: "close_person" },
                {
                    model: db.identity, as: "identity",
                    

                }
            ]
        })
        if (!beneficiary) throw new ApiError('المستخدم غير موجودw')
        return new ApiResponser(res, { beneficiary })

    } catch (error) {
        next(error)
    }
}
async function deleteBeneficiary(req, res, next) {

    const { id } = req.params
    try {
        const beneficiary = await db.beneficiary.findByPk(id)
        if (!beneficiary) throw new ApiError('المستخدم غير موجود')
        // Optionally, first delete related records manually
        await db.attachment.destroy({ where: { beneficiary_id: id } });
        await db.contact_number.destroy({ where: { beneficiary_id: id } });
        await db.dependent.destroy({ where: { beneficiary_id: id } });
        await db.close_person.destroy({ where: { beneficiary_id: id } });
        await db.identity.destroy({ where: { beneficiary_id: id } });
        await beneficiary.destroy();
        res.status(200).json('done')
    } catch (error) {
        next(error)
    }
}
module.exports = {
    addBeneficiary,
    getBeneficaries,
    // addDomy,
    deleteBeneficiary,
    getBeneficiaryByTd
}