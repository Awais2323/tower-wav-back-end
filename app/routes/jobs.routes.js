const { authJwt } = require("../middleware");
const jobsListController = require("../controllers/jobs.list.controller");
const applicationController = require("../controllers/application.controller");
const jobPostController = require("../controllers/post.job.controller");

module.exports = function (app) {

    //list of all jobs
    app.post("/api/jobs/list/getAll", jobPostController.showAllJobs);
    app.post("/api/jobs/list/getSearchJob", [authJwt.verifyToken], jobPostController.showSearchJobs);
    app.post("/api/jobs/list/getFilterJob",[authJwt.verifyToken], jobPostController.showFilterJobs);
    app.get("/api/jobs/list/getOne", jobsListController.showJobById);

    //job application
    app.post("/api/job/application/create", [authJwt.verifyToken], jobPostController.saveJob);
    app.post("/api/job/application/edit", [authJwt.verifyToken], jobPostController.updateJob);
    app.get("/api/job/application/getOne", [authJwt.verifyToken], applicationController.showApplicationById);
    app.post("api/job/post/create", jobPostController.saveJob)
    // app.get("/api/job/application/getAll", applicationController.showAllApplications);
    // app.delete("/api/job/application/delete", applicationController.deleteApplication);
    // app.put("/api/job/application/update", applicationController.updateApplication);

};