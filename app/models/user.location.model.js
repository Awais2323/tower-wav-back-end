module.exports = (sequelize, Sequelize) => {
    const SettingLocation = sequelize.define(
        "setting_location", {
            id:{
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            city : {
                type : Sequelize.STRING
            },
            state : {
                type : Sequelize.STRING
            },
            state_code: {
                type : Sequelize.STRING
            },
            hourly_rate: {
                type : Sequelize.INTEGER
            },
            signin_bonas: {
                type : Sequelize.INTEGER
            },
            shift_detail: {
                type : Sequelize.STRING
            }
        }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,         
          }
    );
  
    return SettingLocation;
  };