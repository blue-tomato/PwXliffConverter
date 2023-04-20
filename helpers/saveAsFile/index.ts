import colors from 'colors';
import fs from 'fs';

const saveAsFile = (path: string, data: string | NodeJS.ArrayBufferView) => {
  try {
    fs.writeFileSync(path, data);
  } catch (err) {
    throw new Error(colors.red(`Document could not be saved: ${err}`));
  }
  return true;
};

export default saveAsFile;
