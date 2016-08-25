'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
    DOMAIN: 'http://localhost:9000',
    SESSION_SECRET: "medsmind-secret",

    FACEBOOK_ID: 'app-id',
    FACEBOOK_SECRET: 'secret',

    TWITTER_ID: 'app-id',
    TWITTER_SECRET: 'secret',

    GOOGLE_ID: '619369132177-naovs16pij0lirklvbc06gi8fbgeb4lu.apps.googleusercontent.com',
    GOOGLE_SECRET: 'DaYOKza68Rl52i20YEAflLqr',

    // Control debug level for modules using visionmedia/debug
    DEBUG: ''
};
