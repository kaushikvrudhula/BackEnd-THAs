const express = require("express");
// const products = require("../models/product");
const router = express.Router();
const { Op } = require("sequelize");
const product = require("../models/product");

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    const count = parseInt(req.query.count) || 10;
    const page = parseInt(query.page) || 1;
    const after = parseInt(query.after);
    let sql = {};
    if (after) {
      sql = {
        where: {
          id: {
            [Op.get]: after,
          },
        },
      };
    } else {
      sql = {
        offset: count * (page - 1),
      };
    }
    const products = await product.findAll({
      ...sql,
      attributes: ["id", "title", "price", "description", "image"],
      limit: count,
    });
    res.status(200).send({
      count: products.length,
      items: products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err,
      message: "can not process your request",
    });
  }
});

console.log(module.exports);
module.exports = productsRouter = router;
