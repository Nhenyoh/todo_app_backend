import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

// const DB = process.env.DATABASE_URL?.replace(
//   "<password>",
//   process.env.DATABASE_PASSWORD as string,
// ).replace("<username>", process.env.DATABASE_USERNAME as string);
@Module({
  imports: [
    
    MongooseModule.forRoot(
        process.env.MONGODB_URI,
        {
          connectTimeoutMS: 30000, // Set this to a higher value if needed
          socketTimeoutMS: 45000,
        }
    ),
  ],
})
export class DatabaseModule {}
