import { xliffTags, updateTags, Tag } from './tags';
import { unitMarkup, Item } from './items';
import xmlFormat from 'xml-formatter';
import fs from 'fs';

const addTags = (tags: Tag[], content: string) => {
  const tag = tags[tags.length - 1];
  const value = `${tag.start}${content}${tag.end}`;
  tags.pop();
  return tags.length === 0 ? value : addTags(tags, value);
};

const convertToXliff = (input: string) => {
  const data = fs.readFileSync(input, 'utf8');
  const parsed = JSON.parse(data);

  const items =
    'items' in parsed
      ? parsed.items.map((item: Item) => unitMarkup(item)).join('')
      : '';

  const fields =
    'fields' in parsed
      ? Object.entries(parsed.fields)
          .map(([key, value]) => `<note>${key}****${value}</note>`)
          .join('')
      : '';

  updateTags(parsed);

  return xmlFormat(addTags(xliffTags, items.concat(fields)));
};

export default convertToXliff;