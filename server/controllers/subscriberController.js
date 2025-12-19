const Subscriber = require("../models/Subscriber");

// Subscribe email
exports.subscribeEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all subscribers
exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
