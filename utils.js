/*
    - Utils for main.js
*/

const path = require('path');
const fs = require('fs');
const os = require('os');
const chalk = require('chalk');
const disk = require('diskusage');
const { execSync } = require('child_process');

const host = chalk.blue(`${os.userInfo([]).username}` + chalk.white('@') + `${os.hostname()}`);

function getOSName(platform, release) {
    switch (platform) {
        case 'win32':
            let vers = release.split('.');
            switch (vers[0]) {
                case '10':
                    switch (vers[2]) {
                        case '22621':
                        case '22631':
                        case '26100':
                            return 'Windows 11';
                        case '18363':
                        case '18362':
                        case '17763':
                        case '17134':
                        case '16299':
                        case '15063':
                        case '14393':
                            return 'Windows 10';
                    }
                    break;
            }
            break;
        case 'darwin':
            return 'MacOS';
            break;
        case 'linux':
            break;
    }
}

function getHr(host) {
    let hr = '+';
    for (let i = 0; i < host.length/2; i++) {
        hr += '=';
    }
    hr += '+';
    return hr;
}

function getOSLogo(os) {
    let p;
    let str;
    try {
        p = path.join(__dirname, 'logos', `${os}.lg`);
        str = fs.readFileSync(p, {encoding: 'utf-8'})
        return "\u001b[" + str + "\u001b[0m";
    } catch (error) {
        return error;
    }
}

function getRAM() {
    let usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();
    let  mem = ((usedMemory/totalMemory) * 100).toFixed(2);
    return mem;
}

function getRAMBar(barLength) {
    const usedMemory = os.totalmem() - os.freemem(), totalMemory = os.totalmem();
    const mem = ((usedMemory/totalMemory) * 100).toFixed(2);
    let usedMemBar = '/'.repeat(Math.floor(mem/barLength));
    let totalMemBar = '/'.repeat(10 - Math.floor(mem/barLength));
    return chalk.red(usedMemBar) + chalk.green(totalMemBar);
}

function getDiscSpaceBar() {
    const { available, total } = disk.checkSync('C:');
    const used = total - available;
    let usedBar = '/'.repeat(Math.floor((used / total) * 10));
    let availableBar = '/'.repeat(10 - usedBar.length);
    return chalk.red(usedBar) + chalk.green(availableBar);
}

function getTerminalInfo() {
    if (process.env.TERM_PROGRAM != undefined) {
        return `${process.env.TERM_PROGRAM}`;
    } else if (process.env.WT_SESSION) {
        return "Windows Terminal";
    } else if (process.env.TERM) {
        return `Unix-based terminal: ${process.env.TERM}`;
    } else {
        return "Unknown terminal";
    }    
}

function getGPU(os, callback) {
    let gpuInfo = '';

    switch (os) {
        case 'win32':
            gpuInfo = execSync('wmic path win32_VideoController get name').toString().split('\n')[1].trim();
            break;

        case 'darwin':
            gpuInfo = execSync('system_profiler SPDisplaysDataType | grep Chipset').toString().trim();
            break;

        case 'linux':
            gpuInfo = execSync('lspci | grep VGA').toString().trim();
            break;

        default:
            gpuInfo = chalk.red('Unknown OS! You can add support of your OS on GitHub.');
            break;
    }

    return gpuInfo;
}

function getUptime() {
    return `${Math.floor(os.uptime() / 60 / 60)}:${Math.floor((os.uptime() / 60) % 60)}:${Math.floor(os.uptime() % 60)}`;
}

module.exports = { getGPU, getHr, getOSLogo, getRAM, getRAMBar, getTerminalInfo, getUptime, getDiscSpaceBar, getOSName, host };