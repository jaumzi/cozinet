const execSync = require('child_process').execSync;

execSync('npx sequelize-cli db:seed:all --debug', {stdio:[0, 1, 2]});