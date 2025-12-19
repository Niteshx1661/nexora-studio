const Contact = require("../models/Contact");

// Save contact form data
exports.submitContact = async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;

    const contact = new Contact({
      fullName,
      email,
      mobile,
      city,
    });

    await contact.save();
    res.status(201).json({ message: "Contact form submitted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all contact submissions
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
