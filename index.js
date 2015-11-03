'use strict';
var got   = require('got');
var chalk = require('chalk');

module.exports = function( endpoint, opts ) {
    if( typeof opts !== 'object' ) {
        cb = opts;
        opts = {};
    }

    // Set the base url
    var url = 'https://api.producthunt.com/v1/' + endpoint;

    // TODO
    // Handle the opts here and add needed query vars to the url

    // Send the request to Product Hunt and return the data and endpoint
    return got( url, {
        json: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + opts.token,
            'Host': 'api.producthunt.com'
        }
    }).then( function( res ) {
        return {
            data: res.body,
            endpoint: endpoint
        };
    });
};
