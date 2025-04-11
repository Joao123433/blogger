import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { createId } from '@paralleldrive/cuid2';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private hashingService: HashingServiceProtocol
  ) {}

  async findOne(id: string) {
    const findUser = await this.prisma.users.findFirst({
      where:{
        id: id
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        Posts: true
      }
    })

    if(!findUser) throw new HttpException("User not found", HttpStatus.NOT_FOUND)

    return findUser;
  }

  async createOne(body: CreateUserDto) {
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
      throw new HttpException("Error creating user", HttpStatus.BAD_REQUEST)
    }
  }

  async updateOne(id: string, body: UpdateUserDto) {
    try {
      const findUser = await this.prisma.users.findFirst({
        where:{
          id: id
        }
      })
  
      if(!findUser) throw new HttpException("User not found", HttpStatus.NOT_FOUND)

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
      throw new HttpException("Error updating user", HttpStatus.BAD_REQUEST)
    }
  }

  async deleteOne(id: string) {
    try {
      const findUser = await this.prisma.users.findFirst({
        where:{
          id: id
        }
      })
  
      if(!findUser) throw new HttpException("User not found", HttpStatus.NOT_FOUND)
      
      await this.prisma.users.delete({
        where: {
          id: id
        }
      })
      
      return {message: "User deleted successfully"}
    } catch (error) {
      throw new HttpException("Error deleting user", HttpStatus.BAD_REQUEST)
    }
  }
}