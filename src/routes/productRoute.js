const router = require('express').Router()
const {createProduct,getProduct,getProducts,updateProduct,deleteProduct} = require('../controllers/productController')
// const {client} = require('../../DB/redisConfig')
const cacheMiddleware = require('../middlewares/cacheMiddleware')

router.post('/',createProduct)
router.get('/:id',cacheMiddleware('product',getProduct,'id'))
router.get('/',cacheMiddleware('products',getProducts))
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)



module.exports = router