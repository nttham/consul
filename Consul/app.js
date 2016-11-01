/**
 * Created by neethu on 30/10/16.
 */
var express = require('express');
var app = express();
var consul = require("./consulManagment.js");
var port = process.env.VCAP_APP_PORT || 3000;
//started a server which is listening on port

console.log(process.env);
var consulManager = new consul();
consulManager.registerService(["test","testconsul"]);
consulManager.listService();
consulManager.deRegisterService();
consulManager.listService();

app.listen(port);
console.log('Consul Server is listening on port ' + port);

