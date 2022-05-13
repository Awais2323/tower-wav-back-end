module.exports = (sequelize, Sequelize) => {
    const JobSkills = sequelize.define(
        "job_skill", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        skill_title: {
            type: Sequelize.STRING
        },
        skill_level: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );

    return JobSkills;
};