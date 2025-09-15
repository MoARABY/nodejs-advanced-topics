const cron = require('node-cron')




const task = ()=>{
    console.log("Task is running",new Date());
}

cron.schedule('* */1 * * * *', task) // every one minute