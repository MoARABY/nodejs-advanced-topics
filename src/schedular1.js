const cron = require('node-cron')




const task = ()=>{
    console.log("Task is running");
}

cron.schedule('* */1 * * * *', task) // every one minute