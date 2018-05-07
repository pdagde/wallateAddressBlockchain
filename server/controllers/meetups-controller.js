/**
 * Created by pravin on 5/4/17.
 */

var Meetup = require('../models/meetup');
var cached = require('../models/backup');

module.exports.create = function (req, res) {
    var meetup = new Meetup(req.body);
    meetup.save(function (err, result) {
        res.json(result);
    });
};

module.exports.storeData = function (req, res) {
    var array = req.body;
    cached
        .create(array, function (err, result) {
            if (err) {
                console.log('Error---', err);
            }
        });
    res.json('success');
};
module.exports.list = function (req, res) {
    Meetup
        .find({})
        .limit(7)
        .exec(function (err, results) {
            res.json(results);
        });
};

module.exports.search = function (req, res) {
    var query = {};
    if (req.body.name != '') {
        query.name = req.body.name;
    }
    var order_limit = req.body.pageSize;
    var order_skip = (req.body.page) * order_limit;
    Meetup
        .find(query)
        .skip(order_skip)
        .limit(order_limit)
        .exec(function (err, results) {
            if (results.length == 0) {
                var meetup = new Meetup(req.body);
                meetup.save(function (err, result) {
                });
                cached
                    .create(req.body, function (err, result) {
                        if (err) {
                            console.log('Error---', err);
                        }
                    });
            }
            else {

                cached
                    .create(req.body, function (err, result) {
                        if (err) {
                            console.log('Error---', err);
                        }
                    });

                Meetup
                    .find(query)
                    .count()
                    .exec(function (err, count) {
                        var data = {
                            result: results,
                            count: count
                        };
                        res.json(data);
                    });
            }

        });
};
module.exports.searchRegExp = function (req, res) {

      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXX",JSON.stringify(req.body));
    var query = {
        'name': new RegExp(req.body.name, 'i'),
    };
    var order_limit = req.body.pageSize;
    var order_skip = (req.body.page) * order_limit;
    cached
        .find(query)
        .skip(order_skip)
        .limit(order_limit)
        .exec(function (err, data) {
            cached
                .find(query)
                .count()
                .exec(function (err, count) {
                    var responce = {};
                    responce.result = data;
                    responce.count = count;
                    res.json(responce);
                });
        });

};
