import { HttpException, Injectable } from '@nestjs/common';
import { User, UserDocument } from './schema/user-schema';
import { Model } from 'mongoose';
import { createUserDTO } from './Dto/create-user-dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel:Model<UserDocument>){}

    async create(createUserDto:createUserDTO){
           try {
            
            const newErrand = new this.userModel(createUserDto)
            await newErrand.save()
            console.log("User created")
            
           } catch (error) {
             throw  new HttpException(error,500)
           }
    }

    async login(createLoginDto:{email:string,password:string}){
      try {
       console.log("LOGGED IN DETAILS ", createLoginDto)
       const response = await this.userModel.findOne({email:createLoginDto.email})

       console.log("THE RESPONSE IS ", response)
       if(response){
          console.log("AND ERROR WAS THROWN")
         throw  new HttpException("error",500)
       }
       else {
        console.log("AND ERROR WAS  NOT THROWN")

        return "success"
       }
       
       
      } catch (error) {
        throw  new HttpException(error,500)
      }
}

    async getUsers():Promise<UserDocument[]>{
            return this.userModel.find()
    }

    async getUser(id:string):Promise<UserDocument>{
            return this.userModel.findById(id)
    }


    async deleteUser(id:string){
        return this.userModel.findById(id).deleteOne()
    }
}
