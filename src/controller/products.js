const productModel = require("../model/products");
const createError = require("http-errors");
const errorServ = new createError.InternalServerError();
const { response } = require("../helper/response");
const cloudinary = require("../helper/cloudinary");
// const client = require('../config/redis')

const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await productModel.getProductById(id);
    response(res, result.rows[0], 200, "get data success");
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortdata = req.query.sort || "id";
    const typeSort = req.query.typesort || "ASC";
    const search = req.query.search || "";
    const offset = (page - 1) * limit;
    const result = await productModel.getAllProduct({
      offset,
      limit,
      sortdata,
      typeSort,
      search,
    });

    // pagination
    const {
      rows: [count],
    } = await productModel.countProduct();
    const totalData = parseInt(count.total);
    const totalPage = Math.ceil(totalData / limit);
    const pagination = {
      currentPage: page,
      limit,
      totalData,
      totalPage,
    };
    response(res, result, 200, "get data success", pagination);
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

const insertProduct = async (req, res, next) => {
  const { name, description, price, stock, idCategory } = req.body;
  let img;

  if (req.file) {
    img = await cloudinary.uploader.upload(req.file.path);
  }
  try {
    const data = {
      name,
      description,
      stock,
      price,
      idCategory,
      photo: img.secure_url,
      updateAt: new Date(),
    };
    productModel
      .insertProduct(data)
      .then(() => {
        res.status(201).json({
          data,
        });
      })
      .catch((error) => {
        console.log(error);
        next(errorServ);
      });
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const { name, description, price, stock, idCategory } = req.body;
  let img;
  if (req.file) {
    img = await cloudinary.uploader.upload(req.file.path);
  }
  try {
    const data = {
      name,
      description,
      stock,
      price,
      photo: img.secure_url,
      idCategory,
      createdAt: new Date(),
    };
    console.log("update product =>",data);
    productModel
      .updateProduct(data, id)
      .then(() => {
        res.status(201).json({
          data,
        });
      })
      .catch((error) => {
        console.log(error);
        next(new createError.InternalServerError());
      });
  } catch (error) {
    console.log(error);
    next(errorServ);
  }

};

const deleteProduct = (req, res, next) => {
  const id = req.params.id;
  productModel
    .deleteProduct(id)
    .then(() => {
      res.json({
        message: "data berhasil di hapus",
      });
    })
    .catch((error) => {
      console.log(error);
      next(new createError.InternalServerError());
    });
};

module.exports = {
  getProductById,
  getAllProduct,
  insertProduct,
  deleteProduct,
  updateProduct,
};
