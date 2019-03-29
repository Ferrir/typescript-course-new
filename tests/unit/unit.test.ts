import { testDouble, expect } from './config/helpers'
import User from '../../server/modules/user/service'
const model = require('../../server/models')

describe('Testes Unitários do Controller', () => {

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
         model.User.create(userDefault)
         .then(user => {
            console.log(`Usuário default criado`)
            done()
         })
      })
   })

   describe('Método Create', () => {
      it('Deve criar um novo usuário', () => {
         const newUser = {
            id: 2,
            name: 'Admin 2',
            email: 'admi2n@email.com',
            password: 'admin2'
         }         
         return User.create(newUser)
            .then(data => {
               expect(data.dataValues).to.have.all.keys (
                  ['createdAt', 'email', 'id', 'name', 'password', 'updatedAt']
               )
            })
      })
   })

   describe('Método GET Users', () => {
      it('Deve retornar uma lista com todos os usuários', () => {
         return User.getAll()
            .then(data => {
               expect(data).to.be.an('array')
            })
      })
   })

   describe('Método Update', () => {
      it('Deve atualizar um usuário', () => {
         const updateUser = {
            name: 'adminupdate',
            email: 'adminupdate@email.com'
         }
         return User.update(userDefault.id, updateUser)
            .then(data => {
               expect(data[0]).to.be.equal(1)
            })
      })
   })   

   describe('Método GetById', () => {
      it('Deve um usuário pelo ID', () => {
         return User.getById(userDefault.id)
            .then(data => {
                expect(data).to.have.all.keys(
                   ['email', 'id', 'name', 'password']
               )
            })
      })
   })

   describe('Método GetByEmail', () => {
      it('Deve um usuário pelo ID', () => {
         return User.getByEmail(userDefault.email)
            .then(data => {
                expect(data).to.have.all.keys(
                   ['email', 'id', 'name', 'password']
               )
            })
      })
   })

   describe('Método Delete', () => {
      it('Deve deletar um usuário', () => {
         return User.delete(userDefault.id)
            .then(data => {
               expect(data).to.be.equal(userDefault.id)
            })
      })
   })
})