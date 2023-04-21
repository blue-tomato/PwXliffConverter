#!/usr/bin/env node
import { checkFileExists, saveAsFile } from './helpers';
import convert from './lib';
import colors from 'colors';

require('yargs')
  .command({
    command: 'convert',
    describe:
      'Converts a ProcessWire translation export .json to .xlf 1.2 and back',
    builder: {
      file: {
        describe: 'input',
        demandOption: true,
        type: 'string',
      },
    },
    handler({ file }: { file: string }) {
      checkFileExists(file);
      const { path, data } = convert(file);
      const save = saveAsFile(path, data);
      if (save) console.log(colors.magenta('File saved successfully'));
    },
  })
  .help().argv;
