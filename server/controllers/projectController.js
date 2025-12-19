const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");

// Add new project
exports.addProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "nexora/projects",
      transformation: [
        {
          width: 450,
          height: 350,
          crop: "fill",   
          gravity: "center",
        },
      ],
    });

    const project = new Project({
      name,
      description,
      image: result.secure_url,
    });

    await project.save();
    res.status(201).json({ message: "Project added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
