import { ResponseCreateUserDto, ResponseFindUserDto, ResponseUpdateAvatarDto, ResponseUpdateUserDto } from './dto/response.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { createId } from '@paralleldrive/cuid2';
import { FastifyRequest } from 'fastify';

import * as path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private hashingService: HashingServiceProtocol
  ) {}

  async findOne(payloadToken: PayloadDto): Promise<ResponseFindUserDto> {
    try {
      const findUser = await this.prisma.users.findFirst({
        where:{
          id: payloadToken.sub
        },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true,
          avatar: true,
          Posts: {
            select: {
              id: true,
              title: true,
              introduction: true,
              created_at: true
            }
          },
          Comments: {
            select: {
              id: true,
              comment: true,
              created_at: true
            }
          }
        }
      })
  
      if(!findUser) throw new HttpException("User not found", HttpStatus.NOT_FOUND)
  
      return findUser;  
    } catch (error) {
      throw new HttpException(
        "Failed to find user",
        error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createOne(body: CreateUserDto): Promise<ResponseCreateUserDto> {
    try {
      const passwordHash = await this.hashingService.hash(body.passwordHash)
      
      const user = await this.prisma.users.create({
        data: {
          id: createId(),
          name: body.name,
          email: body.email,
          passwordHash: passwordHash
        },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true
        }
      })
 
      return user
    } catch (error) {
      throw new HttpException(
        "Failed to create user",
        error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateOne(id: string, body: UpdateUserDto, payloadToken: PayloadDto): Promise<ResponseUpdateUserDto> {
    try {
      const findUser = await this.prisma.users.findFirst({
        where:{
          id: id
        }
      })
  
      if(!findUser) throw new HttpException("User not found", HttpStatus.NOT_FOUND)

      if(findUser.id !== payloadToken.sub) throw new HttpException("Access denied", HttpStatus.BAD_REQUEST)

      const dataUser: {name?: string, passwordHash?: string} = {
        name: body?.name ? body.name : findUser.name
      }

      if(body?.passwordHash) {
        const passwordHash = await this.hashingService.hash(body?.passwordHash)
        dataUser['passwordHash'] = passwordHash
      }

      const user = await this.prisma.users.update({
        where: {
          id: id
        },
        data: {
          name: dataUser.name,
          passwordHash: dataUser?.passwordHash ? dataUser.passwordHash : findUser.passwordHash,
          updated_at: new Date()
        },
        select: {
          id: true,
          name: true,
          email: true,
        }
      })

      return user
    } catch (error) {
      throw new HttpException(
        "Error updating user",
        error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async deleteOne(id: string, payloadToken: PayloadDto) {
    try {
      const findUser = await this.prisma.users.findFirst({
        where:{
          id: id
        }
      })
  
      if(!findUser) throw new HttpException("User not found", HttpStatus.NOT_FOUND)

      if(findUser.id !== payloadToken.sub) throw new HttpException("Access denied", HttpStatus.NOT_FOUND)
      
      await this.prisma.users.delete({
        where: {
          id: id
        }
      })
      
      return { message: "User deleted successfully" }
    } catch (error) {
      throw new HttpException("Error deleting user", HttpStatus.BAD_REQUEST)
    }
  }

  async uploadFile(req: FastifyRequest, payloadToken: PayloadDto): Promise<ResponseUpdateAvatarDto> {
    try {
      const file = await req.file();
      if(!file || file.filename === '') throw new HttpException("No file provided", HttpStatus.NO_CONTENT)

      // CONFIGS
      const fileExtension = path.extname(file.filename).toLowerCase().substring(1);
      const filePathBase = path.resolve(process.cwd(), 'files', payloadToken.sub);
      const fileName = `${payloadToken.sub}.${fileExtension}`;
      const fileLocale = path.resolve(process.cwd(), 'files', fileName);
      const buffer = await file.toBuffer();


      // SAVE THE IMAGE, AND REPLACE IF IT ALREADY EXISTS
      ['png', 'jpeg', 'jpg'].forEach(ext => {
        const file = `${filePathBase}.${ext}`;
        if (fs.existsSync(file)) fs.unlinkSync(file);
      });

      fs.writeFileSync(fileLocale, buffer);

      const findUser = await this.prisma.users.findFirst({
        where: {
          id: payloadToken.sub
        }
      })

      if(!findUser) throw new HttpException("User not found", HttpStatus.NOT_FOUND)

      const updatedUser = await this.prisma.users.update({
        data: {
          avatar: fileName
        },
        where: {
          id: findUser.id
        },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        }
      })

      return updatedUser
    } catch (error) {
      throw new HttpException(error.message ? error.message : "Failed to update user's avatar", HttpStatus.NOT_FOUND);
    }
  }
}