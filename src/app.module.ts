import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'src/database-module';
import { TodModule } from './todo/todo_module';
import { NoteModule } from './note/note_module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { RecordModule } from './record/record-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    
    MongooseModule.forRoot(process.env.MONGODB_URI,{ connectTimeoutMS: 30000,}),

    UserModule,
    TodModule,
    NoteModule,
    CloudinaryModule,
    RecordModule


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
