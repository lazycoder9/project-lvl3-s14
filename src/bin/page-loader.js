#!/usr/bin/env node
import program from 'commander';
import pageLoader from '../index';
import pjson from '../../package.json';

program
  .version(pjson.version)
  .description(pjson.description)
  .arguments('<url>')
  .option('-o, --output [path_to_save]', 'Path to save files')
  .action((url) => {
    pageLoader(url, program.output)
      .then((res) => {
        console.log(res);
      });
  })
  .parse(process.argv);

if (!program.args.length) program.help();
