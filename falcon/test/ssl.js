var assert = require('assert');
var sslCertficate = require('../ssl/cert');

describe('SSL Certficate Interface  Test', function() {

  before(function() {
    // runs before all tests in this block
  });

  after(function() {
    // runs after all tests in this block
  });

  it('Should get certificate when host is a real ssl server ', function(done) {
    var promise = sslCertficate.get('baidu.com');
    promise.then((cert) => {
      assert.equal(cert.subject.C, "CN");
      assert.equal(cert.subject.ST, "beijing")
      assert.equal(cert.subject.O, "BeiJing Baidu Netcom Science Technology Co., Ltd")
      done();
    })
  });


  it('Should get certificate when ssl port specificed', function(done) {
    var promise = sslCertficate.get('baidu.com', 443);
    promise.then((cert) => {
      assert.equal(cert.subject.C, "CN");
      assert.equal(cert.subject.ST, "beijing")
      assert.equal(cert.subject.O, "BeiJing Baidu Netcom Science Technology Co., Ltd")
      done();
    })
  });

  it('Fail to get certificate with wrong ssl port', function() {
    var promise = sslCertficate.get('www.baidu.com', 8443);

    promise.catch((e) => {
      assert.ok(e);
      done();
    })
  });

  it('Fail to get certificate with ssh port', function() {
    var promise = sslCertficate.get('example.com', 22);

    promise.catch((e) => {
      assert.ok(e);
      done();
    })
  });

  it('Fail to get certificate when host does not support ssl', function(done) {
    var promise = sslCertficate.get('127.0.0.1');

    promise.catch((e) => {
      assert.ok(e);
      done();
    })
  });

});
