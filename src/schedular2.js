const cron = require('node-cron')
const fs = require('fs');
const path = require('path');
const productModel = require('../DB/models/productModel')


const task = async()=>{
    try {
        console.log("Schedular 2 is running",new Date());
        const products = await productModel.find({quantity:{$lte: 5}});
        const items = products.map(item=>({
            id: item._id,
            name: item.name,
            quantity: item.quantity
        }));
        fs.writeFileSync(path.join(__dirname, '../lastQProducts.json'), JSON.stringify(items),'utf-8');
        console.log("File written successfully");
    } catch (err) {
        console.error("Cron job error:", err.message);
    }
}



// cron.schedule(' * */1 * * *', task)
cron.schedule('* * * * *',task)
