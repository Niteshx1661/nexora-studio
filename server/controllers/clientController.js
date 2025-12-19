const Client = require("../models/Client");
const cloudinary = require("../config/cloudinary");

// Add client
exports.addClient = async (req, res) => {
  try {
    const { name, designation, description } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "nexora/clients",
      transformation: [
        {
          width: 450,
          height: 350,
          crop: "fill",
          gravity: "center",
        },
      ],
    });

    const client = new Client({
      name,
      designation,
      description,
      image: result.secure_url,
    });

    await client.save();
    res.status(201).json({ message: "Client added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
