const execSync = require('child_process').execSync;

const arg = process.argv[2];

execSync('npx sequelize migration:create --name=' + arg, {stdio:[0, 1, 2]});