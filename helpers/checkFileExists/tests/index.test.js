import checkFileExists from './helpers/checkFileExists';
import { it, expect } from 'vitest';

it('should throw an error if the file can not be found', () => {
  const file = 'no file';

  const result = () => checkFileExists(file);

  expect(result).toThrowError;
});
