#!/usr/bin/env node
import { checkFileExists, saveAsFile } from './helpers';
import convert from './lib/xliff';
import colors from 'colors';

require('yargs')
  .command({
    command: 'convert',
    describe: 'Takes a .json file and converts it to .xliff',
    builder: {
      file: {
        describe: 'input',
        demandOption: true,
        type: 'string',
      },
    },
    handler({ file }: { file: string }) {
      checkFileExists(file);
      const data = convert(file);
      const save = saveAsFile(file.replace('.json', '.xlf'), data);
      if (save) console.log(colors.magenta('File saved successfully'));
    },
  })
  .help().argv;
