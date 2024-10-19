import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository } from 'typeorm';


@Injectable()
export class UsersQueryRepository {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
  }

  async userOutput(id: string) {
    // const findedUser = await this.uRepository.findOne({ where: { id } });
    // if (!findedUser) {
    //   throw new NotFoundException('User not found');
    // }
    // return this.userMap(findedUser as unknown as UserEntity);
  }

  userMap() {
    // const { email, login, createdAt, id } = user;
    // return {
    //   id: String(id),
    //   login,
    //   email,
    //   createdAt,
    // };
  }

  async getAllUsersWithQuery(query: any) {
    // const generateQuery = await this.generateQuery(query);
    // const items = await this.uRepository
    //   .find({
    //     ...generateQuery.userParamsFilter,
    //     order: {
    //       [generateQuery.sortBy]: generateQuery.sortDirection,
    //     },
    //     take: generateQuery.pageSize,
    //     skip: (generateQuery.page - 1) * generateQuery.pageSize,
    //   });

    // const itemsOutput = items.map((item: UserEntity) => this.userMap(item));
    // const resultPosts = new PaginationBaseModel<UserEntity>(generateQuery, itemsOutput);
    // return resultPosts;
  }

  private async generateQuery(query: any) {
    // const searchLoginTerm = query.searchLoginTerm ? query.searchLoginTerm : '';
    // const searchEmailTerm = query.searchEmailTerm ? query.searchEmailTerm : '';
    // const userParamsFilter = {
    //   where: [
    //     { email: Like(`%${searchEmailTerm}%`) },
    //     { login: Like(`%${searchLoginTerm}%`) },
    //   ],
    // };
    // const totalCount = await this.uRepository.count(userParamsFilter);
    // const pageSize = query.pageSize ? +query.pageSize : 10;
    // const pagesCount = Math.ceil(totalCount / pageSize);
    // return {
    //   totalCount,
    //   pageSize,
    //   pagesCount,
    //   page: query.pageNumber ? Number(query.pageNumber) : 1,
    //   sortBy: query.sortBy ? query.sortBy : 'createdAt',
    //   sortDirection: query.sortDirection ? query.sortDirection : 'desc',
    //   userParamsFilter,
    //   filterLogin,
    //   filterEmail,
    // };
  }

  async findAll() {
    const users = await this.dataSource.query('SELECT id, login, email, createdAt, emailConfirmationIsConfirm FROM users');
    // console.log(users);
    return users
  }


}
