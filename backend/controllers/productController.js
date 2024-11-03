const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const APIFeatures = require("../utils/apiFeatures.js");

// Create Product - Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product
    });
});

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

    const resultPerPage=5;
    const productCount=await Product.countDocuments();



    const apiFeature=new APIFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    // means URL me ek query hoga like keyword='laptop'
    // const products = await Product.find();
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products
    });
});

// Update Product - Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not Found", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    });
});

// Delete Product - Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not Found", 404));
    }
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
        success: true,
        message: "Product deleted Successfully"
    });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not Found", 404));
    }

    res.status(200).json({
        success: true,
        product,
        productCount
    });
});
