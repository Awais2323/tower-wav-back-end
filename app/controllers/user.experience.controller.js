const db = require("../models");
const userExperience = db.candidateExperience;

exports.saveExperience = async (req, res) => {
    await userExperience.create(req.body)
        .then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Created Successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                message: err.message || "Something Went wrong while requesting!"
            });
        });
};

exports.showAllExperiences = async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await userExperience.findAll({
            where: { userId }
        })
        .then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                message: err.message || "Something Went wrong while requesting!"
            });
        });
    }
};

exports.showExperienceById = async (req, res) => {
    const id = req.query.id;
    const userId = req.userId;

    if (!userId) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await userExperience.findOne({
            where: { id, userId }
        })
        .then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                message: err.message || "Something Went wrong while requesting!"
            });
        });
    }
};

exports.deleteExperience = async (req, res) => {
    const id = req.query.id;
    const userId = req.userId;
    try {
        const experience = await userExperience.findOne({
            where: { id, userId }
        });
        await experience.destroy().then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Deleted Successfully",
                data: data
            });
        }).catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                message: err.message || "Something Went wrong while requesting!"
            });
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            message: err.message || "Something Went wrong while requesting!"
        });
    }
};

exports.updateExperience = async (req, res) => {
    const id = req.query.id;
    const userId = req.userId;
    const {
        jobTitle,
        company,
        industry,
        manageTeam,
        salary,
        location,
        startDate,
        endDate,
        currentlyWorking,
        description
    } = req.body;

    try {
        const experience = await userExperience.findOne({
            where: { id, userId }
        });

        experience.jobTitle = jobTitle;
        experience.company = company;
        experience.industry = industry;
        experience.manageTeam = manageTeam;
        experience.salary = salary;
        experience.location = location;
        experience.startDate = startDate;
        experience.endDate = endDate;
        experience.currentlyWorking = currentlyWorking;
        experience.description = description;

        await experience.save().then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Updated Successfully",
                data: data
            });
        })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: err.message || "Something Went wrong while requesting!"
                });
            });
    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            message: err.message || "Something Went wrong while requesting!"
        });
    }
};