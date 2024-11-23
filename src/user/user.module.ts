import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user-schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'your-secret-key', // Store securely in .env
          signOptions: { expiresIn: '1h' }, // Token expiry
        }),
        MongooseModule.forFeature([
            {name:User.name,schema:UserSchema}
          ])
    ],
    providers:[UserService,CloudinaryService],
    controllers:[UserController]
})
export class UserModule {}
