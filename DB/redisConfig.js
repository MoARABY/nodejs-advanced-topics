const { createClient } = require('redis');
const client = createClient(process.env.REDIS_PORT);

const redisConnection = async () => {
    const rConnection = await client.connect();
    if (rConnection) {
        console.log('Redis connected');
        const visits = await client.incr('visits');
        console.log(`Number of visits: ${visits}`);
    } else {
        console.log('Redis connection failed');
    }

}


module.exports = { redisConnection ,client}
