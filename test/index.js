var request = require('supertest');

describe('upload', function() {
  var server;
  beforeEach(function() {
    server = require('../index');
  });
  afterEach(function() {
    server.close();
  });

  it('gives me a public page', function testStatic(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('responds with json for small file', function testSmallUpload(done) {
    request(server)
      .post('/')
      .attach('info', __dirname + '/1.test')
      .expect('Content-Type', /json/)
      .expect(200, {
        size: 100
      }, done);
  });

  it('responds with json for a larger file', function testLargerUpload(done) {
    request(server)
      .post('/')
      .attach('info', __dirname + '/2.test')
      .expect('Content-Type', /json/)
      .expect(200, {
        size: 1000
      }, done);
  });

  it('responds with a 404 for everything else', function test404(done) {
    request(server)
      .get('/test')
      .expect(404, done);
  });
});
