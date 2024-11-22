import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user-schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:User.name,schema:UserSchema}
          ])
    ],
    providers:[UserService,CloudinaryService],
    controllers:[UserController]
})
export class UserModule {}
