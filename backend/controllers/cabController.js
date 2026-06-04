const pool = require("../config/db");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "sudagar-cabs" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Add new cab
const addCab = async (req, res) => {
  try {
    const {
      cab_name,
      category,
      seats,
      ac_type,
      price_per_km,
      availability,
    } = req.body;

    let image = null;

    if (req.file) {
      const uploadedImage = await uploadToCloudinary(req.file.buffer);
      image = uploadedImage.secure_url;
    }

    const result = await pool.query(
      `INSERT INTO cabs 
      (cab_name, category, seats, ac_type, price_per_km, availability, image)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        cab_name,
        category,
        seats,
        ac_type,
        price_per_km,
        availability,
        image,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Cab added successfully",
      cab: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all cabs
const getCabs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cabs ORDER BY id DESC");

    res.json({
      success: true,
      total: result.rows.length,
      cabs: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update cab
const updateCab = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      cab_name,
      category,
      seats,
      ac_type,
      price_per_km,
      availability,
    } = req.body;

    const result = await pool.query(
      `UPDATE cabs
       SET cab_name = $1,
           category = $2,
           seats = $3,
           ac_type = $4,
           price_per_km = $5,
           availability = $6
       WHERE id = $7
       RETURNING *`,
      [cab_name, category, seats, ac_type, price_per_km, availability, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Cab not found",
      });
    }

    res.json({
      success: true,
      message: "Cab updated successfully",
      cab: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete cab
const deleteCab = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM cabs WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Cab not found",
      });
    }

    res.json({
      success: true,
      message: "Cab deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addCab,
  getCabs,
  updateCab,
  deleteCab,
};