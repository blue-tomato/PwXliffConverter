type Item = {
  page: string;
  field: string;
  type: string;
  source: string;
  target: string;
};

const unitMarkup = (item: Item) =>
  `<trans-unit id="${item.page}****${item.field}****${item.type}" datatype="html">
        <source><![CDATA[${item.source}]]></source>
        <target><![CDATA[${item.target}]]></target>
      </trans-unit>
`;

export { unitMarkup, Item };
