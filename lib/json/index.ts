import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';

type Item = { '@_id': string; source: string; target: string };

const extractItems = (items: Item[]) => {
  return items?.map((item) => {
    const id = item['@_id'] ? item['@_id'].split('****') : [];
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

const extractFields = (fields: string[]) => {
  return Object.fromEntries(
    new Map(
      fields?.map((item: string) => {
        const [key, value] = item.split('****');
        return [key, value];
      })
    )
  );
};

const convertToJSon = (input: fs.PathOrFileDescriptor) => {
  const data = fs.readFileSync(input, 'utf8');

  const parsed = new XMLParser({
    ignoreAttributes: false,
    processEntities: false,
  }).parse(data);

  const header = parsed.xliff.file || {};
  const body = parsed.xliff.file.body || {};

  return JSON.stringify(
    {
      source_language: header['@_source-language'],
      target_language: header['@_target-language'],
      version: +parsed['?xml']['@_version'] ?? 1,
      exported: body['timestamp'],
      items: extractItems(body['trans-unit']),
      fields: extractFields(body['note']),
    },
    null,
    4
  );
};

export default convertToJSon;
