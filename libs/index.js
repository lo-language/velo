/**
 * Created by spurcell on 1/2/16.
 */

const Task = require('../runtime/Task');
const http = require('http');

module.exports = {

    'net:http:client': function (task) {

        task.respond("reply", {

            get: function (task) {

                http.get(task.args[0], function (res) {

                    var body = '';

                    res.setEncoding('utf8');

                    res.on('data', function (chunk) {
                        body += chunk;
                    });

                    res.on('end', function () {
                        task.respond("reply", [res, body]);
                    });
                });
            }
        });
    },

    'net:http:server': function (task) {

        var server = new http.Server();
        var service = task.args[1];

        server.on('request', function (req, res) {

            //console.log('JS REQ', req.url);
            //res.end("hi there", 'utf-8');

            var reqTask = new Task('HTTP_REQUEST', service, [req]);

            reqTask.on("reply", function (body) {
                res.end(body);
            });

            reqTask.on("fail", function (message) {
                res.statusCode = 500;
                res.end(message, 'utf-8');
            });

            service(reqTask);
        });

        server.listen(task.args[0], function () {

            task.respond("reply", server);
        });
    }
};