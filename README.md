# Scheduler with node-cron ⏰

This part integrates **node-cron** into the project to handle scheduled background tasks

## 🚀 Features
- Task scheduling using **node-cron**.
- Runs scheduled jobs inside your Node.js/Express app.
- Uses standard cron expressions.  
- Easy to plug into any Express route.  

## 📦 node-cron Installation
- npm install node-cron

*    *    *    *    *

│    │    │    │    │

│    │    │    │    └─── Day of the week (0 - 7) (Sunday = 0 or 7)

│    │    │    └──────── Month (1 - 12)

│    │    └───────────── Day of the month (1 - 31)

│    └────────────────── Hour (0 - 23)

└─────────────────────── Minute (0 - 59)

## project usage
- we use cron job to work every 1 hour on products docs see if any product has quantity less than 5 
- write product data inside 'lastQProducts' file
