#!/usr/bin/env node
'use strict';

var meow   = require('meow');
var chalk  = require('chalk');
var _      = require('lodash');
var fs     = require('fs');
var prompt = require('prompt');
var ph     = require('./');

// Setup colors
var success = chalk.green;
var warn    = chalk.yellow;
var error   = chalk.red;

// Handle the arguments
var cli = meow({
    help: [
        'Usage:',
        '    ph <endpoint> <options>',
        '',
        'Endpoints:',
        '    me',
        '        Display personal information about the user',
        '    posts',
        '        --day="2015-10-26"    Get posts from a specific day',
        '        --days_ago="2"        Get posts from 2 days ago',
        '    search',
        '        category="games"      Get posts from a specific category',
        'Options:',
        '    --token',
        '        The users developer token for authentication'
    ]
});

// Check if an endpoint is supplied
if( ! cli.input[0] ) {
    console.log( cli.help );
    process.exit( 1 );
}

// Call the ph module
ph( cli.input[0], cli.flags ).then( function( res ) {

    switch( res.endpoint ) {
        case 'me':
            console.log( success( '==> Me' ) );
            break;
        case 'posts':
            console.log( success( '==> Posts' ) );

            _.forIn( res.data.posts, function( val, key ) {
                var post = {
                    name: chalk.yellow.bold( val.name ),
                    tagline: chalk.white( val.tagline ),
                    votes: chalk.blue( '(' + val.votes_count + ')' ),
                    url: chalk.white( val.discussion_url )
                };

                console.log( post.name + ' ' + post.votes );
                console.log( chalk.magenta( '    ==> ' ) + post.tagline );
                console.log( chalk.magenta( '    ==> ' ) + post.url );
                // console.log( '' );
            });
            break;
        case 'users':
            console.log( success( '==> Users' ) );
            break;
        default:
            console.error( error( 'Error: ' ) + '"' + res.endpoint + '" is not a valid endpoint...' );
            process.exit( 1 );
    }

    process.exit( 0 );
});
