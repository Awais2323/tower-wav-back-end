module.exports = (sequelize, Sequelize) => {
    const CandidateProfile = sequelize.define(
        "candidate_profile", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
                },
                jobId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    foreignKey: true
                },
                employerId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    foreignKey: true
                },
                client_id: {
                    type: Sequelize.STRING
                },
                source: {
                    type: Sequelize.STRING  
                },
                referral: {
                    type: Sequelize.STRING  
                },
                first_name: {
                type: Sequelize.STRING
                },
                
                last_name: {
                    type: Sequelize.STRING
                },
            email: {
                type: Sequelize.STRING
            },
            phone_number: {
                type: Sequelize.STRING
            },
            notes: {
                type: Sequelize.STRING
            },
            DLN: {
                type: Sequelize.STRING
            },
            DOB: {
                type: Sequelize.STRING
            },
            zip_code: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING 
            },
            status_code: {
                type: Sequelize.INTEGER 
            },
            candidate_type: {
                type: Sequelize.STRING
            },
            shift: {
                type: Sequelize.STRING 
            },
            shift: {
                type: Sequelize.STRING 
            },
            profile_photo: {
                type: Sequelize.STRING 
            },
            BGC: {
                type: Sequelize.STRING 
            },
            drug_test: {
                type: Sequelize.STRING 
            },
            training: {
                type: Sequelize.STRING 
            },
            service: {
                type: Sequelize.STRING 
            },
            hire_or_not: {
                type: Sequelize.STRING
            },
            hire_date: {
                type: Sequelize.STRING
            },
            service_status: {
                type: Sequelize.STRING
            },
            bonus_status: {
                type: Sequelize.STRING
            },
            service_driver: {
                type: Sequelize.STRING
            },
            service_deactive: {
                type: Sequelize.STRING
            },
            violations: {
                type: Sequelize.STRING
            },
            wheel_chair: {
                type: Sequelize.STRING
            },
            lifting_weight: {
                type: Sequelize.STRING
            },
            DLN_status: {
                type: Sequelize.STRING
            }


        }, {
            timestamps: true,
            createdAt: true,
            updatedAt: true,         
          }
    );
  
    return CandidateProfile;
  };