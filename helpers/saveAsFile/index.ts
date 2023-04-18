import fs from 'fs';

const saveAsFile = (
  path: string,
  data: string | NodeJS.ArrayBufferView
) => {
  try {
    fs.writeFileSync(path, data);
  } catch (err) {
    throw new Error('File could not been saved');
  }
  return true;
};

export default saveAsFile;
