const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const shopModel = require('../../DB/models/shopModel')



const createShop = asyncHandler(async(req,res)=>{
    const {name,location,phone} = req.body
    if(!name || !location || !phone){
        return res.status(400).json({message:'all fields are required'})
    }
    req.body.slug = slugify(name)

    const shop = await shopModel.create({name,location,phone,slug:req.body.slug})
    shop ? res.status(201).json({message:'Shop created successfully',shop}) : res.status(500).json({message:'Failed to create shop'})
})

const getShop = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const shop = await shopModel.findById(id)
    shop ? res.status(200).json({shop}) : res.status(404).json({message:'Shop not found'})
})

const getShops = asyncHandler(async(req,res)=>{
    const shops = await shopModel.find()
    shops ? res.status(200).json({shops}) : res.status(404).json({message:'No shops found'})
})

const updateShop = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    if(name){
        req.body.slug = slugify(name)
    }

    const shop = await shopModel.findByIdAndUpdate(id,req.body,{new:true})
    shop ? res.status(200).json({message:'Shop updated successfully',shop}) : res.status(404).json({message:'Shop not found'})
})

const deleteShop = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const shop = await shopModel.findByIdAndDelete(id)
    shop ? res.status(200).json({message:'Shop deleted successfully'}) : res.status(404).json({message:'Shop not found'})
})


module.exports = {
    createShop,
    getShop,
    getShops,
    updateShop,
    deleteShop
}
