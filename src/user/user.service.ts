// import {
//   HttpException,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { OTPDocument, OTPStore, User, UserDocument } from './schema/user-schema';
// import { Model } from 'mongoose';
// import { createUserDTO } from './Dto/create-user-dto';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
// import * as nodemailer from 'nodemailer';
// import { randomInt } from 'crypto';
// import { SendOTPDTO } from './Dto/opt-dto';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
//      @InjectModel(OTPStore.name) private readonly otpModel: Model<OTPDocument>,
//     private readonly jwtService: JwtService,
//   ) {}

//       async create(user: createUserDTO) {
//       try {
//         console.log("CREATING A NEW USER", user.email)
//         const otpRecord = await this.otpModel.findOne({ email: user.email });
//         console.log(otpRecord)

//         if (!otpRecord) {
//           console.log("Empty otp")
//           return { message: 'OTP not found or expired. Please request a new one.' };
//         }

//         if (otpRecord.otp !== user.otp) {
//            console.log(" otp Not match", otpRecord.otp,"user",user.otp)
//           return { message: 'Incorrect OTP' };
//         }

//         // Optional: Check OTP expiry
//         if (otpRecord.otpExpiresAt && otpRecord.otpExpiresAt < new Date()) {
//            console.log(" Otp expiredd")
//           return { message: 'OTP has expired. Please request a new one.' };
//         }

        
//         // Hash password and create user
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         const newUser = new this.userModel({
//           ...user,
//           password: hashedPassword,
//           emailVerified:true,
//         });

//         await newUser.save();
//         console.log('User created');

//         // Delete OTP after successful registration
//         await this.otpModel.deleteOne({ email: user.email });
//         const payload = { sub: newUser._id, email: user.email };
//         const token = await this.jwtService.signAsync(payload);
//       const  data={
//           fullNames:user.fullNames,
//           email:user.email,
//           token:token,
//           id:newUser._id
//         }

//         return { message: "User Created Successful",user:data };
//       } catch (error) {
//         throw new HttpException(error.message || error, 500);
//       }
//     }


//   async login(createLoginDto: { email: string; password: string }) {
//     try {
//       const user = await this.userModel.findOne({ email: createLoginDto.email });

//       if (!user) {
//         throw new UnauthorizedException('Invalid email or password');
//       }

//       const isPasswordValid = await bcrypt.compare(
//         createLoginDto.password,
//         user.password,
//       );

//       if (!isPasswordValid) {
//         throw new UnauthorizedException('Invalid email or password');
//       }

//       const payload = { sub: user._id, email: user.email };
//       const token = await this.jwtService.signAsync(payload);

//       return {
//         user: {
//           id: user._id,
//           email: user.email,
//           fullNames:user.fullNames,
//           token,
//         },
//       };
//     } catch (error) {
//       throw new HttpException(error.message || error, 500);
//     }
//   }

//   async getUsers(): Promise<UserDocument[]> {
//     return this.userModel.find();
//   }

//   async getOTPs(): Promise<UserDocument[]> {
//     return this.otpModel.find();
//   }

//   async getUser(id: string): Promise<UserDocument> {
//     return this.userModel.findById(id);
//   }

//   async deleteUser(id: string) {
//     return this.userModel.findById(id).deleteOne();
//   }


//   async verification(user: SendOTPDTO): Promise<{ message: string; otp: string }> {
//   try {
//     const checkUser= await this.userModel.findOne({email:user.email})
//         if(checkUser){
//           console.log("User already exist")
//           return  {message:"Users Already exist","otp":"" }
//         }

//     const otp = randomInt(1000, 9999).toString(); // Generate 4-digit OTP
//     console.log("Generating OTP and preparing to send...");

//     // Create transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `"Planner" <${process.env.GMAIL_USER}>`,
//       to: user.email,
//       subject: 'Your OTP Code for Verification',
//       text: `Hi ${user.userName || 'User'},\n\nYour One-Time Password (OTP) is: ${otp}\n\nThis code will expire in 10 minutes. Do not share it with anyone.\n\nThank you,\nYour App Team`,
//       html: `
//         <div style="font-family: Arial, sans-serif; font-size: 16px;">
//           <p>Hi ${user.userName || 'User'},</p>
//           <p>Your <strong>One-Time Password (OTP)</strong> is:</p>
//           <h2 style="color: #2e6c80;">${otp}</h2>
//           <p>This code will expire in <strong>10 minutes</strong>. Please do not share it with anyone.</p>
//           <p>Thank you,<br/>The <strong>Your App</strong> Team</p>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("OTP email sent to:", user.email);

//     // Save OTP to database (create or update)
//     await this.otpModel.findOneAndUpdate(
//       { email: user.email },
//       {
//         otp,
//         otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
//         updatedAt: new Date(),
//       },
//       { upsert: true, new: true }
//     );
//      const otpRecord = await this.otpModel.findOne({ email: user.email });
//         console.log(otpRecord)

//     return { message: 'OTP sent successfully to your email', otp };
//   } catch (error) {
//     console.error("OTP sending failed:", error);
//     throw new HttpException(error.message || error, 500);
//   }
// }

//   async changePassword(data: {
//   userId: string;
//   currentPassword: string;
//   newPassword: string;
// }): Promise<{ message: string }> {
//   try {
//     const user = await this.userModel.findById(data.userId);

//     if (!user) {
//       throw new UnauthorizedException('User not found');
//     }

//     const isMatch = await bcrypt.compare(data.currentPassword, user.password);
//     if (!isMatch) {
//       throw new UnauthorizedException('Current password is incorrect');
//     }

//     const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);
//     user.password = hashedNewPassword;
//     await user.save();

//     return { message: 'Password changed successfully' };
//   } catch (error) {
//     throw new HttpException(error.message || error, 500);
//   }
// }


// }


import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OTPDocument, OTPStore, User, UserDocument } from './schema/user-schema';
import { Model } from 'mongoose';
import { createUserDTO } from './Dto/create-user-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { randomInt } from 'crypto';
import { SendOTPDTO } from './Dto/opt-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(OTPStore.name) private readonly otpModel: Model<OTPDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(user: createUserDTO) {
    try {
      const email = user.email.toLowerCase();
      console.log("CREATING A NEW USER:", email);
      console.log("CREATING A NEW USER:", user.fullNames);

      const otpRecord = await this.otpModel.findOne({ email });
      console.log("OTP Record Found:", otpRecord);

      if (!otpRecord) {
        console.log("Empty OTP");
        return { message: 'OTP not found or expired. Please request a new one.' };
      }

      if (otpRecord.otp !== user.otp) {
        console.log("OTP mismatch", otpRecord.otp, "user input", user.otp);
        return { message: 'Incorrect OTP' };
      }

      if (otpRecord.otpExpiresAt && otpRecord.otpExpiresAt < new Date()) {
        console.log("OTP expired");
        return { message: 'OTP has expired. Please request a new one.' };
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = new this.userModel({
        ...user,
        email,
        password: hashedPassword,
        emailVerified: true,
      });

      await newUser.save();
      console.log('User created:', newUser._id);

      await this.otpModel.deleteOne({ email });

      const payload = { sub: newUser._id, email };
      const token = await this.jwtService.signAsync(payload);

      return {
        message: "User Created Successfully",
        user: {
          fullNames: user.fullNames,
          email,
          token,
          id: newUser._id,
        },
      };
    } catch (error) {
      throw new HttpException(error.message || error, 500);
    }
  }

  async login(createLoginDto: { email: string; password: string }) {
    try {
      const email = createLoginDto.email.toLowerCase();
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(
        createLoginDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const payload = { sub: user._id, email: user.email };
      const token = await this.jwtService.signAsync(payload);

      return {
        user: {
          id: user._id,
          email: user.email,
          fullNames: user.fullNames,
          token,
        },
      };
    } catch (error) {
      throw new HttpException(error.message || error, 500);
    }
  }

  async getUsers(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  async getOTPs(): Promise<OTPDocument[]> {
    return this.otpModel.find();
  }

  async getUser(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async deleteUser(id: string) {
    return this.userModel.findById(id).deleteOne();
  }

  async verification(user: SendOTPDTO): Promise<{ message: string; otp: string }> {
    try {
      const email = user.email.toLowerCase();

      const checkUser = await this.userModel.findOne({ email });
      if (checkUser) {
        console.log("User already exists:", email);
        return { message: "User already exists", otp: "" };
      }

      const otp = randomInt(1000, 9999).toString(); // 4-digit OTP
      console.log("Generating OTP for:", email, "OTP:", otp);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"Planner" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Your OTP Code for Verification',
        text: `Hi ${user.userName || 'User'},\n\nYour One-Time Password (OTP) is: ${otp}\n\nThis code will expire in 10 minutes. Do not share it with anyone.\n\nThank you,\nYour App Team`,
        html: `
          <div style="font-family: Arial, sans-serif; font-size: 16px;">
            <p>Hi ${user.userName || 'User'},</p>
            <p>Your <strong>One-Time Password (OTP)</strong> is:</p>
            <h2 style="color: #2e6c80;">${otp}</h2>
            <p>This code will expire in <strong>10 minutes</strong>. Please do not share it with anyone.</p>
            <p>Thank you,<br/>The <strong>Your App</strong> Team</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("OTP email sent to:", email);

      await this.otpModel.findOneAndUpdate(
        { email },
        {
          otp,
          otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
          updatedAt: new Date(),
        },
        { upsert: true, new: true }
      );

      const otpRecord = await this.otpModel.findOne({ email });
      console.log("Saved OTP Record:", otpRecord);

      // Optional delay for debugging only
      // await new Promise((res) => setTimeout(res, 500));

      return { message: 'OTP sent successfully to your email', otp };
    } catch (error) {
      console.error("OTP sending failed:", error);
      throw new HttpException(error.message || error, 500);
    }
  }

  async changePassword(data: {
    userId: string;
    currentPassword: string;
    newPassword: string;
  }): Promise<{ message: string }> {
    try {
      const user = await this.userModel.findById(data.userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const isMatch = await bcrypt.compare(data.currentPassword, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Current password is incorrect');
      }

      const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();

      return { message: 'Password changed successfully' };
    } catch (error) {
      throw new HttpException(error.message || error, 500);
    }
  }
}

