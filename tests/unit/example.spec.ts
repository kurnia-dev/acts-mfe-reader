import { filterSelectedTreeKeys, formatDate } from '@/utils';

describe('formatDate', () => {
  test('returns empty string when date is falsy', () => {
    expect(formatDate(null)).toBe('');
    expect(formatDate(undefined)).toBe('');
    expect(formatDate('')).toBe('');
    expect(formatDate(0)).toBe('');
    expect(formatDate(false)).toBe('');
  });

  test('returns formatted date string when date is truthy', () => {
    expect(formatDate('2022-01-01')).toBe('01/01/2022');
    expect(formatDate('2022-12-31')).toBe('31/12/2022');
    expect(formatDate('2022-02-14T13:00:00.000Z')).toBe('14/02/2022');
    expect(formatDate(new Date('2022-03-17T03:24:00.000Z'))).toBe('17/03/2022');
  });
});

describe('filterSelectedTreeKeys', () => {
  test('should return an empty array if no keys are checked', () => {
    const keys = {
      1: { checked: false, partialChecked: false },
      2: { checked: false, partialChecked: false },
      3: { checked: false, partialChecked: false },
    };
    const result = filterSelectedTreeKeys(keys);
    expect(result).toEqual([]);
  });

  test('should return an array of selected keys', () => {
    const keys = {
      1: { checked: true, partialChecked: false },
      2: { checked: false, partialChecked: false },
      3: { checked: true, partialChecked: false },
    };
    const result = filterSelectedTreeKeys(keys);
    expect(result).toEqual([1, 3]);
  });

  test('should ignore keys with partialChecked flag', () => {
    const keys = {
      1: { checked: true, partialChecked: false },
      2: { checked: true, partialChecked: true },
      3: { checked: false, partialChecked: false },
    };
    const result = filterSelectedTreeKeys(keys);
    expect(result).toEqual([1]);
  });

  test('should convert string keys to integers', () => {
    const keys = {
      '1': { checked: true, partialChecked: false },
      '2': { checked: false, partialChecked: false },
      '3': { checked: true, partialChecked: false },
    };
    const result = filterSelectedTreeKeys(keys);
    expect(result).toEqual([1, 3]);
  });
});
