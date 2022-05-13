module.exports = (sequelize, Sequelize) => {
    const PostJob = sequelize.define(
        "post_job", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        clientId: {
            type: Sequelize.STRING
            },
        employerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true
        },
        job_title: {
            type: Sequelize.STRING
        },
        job_description: {
            type: Sequelize.STRING
        },
        state_code: {
            type: Sequelize.STRING
        },
        state_name: {
            type: Sequelize.STRING
        },
        city_name: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
    );

    return PostJob;
};