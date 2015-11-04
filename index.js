'use strict';
var got   = require('got');
var chalk = require('chalk');

module.exports = function( endpoint, opts ) {
    // Set the base url
    var base_url = 'https://api.producthunt.com/v1/';
    var url = base_url + endpoint;

    // Set up our options
    var options = {
        json: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + opts.token,
            'Host': 'api.producthunt.com'
        }
    };

    // TODO
    // Handle the opts here and add needed query vars to the url
    // options.query = {
    //     'day': '2015-11-02'
    // };

    // Send the request to Product Hunt and return the data and endpoint
    return got( url, options ).then( function( res ) {
        return {
            data: res.body,
            endpoint: endpoint
        };
    });
};
