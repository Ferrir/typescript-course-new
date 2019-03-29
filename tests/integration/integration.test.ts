import * as jwt from 'jwt-simple'
import * as HTTPStatus from 'http-status'
import { app, request, expect } from './config/helpers'

describe('Testes de Integração', () => {  

   'use strict'
   const config = require('../../server/config/env/config')()
   const model = require('../../server/models')

   let id
   let token 

   const userTest = {
      id: 100,
      name: 'Teste',
      email: 'teste@email.com',
      password: 'teste'
   }

   const userDefault = {
      id: 1,
      name: 'Admin',
      email: 'admin@email.com',
      password: 'admin'
   }

   beforeEach((done) => {
      model.User.destroy({
         where: {}
      })
      .then(() => {
         return model.User.create(userDefault)
      })
      .then(user => {
         model.User.create(userTest)
            .then(() => {
               token = jwt.encode({id: userDefault.id}, config.secret)
               done()
            })
      })
   })

   describe('POST /token', () => {
      it('Deve receber um JWT', done => {
         const credencials = {
            email: userDefault.email,
            password: userDefault.password
         }
         request(app)
            .post('/token')
            .send(credencials)
            .end((err, res) => {
               expect(res.status).to.equal(HTTPStatus.OK)
               expect(res.body.token).to.equal(`${token}`)
               done(err)
            })
      })

      it('Não deve receber um JWT', done => {
         const credencials = {
            email: 'x',
            password: 'y'
         }
         request(app)
            .post('/token')
            .send(credencials)
            .end((err, res) => {
               expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED)
               expect(res.body).to.empty
               done(err)
            })
      })
   })

   describe('GET /api/users/all', () => {
      it('Deve retornar um Array com todos os Usuários', done => {
         request(app)
            .get('/api/users/all')
            .set('Context-Type', 'application/json')
            .set('Authorization', `JWT ${token}`)
            .end((error, res) => {
               expect(res.status).to.equal(HTTPStatus.OK)
               expect(res.body.payload).to.be.an('array')
               expect(res.body.payload[0].name).to.be.equal(userDefault.name)
               expect(res.body.payload[0].email).to.be.equal(userDefault.email)
               done(error)
            })
      })
   })

   describe('GET /api/users/:id', () => {
      it('Deve retornar um Array com apenas um Usuário', done => {
         request(app)
            .get(`/api/users/${userDefault.id}`)
            .set('Context-Type', 'application/json')
            .set('Authorization', `JWT ${token}`)
            .end((error, res) => {
               expect(res.status).to.equal(HTTPStatus.OK)
               expect(res.body.payload.id).to.be.equal(userDefault.id)
               expect(res.body.payload).to.have.all.keys([
                  'id', 'name', 'email', 'password'
               ])
               id = res.body.payload.id
               done(error)
            })
      })
   })

   describe('POST /api/users/create', () => {
      it('Deve criar um novo Usuário', done => {
         const user = {
            id: 2,
            name: 'Usuário teste',
            email: 'usuario@email.com',
            password: 'newuser'
         }
         request(app)
            .post('/api/users/create')
            .set('Context-Type', 'application/json')
            .set('Authorization', `JWT ${token}`)
            .send(user)
            .end((error, res) => {
               expect(res.status).to.equal(HTTPStatus.OK)
               expect(res.body.payload.id).to.eql(user.id)
               expect(res.body.payload.name).to.eql(user.name)
               expect(res.body.payload.email).to.eql(user.email)
               done(error)
         })
      })
   })

   describe('PUT /api/users/:id/update', () => {
      it('Deve atualizar um Usuário', done => {
         const user = {
            name: 'Teste Update',
            email: 'update@email.com'
         }
         request(app)
         .put(`/api/users/${id}/update`)
         .set('Context-Type', 'application/json')
         .set('Authorization', `JWT ${token}`)
         .send(user)
         .end((error, res) => {
            expect(res.status).to.equal(HTTPStatus.OK)
            expect(res.body.payload[0]).length.has.be.eql(1);
            done(error)
         })
      })
   })

   describe('DELETE /api/users/:id/destroy', () => {
      it('Deve deletar um Usuário', done => {
         request(app)
         .delete(`/api/users/${id}/destroy`)
         .set('Context-Type', 'application/json')
         .set('Authorization', `JWT ${token}`)
         .end((error, res) => {
            expect(res.status).to.equal(HTTPStatus.OK)
            expect(res.body.payload).length.has.be.eql(1);
            done(error)
         })
      })
   })
})