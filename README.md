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
