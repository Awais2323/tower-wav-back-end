const { QueryTypes } = require("sequelize");
const db = require("../models");
const CandidateProfile = db.candidateProfile;
const candidateEducation = db.candidateEducation;
const candidateExperience = db.candidateExperience;
const candidateProjects = db.candidateProjects;
const candidateSkills = db.candidateSkills;
const candidateLanguages = db.candidateLanguages;
const userJob = db.postJob;
const user = db.user;
const roles = db.role;
const settingLocation = db.settingLocation
const Op = db.Sequelize.Op;

// Create and Save a new Candidate
exports.createUpdate = async (req, res) => {  
    CandidateProfile.create(req.body)
      .then(data => {
        res.status(200).json({
          status: 200,
          success: false,
          message: "Created Successfully!",
          data: data
        });
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          success: false,
          message: err.message || "Some error occurred while creating."
        });
      });
};

exports.createSettingLocation = async (req, res) => {  
  settingLocation.create(req.body)
    .then(data => {
      res.status(200).json({
        status: 200,
        success: false,
        message: "Created Successfully!",
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        success: false,
        message: err.message || "Some error occurred while creating."
      });
    });
};

exports.updateSettingLocation = async (req, res) => {  
  settingLocation.update( {
    city : req.body.city,
    state : req.body.state,
    state_code : req.body.state_code,
    hourly_rate : req.body.hourly_rate,
    signin_bonas : req.body.signin_bonas,
    shift_detail : req.body.shift_detail,
  }, {
    where: { id: req.body.id },
  })
    .then(data => {
      res.status(200).json({
        status: 200,
        success: false,
        message: "Created Successfully!",
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        success: false,
        message: err.message || "Some error occurred while creating."
      });
    });
};

exports.getSettingLocation = async (req, res) => {  
  const settings = await settingLocation.findAll({
  });

try{
  if (!settings) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "cannot find location settings"
    });
  } else {
    res.status(200).json({
      status: 200,
      success: true,
      data: 
        settings 
      
    });
  }
} catch (err) {
  res.status(500).json({
    status: 500,
    success: false,
    message: err.message || "Something Went wrong while requesting!"
  });
}
};

exports.getUserSettingLocation = async (req, res) => {  
  const settings = await settingLocation.findAll(
    {
      where: { state_code : req.body.state_code,},
    }
  );

try{
  if (!settings) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "cannot find location settings"
    });
  } else {
    res.status(200).json({
      status: 200,
      success: true,
      data: 
        settings 
      
    });
  }
} catch (err) {
  res.status(500).json({
    status: 500,
    success: false,
    message: err.message || "Something Went wrong while requesting!"
  });
}
};

exports.updateUserSettingLocation = async (req, res) => {  
  settingLocation.update( {
  city: req.body.city,
  state: req.body.state,
  state_code: req.body.state_code, 
  hourly_rate: req.body.hourly_rate,
  signin_bonas: req.body.signin_bonas,
  shift_detail: req.body.shift_detail,
  }, {
    where: { id: req.body.id },
  }).then(num => {
    if (num == 1) {
      res.status(200).json({
        status: 200,
        success: false,
        message: "Updated Successfully"
      });
    } else {
      res.status(500).json({
        status: 500,
        success: false,
        message: "No changes were made!"
      });
    }
  })
    .catch(err => {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Error updating with id=" + req.userId
      });
    });
};

exports.updateUserRole = async (req, res) => {
  const id = req.body.id;
  const roleId = req.body.roleId;

  db.sequelize.query(
    `UPDATE user_roles SET roleId=${roleId} WHERE userId=${id}`,
    { type: QueryTypes.UPDATE }
  ) .then(data => {
    res.status(200).json({
      status: 200,
      success: false,
      message: "Created Successfully!",
      data: data
    });
  })
  .catch(err => {
    res.status(500).json({
      status: 500,
      success: false,
      message: err.message || "Some error occurred while creating."
    });
  });
};

