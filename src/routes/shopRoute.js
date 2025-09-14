const router = require('express').Router()
const {createShop,getShop,getShops,updateShop,deleteShop} = require('../controllers/shopController')

router.post('/',createShop)
router.get('/:id',getShop)
router.get('/',getShops)
router.put('/:id',updateShop)
router.delete('/:id',deleteShop)



module.exports = router