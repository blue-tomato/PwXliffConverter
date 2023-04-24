import { XMLParser } from 'fast-xml-parser';
import { format } from 'date-fns';
import fs from 'fs';

type Data = {
  source_language: string;
  target_language: string;
  version: number;
  exported: string;
  items: {
    page: string | number;
    field: string;
    type: string;
    source: string;
    target: string;
  }[];
};

type Item = { '@_id': string; source: string; target: string };

const extractItems = (body: Item[]) => {
  return body?.map((item) => {
    const id = item['@_id'] ? item['@_id'].split('-') : [];
    if (!id.length) return;

    return {
      page: Number(id[0]) ? Number(id[0]) : id[0],
      field: id[1],
      type: id[2],
      source: item.source,
      target: item.target,
    };
  });
};

const stringify = (input: Data) => {
  return JSON.stringify(input, null, 2);
};

const convertToJSon = (input: fs.PathOrFileDescriptor) => {
  const data = fs.readFileSync(input, 'utf8');

  const parsed = new XMLParser({
    ignoreAttributes: false,
  }).parse(data);

  const body = (parsed.xliff.file.body || {})['trans-unit'];
  const items = extractItems(body);

  return stringify({
    source_language: (parsed.xliff.file || {})['@_source-language'],
    target_language: (parsed.xliff.file || {})['@_target-language'],
    version: +parsed['?xml']['@_version'] ?? 1,
    exported: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    items: items,
  });
};

export default convertToJSon;
