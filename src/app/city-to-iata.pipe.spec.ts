import { CityToIataPipe } from './city-to-iata.pipe';

describe('CityToIataPipe', () => {
  it('create an instance', () => {
    const pipe = new CityToIataPipe();
    expect(pipe).toBeTruthy();
  });
});
