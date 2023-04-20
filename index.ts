#!/usr/bin/env node
import { checkFileExists, saveAsFile } from './helpers';
import { convertToJson, convertToXliff } from './lib';
import colors from 'colors';
import path from 'path';

require('yargs')
  .command({
    command: 'convert',
    describe: 'Takes a .json file and converts it to .xlf',
    builder: {
      file: {
        describe: 'input',
        demandOption: true,
        type: 'string',
      },
    },
    handler({ file }: { file: string }) {
      checkFileExists(file);
      const ext = path.extname(file);
      const data = ext === '.json' ? convertToXliff(file) : convertToJson(file);
      const newExt = ext === '.json' ? '.xlf' : '.json';
      const save = saveAsFile(file.replace(ext, newExt), data);
      if (save) console.log(colors.magenta('File saved successfully'));
    },
  })
  .help().argv;
