type Tag = {
  tag: string;
  start: string;
  end: string;
};

const xliffTags = [
  {
    tag: 'xml',
    start: '<?xml version="1.0" encoding="UTF-8"?>',
    end: '',
  },
  {
    tag: 'xliff',
    start:
      '<xliff xmlns="urn:oasis:names:tc:xliff:document:1.2" version="1.2">',
    end: '</xliff>',
  },
  {
    tag: 'file',
    start: '<file datatype="plaintext" source-language="" target-language="">',
    end: '</file>',
  },
  {
    tag: 'body',
    start: '<body>',
    end: '</body>',
  },
];

const updateTags = (parsed: {
  version: string;
  source_language: string;
  target_language: string;
}) => {
  xliffTags[0].start = `<?xml version="${
    parsed.version ?? ''
  }" encoding="UTF-8"?>`;

  xliffTags[2].start = `<file  datatype="plaintext" source-language="${
    parsed.source_language ?? ''
  }" target-language="${parsed.target_language ?? ''}">`;
};

export { xliffTags, updateTags, Tag };
