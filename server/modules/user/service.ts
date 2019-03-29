import { IUser, IUserDetail, createUser, createUsers, createUserById, createUserByEmail }  from './interface'
import * as BlueBird from 'bluebird'
const model = require('../../models')

class User implements IUser {
   public id: number
   public name: string
   public email: string
   public password: string

   constructor() {}

   create(user: any) {
      return model.User.create(user)
   }

   getAll(): BlueBird<IUser[]> {
      return model.User.findAll({
         order: ['name']
      })
      .then(createUsers)
   }

   getById(id: number): BlueBird<IUser> {
      return model.User.findOne({
         where: {id}
      })
      .then(createUserById)
   }

   getByEmail(email: string): BlueBird<IUser[]> {
      return model.User.findOne({
         where: {email}
      })
      .then(createUserByEmail)
   }

   update(id: number, user: any) {
      return model.User.update(user, {
         where: {id},
         fields: ['name', 'email', 'password'],
         hooks: true,
         individualHooks: true
     });
   }

   delete(id: number) {
      return model.User.destroy({
         where: {id}
     })
   }
}

export default new User()