const Product = require("../models/Product");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const _ = require("lodash");

module.exports = {
  async GetAllProducts(req, res) {
    const products = await Product.find();
    res.status(200).json(products);
  },

  async DeleteProduct(req, res) {
    var id = req.params.id;
    Product.findByIdAndDelete(id)
      .exec()
      .then(doc => {
        if (!doc) {
          return res.status(404).json({ message: "error: link no longer exists" });
        }
        res.json({ message: "success: delete product" });
      }).catch(err => next(err))
  }
  ,
  async GetProductById(req, res) {
    var id = req.params.id;
    Product.findById(id).exec()
      .then(doc => {
        if (!doc) {
          return res.status(404).json({ message: "error: link no longer exists" });
        }
        res.json(doc);
      }).catch(err => next(err))
  }
  ,
  async UpdateProductById(req, res) {
    var id = req.params.id;
    var schema = req.body;
    Product.findByIdAndUpdate({ _id: id }, { schema })
      .exec()
      .then(doc => {
        if (!doc) {
          return res.status(404).json({ message: "error: link no longer exists" });
        }
        res.json(doc);
      }).catch(err => next(err))
  }
  ,

  async CreateProduct(req, res) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      description: Joi.string().min(10).required(),
      price: Joi.number().required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(500).json({ message: error.details });
    }
    try {
      const camelName = _.camelCase(value.name);
      const newProduct = new Product({
        ...value,
        code: removeAccents(camelName),
      });

      await newProduct.save();
      res.json({ message: "New product created", result: newProduct });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}