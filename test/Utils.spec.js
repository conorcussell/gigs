import { distance } from '../src/js/modules/Utils';
import { expect } from 'chai';

describe('distance', () => {
  const position = { lat: '51.5395158', lng: '-0.1024666' };
  const positionTwo = { lat: '51.5429551', lng: '-0.1491962' };
  it('returns distance in miles between two positions', () => {
    expect(distance(position.lat, position.lng, positionTwo.lat, positionTwo.lng)).to.equal(2.0220102726167517);
  });
});
