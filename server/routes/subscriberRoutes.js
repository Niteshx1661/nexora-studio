const express = require("express");
const router = express.Router();
const {
  subscribeEmail,
  getSubscribers,
} = require("../controllers/subscriberController");

router.post("/subscribe", subscribeEmail);
router.get("/", getSubscribers);

module.exports = router;
