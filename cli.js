#!/usr/bin/env node
'use strict';

// Get the modules
var meow   = require('meow');
var chalk  = require('chalk');
var _      = require('lodash');
var fs     = require('fs');
var prompt = require('prompt');
var ph     = require('./');

// Setup variables
var success = chalk.green;
var warn    = chalk.yellow;
var error   = chalk.red;
var configFile = home_dir() + '/.ph-cli';
var devToken;

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

// Setup prompt
prompt.colors = false;
prompt.message = "";
prompt.delimiter = "";
prompt.override = cli.flags;

// Check if the user has ran the setup
check_setup();

function handle_arguments() {
    // Check if an endpoint is supplied
    if( ! cli.input[0] ) {
        console.log( cli.help );
        process.exit( 1 );
    }

    // Check if we are good to get the info
    if( cli.input[0] !== 'setup' ) {
        // Call the ph module
        ph( cli.input[0], cli.flags, devToken ).then( function( res ) {
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
                    });
                    break;
                case 'users':
                    console.log( success( '==> Users' ) );
                    break;
                default:
                    console.log( error( 'Error: "' + res.endpoint + '" is not a valid endpoint...' ) );
                    process.exit( 1 );
            }

            process.exit( 0 );
        });
    }
}

// Check if the user has ran the setup
function check_setup() {
    // Check if we need to run the setup
    if( cli.input[0] == 'setup' ) {
        setup();
    } else {
        // Check if the config file exists
        fs.stat( configFile, function( err, stats ) {
            if( stats ) {
                var config = fs.readFileSync( configFile );
                try {
                    var configObj = JSON.parse( config );
                    devToken = configObj.token;
                } catch( err ) {
                    console.log( error( 'Error: ' + err ) );
                    process.exit( 1 );
                }
            } else {
                console.log( warn( 'Type `ph setup` to get started...') );
                process.exit( 1 );
            }

            handle_arguments();
        });
    }
}

// Set all the things up
function setup() {
    // Display some helper text
    console.log( warn( 'Visit https://www.producthunt.com/v1/oauth/applications if you need a developer token...' ) );

    // Prompt the user to input their developer token
    prompt.start();
    var properties = {
        properties: {
            token: {
                description: 'Enter your developer token:'.magenta
            }
        }
    };
    prompt.get( properties, function( err, result ) {
        if( err ) {
            console.log( error( 'Error: ' + err ) );
            process.exit( 1 );
        }

        // TODO
        // Save the token input to a config file
        console.log();
        if( result.token ) {
            var data = JSON.stringify({
                token: result.token
            });

            fs.writeFile( configFile, data, function( err ) {
                if( err ) {
                    console.log( error( 'Error: ' + err.message ) );
                    process.exit( 1 );
                }

                console.log( success( 'Product Hunt CLI is set up!') );
                console.log( warn( 'Type `ph --help` if you need help getting started.') );
                process.exit( 0 );
            });
        } else {
            console.log( error( 'Error: You didn\'t supply a developer token...' ) );
        }
    });
}

function home_dir() {
    return process.env.HOME || process.env.USERPROFILE;
}
