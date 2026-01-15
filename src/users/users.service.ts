
import { Injectable } from '@nestjs/common';
import { DtoUser } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/userModel';


@Injectable()
export class UsersService {
  constructor (
    @InjectModel(User)
    private userModel : typeof User
  ){}


  async findAll()  : Promise<User[]>{
    return await this.userModel.findAll()
  }

  async findOne(username: string)  : Promise<User | null>{
    const user =  this.userModel.findOne(
      {
        where : {
          username
        },
        raw : true
      }
    )
    return user
  }

  async createOne(user:DtoUser) : Promise<User> {
    return await this.userModel.create(user as any)
  }
}
