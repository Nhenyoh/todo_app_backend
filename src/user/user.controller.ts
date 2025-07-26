import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { createUserDTO } from './Dto/create-user-dto';
import { UserService } from './user.service';
import { SendOTPDTO } from './Dto/opt-dto';
import { ChangePasswordDTO } from './Dto/change-password-dto';
// import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
// import { updateUserDto } from './Dto/update-user-dto';
// import { ChangePasswordDto } from './Dto/change-password';
// import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

 // Get all users
  @Get('otps')
  async getOTPs() {
    return this.userService.getOTPs();
  }
    // Signup route
  @Post('verification')
  async verification(@Body() sendOTP: SendOTPDTO) {
    return this.userService.verification(sendOTP);
  }
  // Signup route
  @Post('signup')
  async signup(@Body() createUserDto: createUserDTO) {
    console.log("the user email is" ,createUserDto.email)
    return this.userService.create(createUserDto);
  }

  // Login route
  @Post('login')
  async login(@Body() createLoginDto: { email: string; password: string }) {
    return this.userService.login(createLoginDto);
  }

  // Get all users
  @Get('')
  async getUsers() {
    return this.userService.getUsers();
  }

  // Get all users
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
  // Get a specific user by ID
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

@Post('change-password')
async changePassword(@Body() body: ChangePasswordDTO) {
  return this.userService.changePassword(body);
}


  
  
 
}