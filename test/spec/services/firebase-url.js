'use strict';

describe('Service: firebaseUrl', function () {

  // load the service's module
  beforeEach(module('pocApp'));

  // instantiate service
  var firebaseUrl;
  beforeEach(inject(function (_firebaseUrl_) {
    firebaseUrl = _firebaseUrl_;
  }));

  it('should do something', function () {
    expect(!!firebaseUrl).toBe(true);
  });

});
