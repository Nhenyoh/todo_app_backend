import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { createUserDTO } from './Dto/create-user-dto';
import { UserService } from './user.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('user')
export class UserController {
    constructor(private readonly user:UserService, private readonly cloudinaryService: CloudinaryService){}


    @Post('')
    // @UseInterceptors(FileInterceptor('file'))
    async create(@Body('') createUserDto:createUserDTO,){
        console.log("CREATING USER")

        // const url = await this.cloudinaryService.uploadImage(file);
        const data={

            "fullNames":createUserDto.fullNames,
            "email":createUserDto.email,
            "password":createUserDto.password,
          
            // "picture":url,

        }
        console.log("USER DATA", data)
        return this.user.create(data);
    }

    @Post('/login')
   
    async login(@Body('') createLoginDto:{email:string,password:string}){
        console.log("THE YOUR IS LOGGING IN ")
        return this.user.login(createLoginDto)
    }

    @Get()
    async getUsers(){
        return this.user.getUsers()
    }

    @Get(':id')
    async getUser(@Param() id:string){
        return this.user.getUser(id)
    }


    @Delete()
    async deleteUser(id:string){
        return this.user.deleteUser(id)
    }

}
