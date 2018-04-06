const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app.js'); 
const faker = require('faker')

chai.use(chaiHttp); 
var token
var name = faker.name.findName()
var email = faker.internet.email()

describe('User Signin and Register', () => { 
  describe('Register',() => {
    it('Should Register new User', function(done) {
      chai.request(app)
        .post('/users/register')
        .send({ email: email, name: name, password: 'rahasia' })
        .end(function(err, res) {
           token = res.body.token
           expect(res).to.have.status(200);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Success Register New User');
           expect(res.body).to.have.property('token');
           done();
        })
    }).timeout(4000)
    it('Should Give error when register same email', function(done) {
      chai.request(app)
        .post('/users/register')
        .send({ email: email, name: name, password: 'rahasia' })
        .end(function(err, res) {
           expect(res).to.have.status(400);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Email has been used');
           done();
        })
    })
  })
  describe('Signin', function() {
    it('Should sign in User', function(done) {
      chai.request(app)
        .post('/users/signin')
        .send({ email: email, password: 'rahasia' })
        .end(function(err, res) {
           expect(res).to.have.status(200);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Success Sign In');
           expect(res.body).to.have.property('token');
           token = res.body.token
           done();
        })
    }) 
    it('Should Give error when wrong credentials', function(done) {
      chai.request(app)
        .post('/users/signin')
        .send({ email: email, password: 'rahasiasalah' })
        .end(function(err, res) {
           expect(res).to.have.status(403);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('User Not Found');
           done();
        })
    }) 
  })
})
var passwordId
describe('Password Management', function() {
  it('Should create new Password', function(done) {
    chai.request(app)
      .post('/passwords')
      .set('token', token)
      .send({ username: faker.internet.userName(), password: faker.internet.password(), url: faker.internet.url() })
      .end(function(err, res) {
         expect(res).to.have.status(201);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Add new Password');
         expect(res.body).to.have.property('data');
         passwordId = res.body.data._id
         done();
      })
  }) 
  it('Should Give error when create new Password without auth', function(done) {
    chai.request(app)
      .post('/passwords')
      .send({ username: faker.internet.userName(), password: faker.internet.password(), url: faker.internet.url() })
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  }) 
  it('Should Update Password', function(done) {
    chai.request(app)
      .put(`/passwords/${passwordId}`)
      .set('token', token)
      .send({ username: faker.internet.userName(), password: faker.internet.password(), url: faker.internet.url() })
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Update a Password');
         expect(res.body).to.have.property('data');
         done();
      })
  }) 
  it('Should Delete a Password', function(done) {
    chai.request(app)
      .del(`/passwords/${passwordId}`)
      .set('token', token)
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Delete a Password');
         expect(res.body).to.have.property('data');
         done();
      })
  }) 
  it('Should Give error when delete a Password without auth', function(done) {
    chai.request(app)
      .del(`/passwords/${passwordId}`)
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  }) 
})

