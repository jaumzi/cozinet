const execSync = require('child_process').execSync;

execSync('npx sequelize db:migrate', {stdio:[0, 1, 2]});