const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const educationController = require("../controllers/user.education.controller");
const projectsController = require("../controllers/user.projects.controller");
const skillsController = require("../controllers/user.skills.controller");
const languagesController = require("../controllers/user.languages.controller");
const experienceController = require("../controllers/user.experience.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user/profile/create", [authJwt.verifyToken], controller.createUpdate);
  app.put("/api/user/profile/update", [authJwt.verifyToken], controller.update);
  app.put("/api/user/profile/updateRole", [authJwt.verifyToken], controller.updateUserRole);
  app.post("/api/user/profile/getUserCandidates", [authJwt.verifyToken], controller.getUserCandidates);
  app.post("/api/user/profile/updateCandidateNotes", [authJwt.verifyToken], controller.updateCandidateNotes);
  app.post("/api/user/profile/getAllEmployees", [authJwt.verifyToken], controller.getAllEmployees)
  app.get("/api/user/profile/getAllRoles", controller.getAllRoles)
  app.get("/api/user/profile/getAllUsersRoles", controller.getAllUsersRoles)
  app.post("/api/user/profile/createSettingLocation", [authJwt.verifyToken], controller.createSettingLocation)
  app.post("/api/user/profile/updateUserSettingLocation", [authJwt.verifyToken], controller.updateUserSettingLocation)
  app.get("/api/user/profile/getSettingLocation", controller.getSettingLocation)
  app.post("/api/user/profile/getUserSettingLocation", controller.getUserSettingLocation)
  app.get("/api/user/profile/getOne", [authJwt.verifyToken], controller.getUserById);
  app.post("/api/user/profile/getAll", [authJwt.verifyToken], controller.getAllUsers);
  app.post("/api/user/profile/showFilterUsers", [authJwt.verifyToken], controller.showFilterUsers);
  app.post("/api/user/profile/showSearchUsers", [authJwt.verifyToken], controller.showSearchUsers);
  app.post("/api/user/profile/showFilterUsersByUser", [authJwt.verifyToken], controller.showFilterUsersByUser);
  app.post("/api/user/profile/showSearchUsersByUser", [authJwt.verifyToken], controller.showSearchUsersByUser);

  //Education
  app.post("/api/user/education/create", [authJwt.verifyToken], educationController.saveEducation);
  app.get("/api/user/education/getOne", [authJwt.verifyToken], educationController.showEducationById);
  app.get("/api/user/education/getAll", [authJwt.verifyToken], educationController.showAllEducations);
  app.delete("/api/user/education/delete", [authJwt.verifyToken], educationController.deleteEducation);
  app.put("/api/user/education/update", [authJwt.verifyToken], educationController.updateEducation);


  //projects
  app.post("/api/user/projects/create", [authJwt.verifyToken], projectsController.saveProjects);
  app.get("/api/user/projects/getOne", [authJwt.verifyToken], projectsController.showProjectById);
  app.get("/api/user/projects/getAll", [authJwt.verifyToken], projectsController.showAllProjects);
  app.delete("/api/user/projects/delete", [authJwt.verifyToken], projectsController.deleteProjects);
  app.put("/api/user/projects/update", [authJwt.verifyToken], projectsController.updateProjects);

  //skills
  app.post("/api/user/skills/create", [authJwt.verifyToken], skillsController.saveSkills);
  app.get("/api/user/skills/getOne", [authJwt.verifyToken], skillsController.showSkillById);
  app.get("/api/user/skills/getAll", [authJwt.verifyToken], skillsController.showAllSkills);
  app.delete("/api/user/skills/delete", [authJwt.verifyToken], skillsController.deleteSkills);
  app.put("/api/user/skills/update", [authJwt.verifyToken], skillsController.updateSkills);

  //languages
  app.post("/api/user/languages/create", [authJwt.verifyToken], languagesController.saveLanguages);
  app.get("/api/user/languages/getOne", [authJwt.verifyToken], languagesController.showLanguageById);
  app.get("/api/user/languages/getAll", [authJwt.verifyToken], languagesController.showAllLanguages);
  app.delete("/api/user/languages/delete", [authJwt.verifyToken], languagesController.deleteLanguages);
  app.put("/api/user/languages/update", [authJwt.verifyToken], languagesController.updateLanguages);

  // User Experience
  app.post("/api/user/experience/create", [authJwt.verifyToken], experienceController.saveExperience);
  app.get("/api/user/experience/getOne", [authJwt.verifyToken], experienceController.showExperienceById);
  app.get("/api/user/experience/getAll", [authJwt.verifyToken], experienceController.showAllExperiences);
  app.delete("/api/user/experience/delete", [authJwt.verifyToken], experienceController.deleteExperience);
  app.put("/api/user/experience/update", [authJwt.verifyToken], experienceController.updateExperience);

};