exports.update = async (req, res) => {
  
  CandidateProfile.update( {
    employerId: req.body.employerId,
    userId: req.body.employerId,
    status: req.body.status,
    status_code: req.body.status_code,
  }, {
    where: { id: req.body.id },
  }).then(num => {
    if (num == 1) {
      res.status(200).json({
        status: 200,
        success: false,
        message: "Updated Successfully"
      });
    } else {
      res.status(500).json({
        status: 500,
        success: false,
        message: "No changes were made!"
      });
    }
  })
};

exports.updateTypeShift = async (req, res) => {
  
  CandidateProfile.update( {
            candidate_type: req.body.candidate_type,
            shift: req.body.shift,
  }, {
    where: { id: req.body.id },
  }).then(num => {
    if (num == 1) {
      res.status(200).json({
        status: 200,
        success: false,
        message: "Updated Successfully"
      });
    } else {
      res.status(500).json({
        status: 500,
        success: false,
        message: "No changes were made!"
      });
    }
  })
};

exports.updateDLDetail = async (req, res) => {
CandidateProfile.update( {
          DLN:req.body.DLN,
          DOB: req.body.DOB,
          zip_code: req.body.zip_code,
}, {
  where: { id: req.body.id },
}).then(num => {
  if (num == 1) {
    res.status(200).json({
      status: 200,
      success: false,
      message: "Updated Successfully"
    });
  } else {
    res.status(500).json({
      status: 500,
      success: false,
      message: "No changes were made!"
    });
  }
})
};

exports.updateCandidateNotes = async (req, res) => {
  
  CandidateProfile.update( {
    notes: req.body.notes,
  }, {
    where: { id: req.body.id },
  }).then(num => {
    if (num == 1) {
      res.status(200).json({
        status: 200,
        success: false,
        message: "Updated Successfully"
      });
    } else {
      res.status(500).json({
        status: 500,
        success: false,
        message: "No changes were made!"
      });
    }
  })
    .catch(err => {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Error updating with id=" + req.userId
      });
    });
};

exports.getUserById = async (req, res) => {
  const id = req.query.id;
  const userId = req.userId;

  try {
    const profile = await CandidateProfile.findOne({
      where: { id, userId }
    });

    const education = await candidateEducation.findAll({
      where: { userId }
    });

    const experience = await candidateExperience.findAll({
      where: { userId }
    });

    const projects = await candidateProjects.findAll({
      where: { userId }
    });

    const skills = await candidateSkills.findAll({
      where: { userId }
    });

    const languages = await candidateLanguages.findAll({
      where: { userId }
    });


    if (!profile && !education && !projects && !skills && !languages) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "cannot find user"
      });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
        data: [
          { profile },
          { education },
          { experience },
          { projects },
          { skills },
          { languages },
        ]
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err.message || "Something Went wrong while requesting!"
    });
  }

}

exports.getAllUsers = async (req, res) => {
  const client_id = req.body.clientId;
    const profile = await CandidateProfile.findAll({
      where: { client_id },
      include: [userJob,user],
    });

try{
    if (!profile) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "cannot find candidates"
      });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
        data: 
          profile 
        
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err.message || "Something Went wrong while requesting!"
    });
  }
}

