import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ResponseSigninDto } from './dto/response.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private hashingService: HashingServiceProtocol,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService
  ) {}

  async signin(body: SigninDto): Promise<ResponseSigninDto> {
    const findUser = await this.prisma.users.findFirst({
      where: {
        email: body.email
      }
    })

    if(!findUser) throw new HttpException("User login error", HttpStatus.UNAUTHORIZED) 

    const passwordValidade = this.hashingService.compare(body.password, findUser.passwordHash)
    if(!passwordValidade) throw new HttpException("Incorrect username/password", HttpStatus.UNAUTHORIZED)

    const token = await this.jwtService.signAsync(
      {
        sub: findUser.id,
        email: findUser.email
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: this.jwtConfiguration.jwtTtl,
      }
    )

    return {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      token: token
    }
  }
}
