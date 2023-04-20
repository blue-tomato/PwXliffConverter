type BaseItem = {
  id: string;
  source: string;
  target: string;
};

type Item = {
  page: number;
  field: string;
  type: string;
  source: string;
  target: string;
};

const extractItems = (content: string) => {
  const units = content.match(/<trans-unit[^>]*>(.*?)<\/trans-unit>/gs);

  return units.map((item) => ({
    id: item.match(/<trans-unit[^>]*id="([^"]*)"/)[1] ?? '',
    source: item.match(/<source>([\s\S]*?)<\/source>/)[1] ?? '',
    target: item.match(/<target>([\s\S]*?)<\/target>/)[1] ?? '',
  }));
};

const cleanArray = (input: BaseItem[]) => {
  return input.map((obj) => {
    const cleanedObj = {};
    Object.keys(obj).forEach((key) => {
      let value = obj[key].replace(/\r|\n/g, '').trim();
      if (value.startsWith('<![CDATA[') && value.endsWith(']]>')) {
        value = value.slice(9, -3);
      }
      cleanedObj[key] = value;
    });
    return cleanedObj;
  });
};

const extractId = (input: BaseItem[]): Item[] => {
  return input.map((item) => {
    const id = item.id.split('-');

    return {
      page: +id[0],
      field: id[1],
      type: id[2],
      source: item.source,
      target: item.target,
    };
  });
};

const executeSequence = (arr: any[], initial: string) => {
  const value = executeFn(initial, arr[0]);
  arr.shift();
  return arr.length === 0 ? value : executeSequence(arr, value);
};

const executeFn = (input: string, fn: (arg0: string | BaseItem) => string) =>
  fn(input);

const parseItems = (data: string) => {
  return executeSequence([extractItems, cleanArray, extractId], data);
};

export { parseItems, Item };
