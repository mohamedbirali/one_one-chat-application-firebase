import { TimestampToStringPipe } from './timestamp-to-string.pipe';

describe('TimestampToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new TimestampToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
