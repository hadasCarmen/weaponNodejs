import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { DtoUser } from 'src/users/dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) throw new BadRequestException();
    console.log(user);

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;

    const payload = { username: user.username, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async create(user: DtoUser) {
    const saltOrRounds = 10;
    const hashedPass = await bcrypt.hash(user.password, saltOrRounds);
    return await this.usersService.createOne({ ...user, password: hashedPass });
  }
}
