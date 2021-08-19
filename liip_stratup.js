/* eslint-disable no-console */

const handlebarsHelpersUtils = require('./core/ellexx/HandlebarsHelpersUtils');

console.log('\x1b[32m');
console.log('####################################################');
console.log('#                                                  #');
console.log('#        RUNNING GHOST INSTANCE BY LIIP            #');
console.log('#                                                  #');
console.log('####################################################');
console.log('');
console.log('Environment Variables :');
console.log();
console.log(`\tNODE_ENV :             ${process.env.NODE_ENV}`);
console.log(`\tGHOST_CLI_VERSION :    ${process.env.GHOST_CLI_VERSION}`);
console.log(`\tGHOST_INSTALL :        ${process.env.GHOST_INSTALL}`);
console.log(`\tGHOST_CONTENT :        ${process.env.GHOST_CONTENT}`);
console.log(`\tGHOST_VERSION :        ${process.env.GHOST_VERSION}`);
console.log();
console.log('Other Variables :');
console.log(`\tDocker Build Number :  ${require('./package').docker.build}`);
console.log(`\tSystem time :          ${new Date()}`);
console.log('\x1b[0m');

handlebarsHelpersUtils.addCustomHelpersToGscanKnownHelpers();
