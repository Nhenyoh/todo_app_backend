import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'src/database-module';
import { TodModule } from './todo/todo_module';
import { NoteModule } from './note/note_module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    
    MongooseModule.forRoot(process.env.MONGODB_URI,{ connectTimeoutMS: 30000,}),

    UserModule,
    TodModule,
    NoteModule


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
