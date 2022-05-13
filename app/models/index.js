const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    // define: {
    //   freezeTableName: true
    // }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

//candidate models
db.candidateProfile = require("./candidate.profile.model")(sequelize, Sequelize);
db.candidateEducation = require("./candidate.education.model")(sequelize, Sequelize);
db.candidateProjects = require("./user.projects.model")(sequelize, Sequelize);
db.candidateSkills = require("./user.skills.model")(sequelize, Sequelize);
db.candidateLanguages = require("./user.languages.model")(sequelize, Sequelize);
db.candidateExperience = require("./user.experience.model")(sequelize, Sequelize);
db.settingLocation = require("./user.location.model")(sequelize,Sequelize)

//employer models
// db.employerProfile = require("./employer.profile.model")(sequelize, Sequelize);
db.employerInfo = require("./employer.info.model")(sequelize, Sequelize);
// db.jobPost = require("./job.post.model")(sequelize, Sequelize);
db.postJob = require("./post.job.model")(sequelize, Sequelize);
db.jobSkills = require("./job.skills.model")(sequelize, Sequelize);
db.jobLocation = require("./job.location.model")(sequelize, Sequelize);

//company
db.companyProfile = require("./company.profile.model")(sequelize, Sequelize);

//job application
db.jobApplication = require("./job.application.model")(sequelize, Sequelize);
// ASSOCIATIONS

//user and role
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// candidate profile
db.user.hasOne(db.candidateProfile,{
  foreignKey: "userId"
});
db.candidateProfile.belongsTo(db.user, {
  foreignKey : 'userId'
});

// education
db.user.hasMany(db.candidateEducation,{
  foreignKey: "userId"
});
db.candidateEducation.belongsTo(db.user, {
  foreignKey : 'userId'
});

// projects
db.user.hasMany(db.candidateProjects,{
  foreignKey: "userId"
});
db.candidateProjects.belongsTo(db.user, {
  foreignKey : 'userId'
});

// skills
db.user.hasMany(db.candidateSkills,{
  foreignKey: "userId"
});
db.candidateSkills.belongsTo(db.user, {
  foreignKey : 'userId'
});

// languages
db.user.hasMany(db.candidateLanguages,{
  foreignKey: "userId"
});
db.candidateLanguages.belongsTo(db.user, {
  foreignKey : 'userId'
});

//Experience
db.user.hasMany(db.candidateExperience, {foreignKey: "userId"});
db.candidateExperience.belongsTo(db.user);

// EMPLOYERS

// employers profile

db.user.hasOne(db.employerInfo,{
  foreignKey: "employerId"
});
db.employerInfo.belongsTo(db.user, {
  foreignKey : 'employerId'
});

db.user.hasMany(db.postJob,{
  foreignKey: "employerId"
});
db.postJob.belongsTo(db.user, {
  foreignKey : 'employerId'
});

db.postJob.hasMany(db.candidateProfile, {foreignKey: 'jobId'});
db.candidateProfile.belongsTo(db.postJob, {
foreignKey : 'jobId'
})


db.user.hasMany(db.companyProfile,{
  foreignKey: "employerId"
});
db.companyProfile.belongsTo(db.user, {
  foreignKey : 'employerId'
});

// Job Application

// job and application
db.user.hasMany(db.jobApplication,{
  foreignKey: "userId"
});
db.jobApplication.belongsTo(db.user, {
  foreignKey : 'userId'
});

db.postJob.hasMany(db.jobApplication,{
  foreignKey: "jobId"
});
db.jobApplication.belongsTo(db.postJob, {
  foreignKey : 'jobId'
});

// candidate and application
db.candidateProfile.hasMany(db.jobApplication,{
  foreignKey: "candidateId"
});
db.jobApplication.belongsTo(db.candidateProfile, {
  foreignKey : 'candidateId'
});


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
