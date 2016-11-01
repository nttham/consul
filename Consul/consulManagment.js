/**
 * Created by neethu on 30/10/16.
 */
var uuid = require('uuid');
var request = require('request');
var Consul  = function () {

};
var node =  "75990270-9e6b-11e6-b869-6393b8dc0e33";
var consulInfo = JSON.parse(process.env.VCAP_SERVICES);
//sample object for registering Consul
//var regObj = {
//    "Datacenter": "dc1",
//    "Node": "foobar",
//    "Address": "192.168.10.10",
//    "TaggedAddresses": {
//        "lan": "192.168.10.10",
//        "wan": "10.0.10.10"
//    },
//    "Service": {
//        "ID": "redis1",
//        "Service": "redis",
//        "Tags": [
//            "master",
//            "v1"
//        ],
//        "Address": "127.0.0.1",
//        "Port": 8000
//    },
//    "Check": {
//        "Node": "foobar",
//        "CheckID": "service:redis1",
//        "Name": "Redis health check",
//        "Notes": "Script based health check",
//        "Status": "passing",
//        "ServiceID": "redis1"
//    }
//};
var serviceInfo = JSON.parse(process.env.VCAP_APPLICATION);
    Consul.prototype.registerService = function(Tags){

    var registerObj = {};
     registerObj.Datacenter = 'dc1';
//     registerObj.Node = serviceInfo.application_name + serviceInfo.application_id;
     registerObj.Node = node;
     registerObj.Address = serviceInfo.application_uris[0] ;
     registerObj.Service = {};
     registerObj.Service.ID = serviceInfo.application_id;
     registerObj.Service.Service = serviceInfo.application_name + serviceInfo.application_id;
     registerObj.Service.Tags = Tags;
     registerObj.Service.Address = serviceInfo.application_uris[0] ;
     registerObj.Service.Port = serviceInfo.port;
     registerObj.Check =     {};
     registerObj.Check.Node = node;
     registerObj.Check.CheckID = "service:"+ serviceInfo.application_id;
     registerObj.Check.Name = serviceInfo.application_name + ' health check';
     registerObj.Check.Notes = "Script based health check";
     registerObj.Check.Status = "passing";
     registerObj.Check.ServiceID = serviceInfo.application_id;

    console.log(registerObj);
        var consulInfo = JSON.parse(process.env.VCAP_SERVICES);

        var options = {};
        options.uri = consulInfo["Consul-Service"][0]["credentials"]["uri"]+"/v1/catalog/register";
        options.method = "PUT";
        options.json = registerObj;

        request(options, function (err, response,body) {
            if (err) {
               console.log("error")
            }
            else {

                console.log("********************************")

            }
        });




    };
Consul.prototype.deRegisterService = function(){
    var regObj = {
        "Datacenter": "dc1",
        "Node": node,
        "ServiceID": "1a528ce2-e502-4811-a51b-76df1c4efbbe"
    }
    var options = {};
    options.uri = consulInfo["Consul-Service"][0]["credentials"]["uri"]+"/v1/catalog/deregister";
    options.method = "PUT";
    options.json = regObj;

    request(options, function (err, response,body) {
        if (err) {
            console.log("error")
        }
        else {

            console.log("********************************")
            console.log(body)

        }
    });

};

Consul.prototype.listService = function(){

    var options = {};
    options.uri = consulInfo["Consul-Service"][0]["credentials"]["uri"]+"/v1/catalog/services";
    options.method = "GET";

    request(options, function (err, response,body) {
        if (err) {
            console.log("error")
        }
        else {

            console.log("********************************")
            console.log(body)

        }
    });
};

module.exports = Consul;