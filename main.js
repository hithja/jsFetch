const os = require('os');
const chalk = require('chalk');
const utils = require('./utils.js');

console.log(utils.getOSLogo(utils.getOSName(os.platform(), os.release())));
console.log(utils.host);
console.log(utils.getHr(utils.host));

console.log(chalk.green('OS: ') + utils.getOSName(os.platform(), os.release())); // OS Info
console.log(chalk.green('Terminal: ') + utils.getTerminalInfo()); // Terminal Info
console.log(chalk.green('Uptime: ') + `${utils.getUptime()}`); // Uptime
console.log(chalk.green('CPU: ') + os.cpus()[0].model);
console.log(chalk.green('GPU: ') + `${utils.getGPU(os.platform())}`)
console.log(chalk.green('RAM: ') + `-={${utils.getRAMBar(10)}}=- (${Math.floor(utils.getRAM())}% in use)`); //RAM in use (bar and %)
console.log(chalk.green('Disc: ') + `-={${utils.getDiscSpaceBar()}}=-`); // Disc