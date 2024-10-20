import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';


@Injectable()
export class UsersRepository {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
  }

  async createUser(userData: any) {
    const result = await this.dataSource.query(
      'INSERT INTO users ("login", "email", "password", "emailConfirmationIsConfirm", "emailConfirmationConfirmationCode", "emailConfirmationExpirationDate") VALUES ($1, $2, $3, $4, $5, $6) RETURNING "id", "login", "email", "createdAt"', [
        userData.login,
        userData.email,
        userData.password,
        userData.emailConfirmationIsConfirmed,
        userData.emailConfirmationConfirmationCode,
        userData.emailConfirmationExpirationDate,
      ],
    );
    return result[0];
  }


  async getAllUsers() {
    // return await this.uRepository.find();
  }

  async updateUserByResendEmail(currentData: any, newData: any) {
    // return await this.uRepository.save({
    //   ...currentData,
    //   ...newData,
    // });
  }

  async findUserById(id: string) {
    const findedUser = await this.dataSource.query('SELECT * FROM users WHERE id = $1', [id]);
    if (!findedUser.length) {
      throw new NotFoundException('User not found');
    }
    return findedUser[0];
  }

  async findUserByLogin(login: string) {
    const findedUser = await this.dataSource.query('SELECT * FROM users WHERE login = $1', [login]);
    if (!findedUser.length) {
      throw new UnauthorizedException('User not found');
    }
    return findedUser[0];
  }

  async findUserByEmail(email: string) {
    // const findedUser = await this.uRepository.findOneBy({ email });
    // if (!findedUser) {
    //   throw new NotFoundException('User not found');
    // }
    // return findedUser;
  }

  async findUserByCode(code: string) {
    // const findedUser = await this.uRepository.findOne({
    //   where: {
    //     emailConfirmation: { confirmationCode: code },
    //   },
    // });
    // if (!findedUser) {
    //   throw new NotFoundException('User not found');
    // }
    // return findedUser;
  }

  async deleteUserById(id: string) {
    const findedUser = await this.findUserById(id);
    return await this.dataSource.query('DELETE FROM users WHERE "id" = $1', [id]);
  }

  async checkUserExistsByLogin(login: string, email: string) {
    // const findedUser = await this.uRepository.findOne({
    //   where: [
    //     { login },
    //     {email}
    //   ],
    // });
    // if (findedUser) {
    //   throw new BadRequestException('User already exists');
    // }
  }

}
