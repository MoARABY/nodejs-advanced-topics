const router = require('express').Router()
const {createProduct,getProduct,getProducts,updateProduct,deleteProduct} = require('../controllers/productController')
// const cacheMiddleware = require('../middlewares/cacheMiddleware')

router.post('/',createProduct)
router.get('/:id',getProduct)
// router.get('/:id',cacheMiddleware('product','id'),getProduct)
router.get('/',getProducts)
// router.get('/',cacheMiddleware('products'),getProducts)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)



module.exports = router