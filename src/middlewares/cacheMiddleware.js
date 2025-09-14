const {client} = require('../../DB/redisConfig');
const asyncHandler = require('express-async-handler');




const cacheMiddleware = (keyItem,keyId)=>{
    return asyncHandler(async (req, res, next) => {
        try {
            let key = keyItem;
            if (keyId) {
                key = `${keyItem}:${req.params[keyId]}`;
            }
            const cacheItem = await client.get(key)
            if (cacheItem) {
                console.log('Serving from cache');
                return res.status(200).json(JSON.parse(cacheItem));
            }
            res.locals.cacheKey = key;
            next();
        } catch (error) {
            console.error('Cache middleware error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    })
};


module.exports = cacheMiddleware