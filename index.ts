#!/usr/bin/env node
import { checkFileExists, saveAsFile } from './helpers';
import { convertToJson, convertToXliff } from './lib';
import colors from 'colors';
import path from 'path';

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
      const ext = path.extname(file);
      const newExt = ext === '.json' ? '.xlf' : '.json';
      const data = ext === '.json' ? convertToXliff(file) : convertToJson(file);
      const save = saveAsFile(file.replace(ext, newExt), data);

      if (save) console.log(colors.magenta('File saved successfully'));
    },
  })
  .help().argv;
