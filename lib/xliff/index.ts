import { unitMarkup, unitText } from './items';
import xmlFormat from 'xml-formatter';
import tags from './tags/tags.json';
import type { Item } from './items';
import fs from 'fs';

type Tag = {
  tag: string;
  start: string;
  end: string;
};

const xliffTags = [
  {
    tag: 'xml',
    start: tags.xmlStart,
    end: '',
  },
  {
    tag: 'xliff',
    start: tags.xliffStart,
    end: tags.xliffEnd,
  },
  {
    tag: 'file',
    start: tags.fileStart,
    end: tags.fileEnd,
  },
  {
    tag: 'body',
    start: tags.bodyStart,
    end: tags.bodyEnd,
  },
];

const addTags = (tags: Tag[], content: string) => {
  const tag = tags[tags.length - 1];
  const value = `${tag.start}${content}${tag.end}`;
  tags.pop();
  return tags.length === 0 ? value : addTags(tags, value);
};

const convertToXliff = (input: string) => {
  const data = fs.readFileSync(input, 'utf8');
  const parse = JSON.parse(data);

  const items = parse.items
    .map((item: Item) =>
      item.type === 'markup' ? unitMarkup(item) : unitText(item)
    )
    .join('');

  return xmlFormat(addTags(xliffTags, items));
};

export default convertToXliff;
