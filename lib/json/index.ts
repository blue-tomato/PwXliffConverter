import { parseItems, Item } from './items';
import tags from './tags/tags.json';
import fs from 'fs';

type Output = {
  source_language: string;
  target_language: string;
  version: number;
  exported: string;
  items: Item[];
};

const stringify = (input: Output) => {
  return JSON.stringify(input, null, 2);
};

const convertToJSon = (input: fs.PathOrFileDescriptor) => {
  const data = fs.readFileSync(input, 'utf8');
  const items = parseItems(data);

  return stringify({
    source_language: tags.source_language,
    target_language: tags.target_language,
    version: tags.version,
    exported: tags.exported,
    items: items,
  });
};

export default convertToJSon;
