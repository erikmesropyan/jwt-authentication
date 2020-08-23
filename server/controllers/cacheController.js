const { promisify } = require('util');
const redis = require('redis');

const client = redis.createClient();
const hGetAsync = promisify(client.hgetall).bind(client);

client.on('connect', function() {
  console.log('You are now connected to Redis Client');
});

exports.addCurrentUser = currentUser => {
  client.hmset(
    currentUser._id.toString(),
    JSON.parse(JSON.stringify(currentUser))
  );
};

exports.getCurrentUser = currentUserId => {
  return hGetAsync(currentUserId);
};
