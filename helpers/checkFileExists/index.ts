import fs from 'fs';

const checkFileExists = (path: string) => {
  try {
    fs.accessSync(path, fs.constants.F_OK);
  } catch (err) {
    throw new Error('File does not exist');
  }
  return true;
};

export default checkFileExists;
