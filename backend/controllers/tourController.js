const pool = require("../config/db");

// Add tour package
const addTour = async (req, res) => {
  try {
    const {
      title,
      location,
      duration,
      price,
      description,
      image_url,
      availability,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO tour_packages
      (title, location, duration, price, description, image_url, availability)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [title, location, duration, price, description, image_url, availability]
    );

    res.status(201).json({
      success: true,
      message: "Tour package added successfully",
      tour: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all tour packages
const getTours = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tour_packages ORDER BY id DESC"
    );

    res.json({
      success: true,
      total: result.rows.length,
      tours: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single tour package
const getSingleTour = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM tour_packages WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    res.json({
      success: true,
      tour: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update tour package
const updateTour = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      location,
      duration,
      price,
      description,
      image_url,
      availability,
    } = req.body;

    const result = await pool.query(
      `UPDATE tour_packages
       SET title = $1,
           location = $2,
           duration = $3,
           price = $4,
           description = $5,
           image_url = $6,
           availability = $7
       WHERE id = $8
       RETURNING *`,
      [title, location, duration, price, description, image_url, availability, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    res.json({
      success: true,
      message: "Tour package updated successfully",
      tour: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete tour package
const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM tour_packages WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    res.json({
      success: true,
      message: "Tour package deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
};