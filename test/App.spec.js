import { url, filterByDistance } from '../';
import { expect } from 'chai';

describe('url', () => {
  describe('given all arguments', () => {
    it('returns a url with date and lat/lng', () => {
      const expected = 'http://api.songkick.com/api/3.0/events.json?apikey=afM2GDbBHSRIRxf6&location=geo:52.3554450,0.1762220&min_date=2016-09-19&max_date=2016-09-19';
      const actual = url('2016-09-19', { lat: '52.3554450', lng: '0.1762220' });
      expect(actual).to.equal(expected);
    });
  });

  describe('called with a date', () => {
    it('returns a url with date and clientip', () => {
      const expected = 'http://api.songkick.com/api/3.0/events.json?apikey=afM2GDbBHSRIRxf6&location=clientip&min_date=2016-09-19&max_date=2016-09-19';
      const actual = url('2016-09-19', undefined);
      expect(actual).to.equal(expected);
    });
  });
});

describe('filterByDistance', () => {
  describe('with no gigs within the distance', () => {
    it('returns an empty array', () => {
      const actual = filterByDistance([{distance: 24}, {distance: 12}, {distance: 400}], 10);
      expect(actual.length).to.equal(0);
    });
  });

  describe('with gigs within the distance', () => {
    it('returns a filtered array', () => {
      const actual = filterByDistance([{distance: 8}, {distance: 5}, {distance: 1}, {distance: 12}, {distance: 20}], 10);
      expect(actual.length).to.equal(3);
    });
  });
});
