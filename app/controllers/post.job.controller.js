const db = require("../models");
const userJob = db.postJob;
const User = db.user;
const CandidateProfile = db.candidateProfile;
const Op = db.Sequelize.Op;

const uniqBy = require("lodash")

exports.saveJob = async (req, res) => {
    await userJob.create(req.body).then(data => {
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

exports.showAllJobs = async (req, res) => {
    const clientId = req.body.clientId;

    if (!clientId) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await userJob.findAll({
            where: { clientId },
            include: [User,CandidateProfile]
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

exports.showSearchJobs = async (req, res) => {
    const clientId = req.body.clientId;
    const term = req.body.term;

    if (!clientId && !term) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await userJob.findAll({
            where: { clientId, [Op.or]: [{job_title: { [Op.like]: `%${term}%` }},{state_name: { [Op.like]: `%${term}%` }},{city_name: { [Op.like]: `%${term}%` }}] },
            include: [User,CandidateProfile]
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

exports.showFilterJobs = async (req, res) => {
    const clientId = req.body.clientId;
    const filter = req.body.filter;
    const jobState = filter.state.map(state => state.name);
    const jobCitys = filter.city.map(city => city.name);

    if (!clientId && filter) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {

        const jobsByState = await userJob.findAll({
            where: {
                clientId,
                [Op.or]: [{
                    state_name: jobState
                },
                {city_name: jobCitys,}
                ]
            },
            include: [User, CandidateProfile]
        });
            res.status(200).json({
                status: 200,
                success: true,
                data: jobsByState
            });
    }
};

exports.showJobById = async (req, res) => {
    const id = req.query.id;
    const employerId = req.userId;

    if (!employerId) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await userJob.findOne({
            where: { id, employerId }
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


exports.deleteJob = async (req, res) => {
    const id = req.query.id;
    const employerId = req.userId;
    try {
        const job = await userJob.findOne({
            where: { id, employerId }
        });
        await job.destroy().then(data => {
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

exports.updateJob = async (req, res) => {
    const {
        id,
        employerId,
        clientId,
        job_title,
        job_description,
        state_code,
        state_name,
        city_name,
        company
    } = req.body;

    try {
        const job = await userJob.findOne({
            where: { id, employerId }
        });

        job.job_title = job_title;
        job.job_description = job_description;
        job.clientId = clientId;
        job.company = company;
        job.state_code = state_code;
        job.state_name = state_name;
        job.city_name = city_name;

        await job.save().then(data => {
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