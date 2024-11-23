import { HttpException, Injectable } from '@nestjs/common';
import { User, UserDocument } from './schema/user-schema';
import { Model } from 'mongoose';
import { createUserDTO } from './Dto/create-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  // User signup logic
  async create(createUserDto: createUserDTO) {
    try {
      // Check if user already exists
      const existingUser = await this.userModel.findOne({ email: createUserDto.email });
      if (existingUser) {
        throw new HttpException('User already exists', 409);
      }

      // Hash password
      const salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

      // Save the user
      const newUser = new this.userModel(createUserDto);
      await newUser.save();

      console.log('User created successfully');
      return { message: 'User created successfully' };
    } catch (error) {
      throw new HttpException(error.message || 'Internal Server Error', 500);
    }
  }

  // Login logic with JWT
  async login(createLoginDto: { email: string; password: string }) {
    try {
      const user = await this.userModel.findOne({ email: createLoginDto.email });
      if (!user) {
        throw new HttpException('Invalid email or password', 401);
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(createLoginDto.password, user.password);
      if (!isPasswordValid) {
        throw new HttpException('Invalid email or password', 401);
      }

      // Generate JWT
      const payload = { email: user.email, sub: user._id };
      const accessToken = this.jwtService.sign(payload);

      return {
        accessToken,
        user: { id: user._id, email: user.email },
      };
    } catch (error) {
      throw new HttpException(error.message || 'Internal Server Error', 500);
    }
  }

  // Fetch all users
  async getUsers(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  // Fetch a single user by ID
  async getUser(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  // Delete a user by ID
  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
