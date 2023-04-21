import colors from 'colors';
import fs from 'fs';

const checkFileExists = (path: string) => {
  try {
    fs.accessSync(path);
  } catch (err) {
    throw new Error(colors.red(`File does not exist: ${err}`));
  }
  return true;
};

export default checkFileExists;
