import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './auth.model';
import { Model } from 'mongoose';
import { compare, genSalt, hashSync } from 'bcryptjs';
import {
  CREDENTIALS_ARE_NOT_VALID,
  USER_NOT_FOUND_ERROR,
} from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: hashSync(dto.password, salt),
    });

    return newUser.save();
  }

  findUser(email: string) {
    return this.userModel.findOne({ email });
  }

  async validateUser(dto: AuthDto) {
    const user = await this.findUser(dto.login);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const isPasswordCorrect = await compare(dto.password, user.passwordHash);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException(CREDENTIALS_ARE_NOT_VALID);
    }

    return dto.login;
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
