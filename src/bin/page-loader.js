#!/usr/bin/env node
import program from 'commander';
import chalk from 'chalk'
import pageLoader from '../index';
import pjson from '../../package.json';

program
  .version(pjson.version)
  .description(pjson.description)
  .arguments('<url>')
  .option('-o, --output [path_to_save]', 'Path to save files')
  .action((url) => {
    pageLoader(url, program.output)
      .then((savedFile) => {
        console.log(`\nPage was downloaded as ${chalk.green(savedFile)}\n`);
      });
  })
  .parse(process.argv);

if (!program.args.length) program.help();
