// const { faker } = require('@faker-js/faker');

// function createRandomUser() {
//     return {
//         name: faker.internet.userName(),
//         record_history: faker.date.past(),
//         file_no: faker.number.int(),
//         gender: faker.helpers.arrayElement(['maile', 'femaile']),
//         birth_date: faker.date.birthdate(),
//         nationality: faker.location.country(),
//         marital_status: faker.helpers.arrayElement(['single', 'married', 'divorced', 'widowed']),
//         educational_level: faker.helpers.arrayElement(['High School', 'Bachelors', 'Masters', 'PhD']),
//         job: faker.company.name(),
//         employer: faker.company.name(),
//         monthly_income_from: faker.number.int({ min: 1000, max: 5000 }),
//         monthly_income_to: faker.number.int({ min: 5001, max: 10000 }),
//         housing_type: faker.helpers.arrayElement(['Owned', 'Rented', 'Mortgaged']),
//         mobility_status: faker.helpers.arrayElement(['ليس لديه خادم', 'لايستطيع الحركة بمفرده', 'ليس لديه وسيلة نقل']),
//         email: faker.internet.email(),
//         home_address: faker.location.streetAddress(),
//         Image: faker.image.avatar(),
//         age: faker.number.int({ min: 10, max: 80 }),
//         type: faker.helpers.arrayElement(['الموظفين', 'مجتمعى', 'المرضى']),
//     };
// }

// const users = faker.helpers.multiple(createRandomUser, {
//     count: 5,
// });

// module.exports = {
//     createRandomUser,
//     users
// }
