type Item = {
  page: string;
  field: string;
  type: string;
  source: string;
  target: string;
};

const unitMarkup = (item: Item) =>
  `<trans-unit id="${item.page}-${item.field}-${item.type}" datatype="html">
        <source><![CDATA[${item.source}]]></source>
        <target>${
          item.target === '' ? '' : `<![CDATA[${item.target}]]>`
        }</target>
      </trans-unit>
`;

const unitText = (item: Item) =>
  `<trans-unit id="${item.page}-${item.field}-${item.type}" datatype="text">
  <source>${item.source}</source>
  <target>${item.target === '' ? '' : `${item.target}`}</target>
</trans-unit>`;

export { unitMarkup, unitText, Item };
