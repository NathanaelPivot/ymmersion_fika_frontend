import { PromotionPipe } from './promotion.pipe';

describe('PromotionPipe', () => {
  const pipe = new PromotionPipe();

  it('transform null into 0', () => {
    expect(pipe.transform(null)).toBe(0);
  });

  it('transform undefined into 0', () => {
    expect(pipe.transform(undefined)).toBe(0);
  });

  it('leave other numbers unchanged', () => {
    expect(pipe.transform(10)).toBe(10);
    expect(pipe.transform(0)).toBe(0);
    expect(pipe.transform(-5)).toBe(-5);
  });
});
