const db = require("../models/index");
const bookModel = db.book;

exports.create = async (req, res) => {
  try {
    const { name, auther, img_cover, price, discount } = req.body;

    const note = await bookModel.create({
      name,
      auther,
      img_cover,
      price,
      discount,
    });

    res.status(201).json({
      status: "success",
      data: {
        note,
      },
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        status: "failed",
        message: "Note with that title already exists",
      });
    }
  }
};

exports.update = async (req, res) => {
  try {
    console.log(req.query);
    const result = await bookModel.update(
      { ...req.body, updatedAt: Date.now() },
      {
        where: {
          id: req.query.bood_id,
        },
      }
    );

    if (result[0] === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Note with that ID not found",
      });
    }

    const note = await bookModel.findByPk(req.query.bood_id);

    res.status(200).json({
      status: "success",
      data: {
        note,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const notes = await bookModel.findAll({ limit, offset: skip });

    res.status(200).json({
      status: "success",
      results: notes.length,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
