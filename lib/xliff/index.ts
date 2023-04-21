import { unitMarkup, unitText, Item } from './items';
import { xliffTags, Tag } from './tags';
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
      ? parsed.items
          .map((item: Item) =>
            item.type === 'markup' ? unitMarkup(item) : unitText(item)
          )
          .join('')
      : '';

  xliffTags[1].start = `<file  datatype="plaintext" source-language="${
    parsed.source_language ?? ''
  }" target-language="${parsed.target_language ?? ''}">`;

  return xmlFormat(addTags(xliffTags, items));
};

export default convertToXliff;
