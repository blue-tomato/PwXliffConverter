# PwXliffConverter

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

PwXliffConverter is a Node.js CLI tool that allows you to convert [ProcessWire](http://processwire.com/) JSON translation exports to XLIFF 1.2 format and back again.

## Installation

Clone the repository:

```
git clone https://github.com/blue-tomato/PwXliffConverter.git
cd PwXliffConverter
```

Install dependencies:

```
npm install
```

Build the `app` folder by running:

```
npm run build
```

To install globally, run:

```
npm install -g .
```

## Usage

To use PwXliffConverter, run the following command:

```
node app convert --file <filename>
```

If installed globally:

```
pwcvt convert --file <filename>
```

Replace `<filename>` with the path of the ProcessWire JSON translation export file that you want to convert to XLIFF, or the name of the XLIFF file that you want to convert back to JSON.
The converted file is located in the same folder as the original file.

For example, to convert `translations.json` to `translations.xlf`, run the following command:

```
node app convert --file `translations.json`
```
Be aware that if you already have a file with the same name in your folder, it will be overwritten.

## Dependencies/Packages

- [fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser)
- [xml-formatter](https://www.npmjs.com/package/xml-formatter)
- [colors](https://www.npmjs.com/package/colors)
- [vitest](https://www.npmjs.com/package/vitest)
- [yargs](https://www.npmjs.com/package/yargs)

## Contributing

Create a branch on your fork, add commits to your fork, and open a pull request from your fork to this repository.

To get better insights and onboard you on module implementation details just open a support issue. We'll get back to you asap.

## License

See the `LICENSE.txt` file for information about the module's license.
