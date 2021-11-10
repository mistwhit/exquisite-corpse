const User = require('./User');
const Poem = require('./Poem');
const Fragment = require('./Fragment')


User.hasMany(Fragment, {
  foreignKey: 'user_id',
});

User.hasMany(Poem, {
  foreignKey: 'user_id',
});

Poem.belongsTo(User, {
  foreignKey: 'user_id',
});

Poem.hasMany(Fragment, {
  foreignKey: 'poem_id',
});

Fragment.belongsTo(User, {
  foreignKey: 'user_id'
});

Fragment.belongsTo(Poem, {
  foreignKey: 'poem_id',
});


module.exports = { User, Poem, Fragment };
