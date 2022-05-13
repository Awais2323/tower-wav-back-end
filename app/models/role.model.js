module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type:Sequelize.BOOLEAN
    },
    isManager: {
      type:Sequelize.BOOLEAN
    },
    isEmployee: {
      type:Sequelize.BOOLEAN
    }
  });

  return Role;
};
