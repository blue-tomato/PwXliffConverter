import convertToXliff from './Xliff';
import convertToJson from './Json';
import path from 'path';

const convert = (file: string) => {
  const ext = path.extname(file);
  const newExt = ext === '.json' ? '.xlf' : '.json';
  const data = ext === '.json' ? convertToXliff(file) : convertToJson(file);
  return { path: file.replace(ext, newExt), data };
};

export default convert;
