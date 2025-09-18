# Redis Cache Middleware 📝

This part integrates **Redis** as a caching layer for API responses in a Node.js / Express application.  
The goal is to reduce database load and improve performance by serving cached data when available.  

## 🚀 Features
- Caches API responses using **Redis**.  
- Reuses cached data if available instead of hitting the database.  
- Supports **dynamic keys** based on request params.  
- Easy to plug into any Express route.  

## 📦 Redis Installation
- redis not available for direct installation on windows so we should use **Docker**
- docker pull redis -or-
- docker run -d --name redis -p 6379:6379 redis:latest
- docker exec -it my-redis redis-cli (run redis cli)

### inside project file
- npm install redis
- then start coding which mentioned in the "cache" branch



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


# LLM integration




