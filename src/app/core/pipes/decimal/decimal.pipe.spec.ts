import { DecimalFormatPipe } from './decimal.pipe';

describe('DecimalPipe', () => {
  it('create an instance', () => {
    const pipe = new DecimalFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
