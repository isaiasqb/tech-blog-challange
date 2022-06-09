const { format_date } = require('../utils/helpers');


test('format_date() returns a formated date string', () => {
  const date = new Date('2021-12-24 10:30:00');

  expect(format_date(date)).toBe('24/12/2021');
});