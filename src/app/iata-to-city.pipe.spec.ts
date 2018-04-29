import { IataToCityPipe } from './iata-to-city.pipe';

describe('CityToIataPipe', () => {
  it('create an instance', () => {
    const pipe = new IataToCityPipe();
    expect(pipe).toBeTruthy();
  });
});
