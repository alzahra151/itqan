const { Router } = require("express");
const routes = Router();
const associationRoures = require('./association')
const administrationRoures = require('./administration')
const departmentRoutes = require('./department')
const executive_planRoutes = require('./executive_plan')
const missionRoutes = require('./mission')
const employeeRoutes = require('./employee')
const activityRoutes = require('./activity')
const strategic_planRoutes = require('./strategic_plan')
const beneficiary_categoryRoutes = require('./beneficiary_category')
const phased_planRoutes = require('./phased_plan')
const sub_goalRoutes = require('./sub_goal')
const roleRotes = require('./role');
const attachmentRoutes = require("./attachment");
const serviceRoutes = require("./service");
const beneficiaryRoutes = require("./beneficiary");
const mission_completedRoutes = require("./mission_completed");
const exective_plane_beneficiaryRoutes = require("./exective_plan_beneficiary");
const indicatorRoures = require('./indicator')
const directors_boardRoutes = require('./directors_board')
const reset_passwordRoutes = require("./reset_password");
const supporterRoutes=require('./supporter')
const volunteerRoutes = require('./volunteer')
const expected_impactRoutes = require('./expected_impact')
const completed_procedureRoutes=require('./completed_procedure')

routes.use('/api/v1/association', associationRoures)
routes.use('/api/v1/administration', administrationRoures)
routes.use('/api/v1/department', departmentRoutes)
routes.use('/api/v1/executive_plan', executive_planRoutes)
routes.use('/api/v1/mission', missionRoutes)
routes.use('/api/v1/employee', employeeRoutes)
routes.use('/api/v1/activity', activityRoutes)
routes.use('/api/v1/indicator', indicatorRoures)
routes.use('/api/v1/strategic_plan', strategic_planRoutes)
routes.use('/api/v1/beneficiary_category', beneficiary_categoryRoutes)
routes.use('/api/v1/phased_plan', phased_planRoutes)
routes.use('/api/v1/sub_goal', sub_goalRoutes)
routes.use('/api/v1/role', roleRotes)
routes.use('/api/v1/attachment', attachmentRoutes)
routes.use('/api/v1/service', serviceRoutes)
routes.use('/api/v1/beneficiary', beneficiaryRoutes)
routes.use('/api/v1/completed_mission', mission_completedRoutes)
routes.use('/api/v1/exective_plan_benficairy', exective_plane_beneficiaryRoutes)
routes.use('/api/v1/directors_board', directors_boardRoutes)
routes.use('/api/v1/supporter', supporterRoutes)
routes.use('/api/v1/volunteer', volunteerRoutes)
routes.use('/api/v1/expected_impact', expected_impactRoutes)
routes.use('/api/v1/completed_procedure', completed_procedureRoutes)
routes.use('/api/v1/reset_password', reset_passwordRoutes)









module.exports = routes

