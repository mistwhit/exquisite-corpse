const User = require('./User');
const Poem = require('./Poem');
const Fragment = require('./Fragment')


User.hasMany(Fragment, {
  foreignKey: 'user_id',
});

Fragment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Fragment };