exports.showSearchUsers = async (req, res) => {
  const client_id = req.body.clientId;
  const term = req.body.term;

  if (!client_id && !term) {
      res.status(403).json({
          status: 403,
          success: false,
          message: "Unauthorize"
      });
  } else {
      await CandidateProfile.findAll({
          where: { client_id, [Op.or]: [{'$post_job.job_title$': { [Op.like]: `%${term}%` }},{'$post_job.state_name$': { [Op.like]: `%${term}%` }},{'$post_job.city_name$': { [Op.like]: `%${term}%` }},{source: { [Op.like]: `%${term}%` }},{status: { [Op.like]: `%${term}%` }}, ] },
        include: [userJob, user],
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

exports.showFilterUsers = async (req, res) => {
  const clientId = req.body.clientId;
  const filter = req.body.filter;
  const jobState = filter.state.map(state => state.name);
  const jobCitys = filter.city.map(city => city.name);
  const jobs = filter.jobs.map(job => job.id);
  const status = filter.status?.value;
  const source = filter.source?.value;

  if (!clientId && filter) {
      res.status(403).json({
          status: 403,
          success: false,
          message: "Unauthorize"
      });
  } else {

      const jobsByState = await CandidateProfile.findAll({
          where: {
              client_id: clientId,
              [Op.and]: [{
                  '$post_job.state_name$': jobState
              },
                { '$post_job.city_name$': jobCitys, },
                { jobId: jobs },
                { status_code: status },
              {source: source}
              ]
          },
          include: [userJob,user]
      });
          res.status(200).json({
              status: 200,
              success: true,
              data: jobsByState
          });
  }
};



exports.getAllUsersRoles = async (req, res) => {
  const profile = await db.sequelize.query(
    `Select * from user_roles`,
    { type: QueryTypes.SELECT }
  );

try{
    if (!profile) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "cannot find candidates"
      });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
        data: 
          profile 
        
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err.message || "Something Went wrong while requesting!"
    });
  }
}

exports.getAllRoles = async (req, res) => {
    const rolelist = await roles.findAll({
    });

try{
    if (!rolelist) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "cannot find roles"
      });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
        data: 
        rolelist 
        
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err.message || "Something Went wrong while requesting!"
    });
  }
}

exports.getUserCandidates = async (req, res) => {
  const client_id = req.body.clientId;
  const userId = req.body.userId;
    const profile = await CandidateProfile.findAll({
      where: { client_id, userId },
      include: [userJob,user],
    });

try{
    if (!profile) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "cannot find candidates"
      });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
        data: 
          profile 
        
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err.message || "Something Went wrong while requesting!"
    });
  }
}

exports.showSearchUsersByUser = async (req, res) => {
  const client_id = req.body.clientId;
  const userId = req.body.userId;
  const term = req.body.term;

  if (!client_id && !term) {
      res.status(403).json({
          status: 403,
          success: false,
          message: "Unauthorize"
      });
  } else {
      await CandidateProfile.findAll({
          where: { client_id,userId, [Op.or]: [{'$post_job.job_title$': { [Op.like]: `%${term}%` }},{'$post_job.state_name$': { [Op.like]: `%${term}%` }},{'$post_job.city_name$': { [Op.like]: `%${term}%` }},{source: { [Op.like]: `%${term}%` }},{status: { [Op.like]: `%${term}%` }}, ] },
        include: [userJob, user],
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

exports.showFilterUsersByUser = async (req, res) => {
  const clientId = req.body.clientId;
  const userId = req.body.userId;
  const filter = req.body.filter;
  const jobState = filter.state.map(state => state.name);
  const jobCitys = filter.city.map(city => city.name);
  const jobs = filter.jobs.map(job => job.id);
  const status = filter.status?.value;
  const source = filter.source?.value;

  if (!clientId && filter) {
      res.status(403).json({
          status: 403,
          success: false,
          message: "Unauthorize"
      });
  } else {

      const jobsByState = await CandidateProfile.findAll({
          where: {
          client_id: clientId,
          userId,
              [Op.and]: [{
                  '$post_job.state_name$': jobState
              },
                { '$post_job.city_name$': jobCitys, },
                { jobId: jobs },
                { status_code: status },
              {source: source}
              ]
          },
          include: [userJob,user]
      });
          res.status(200).json({
              status: 200,
              success: true,
              data: jobsByState
          });
  }
};

exports.getAllEmployees = async (req, res) => {
  user.findAll({include: [roles]}).then(data => {
    res.status(200).json({
        status: 200,
        success: true,
        data: data
    });
}).catch(err => {
        res.status(500).json({
            status: 500,
            success: false,
            message: err.message || "Something Went wrong while requesting!"
        });
    });
};