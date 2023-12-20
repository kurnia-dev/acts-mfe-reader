import { formatDateTime } from './index';

describe('formatDateTime', () => {
  it('should format the date in en-GB format', () => {
    const date = new Date('2022-01-01T12:34:56Z');
    const formattedDate = formatDateTime(date);
    expect(formattedDate).toBe('01/01/2022, 19:34');
  });

  it('should return an empty string if the date is falsy', () => {
    const formattedDate = formatDateTime(null);
    expect(formattedDate).toBe('');
  });
});
