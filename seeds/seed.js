const sequelize = require('../config/connection');
const { User, Fragment } = require('../models');

const userData = require('./userData.json');
const fragmentData = require('./fragmentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const fragment of fragmentData) {
    await Fragment.create({
      ...fragment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
