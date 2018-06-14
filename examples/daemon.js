"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
var daemon = new lib_1.Daemon({
    user: 'user',
    password: 'password',
    port: 9912,
    host: 'localhost',
    name: 'XPM'
});
daemon.call('getinfo').then(function (mininginfo) {
    console.log(mininginfo);
});
