const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const productModel = require('../../DB/models/productModel')
const shopModel = require('../../DB/models/shopModel')
const {client} = require('../../DB/redisConfig')






const createProduct = asyncHandler(async(req,res)=>{
    const {name,description,price,shopId,quantity} = req.body
    if(!name || !description || !price || !shopId || !quantity){
        return res.status(400).json({message:'all fields are required'})
    }
    if(typeof price !== 'number' && price <= 0){
        return res.status(400).json({message:'price must be a positive number'})
    }
    if(typeof quantity !== 'number' && quantity < 0){
        return res.status(400).json({message:'quantity must be a positive number'})
    }
    const shop = await shopModel.findById(shopId)
    if(!shop){
        return res.status(404).json({message:'Shop not found'})
    }
    const existProduct = await productModel.findOne({name})
    if(existProduct){
        return res.status(400).json({message:'Product name already exists'})
    }

    req.body.slug = slugify(name)

    const product = await productModel.create({name,description,price,slug:req.body.slug,shopId,quantity})
    client.del('products')
    product ? res.status(201).json({message:'Product created successfully',product}) : res.status(500).json({message:'Failed to create product'})
})

const getProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const product = await productModel.findById(id).populate({path:'shopId', select:'name'})
    product ? res.status(200).json({product}) : res.status(404).json({message:'Product not found'})
})

const getProducts = asyncHandler(async(req,res)=>{
    return await productModel.find().populate({path:'shopId', select:'name'})
})

const updateProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const {name,price} = req.body
    if(name){
        req.body.slug = slugify(name)
    }
    if(price && (typeof price !== 'number' || price <= 0)){
        return res.status(400).json({message:'price must be a positive number'})
    }

    const product = await productModel.findByIdAndUpdate(id,req.body,{new:true})
    await client.del('products');
    product ? res.status(200).json({message:'Product updated successfully',product}) : res.status(404).json({message:'Product not found'})
})

const deleteProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const product = await productModel.findByIdAndDelete(id)
    await client.del('products');
    product ? res.status(200).json({message:'Product deleted successfully'}) : res.status(404).json({message:'Product not found'})
})


module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}
