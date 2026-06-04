const express = require("express");
const {
  addCab,
  getCabs,
  updateCab,
  deleteCab,
} = require("../controllers/cabController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getCabs);

router.post(
  "/",
  protect,
  upload.single("image"),
  addCab
);
router.put("/:id", protect, updateCab);
router.delete("/:id", protect, deleteCab);

module.exports = router;