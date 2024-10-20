import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource} from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class TokensRepository {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
  }

  async findToken(filter: any) {
    // const findedToken = await this.tRepository.findOneBy(filter)
    // return findedToken
    const findedToken = await this.dataSource.query(
      'SELECT * FROM tokens WHERE "deviceId" = $1',
      [filter.deviceId]
    );
    if (!findedToken.length) {
      throw new NotFoundException('Invalid deviceId');
    }
    return findedToken[0];
  }

  async updateStatusTokensInDb(filter: any) {
    // const updateTokens = await this.tRepository.update(filter, payload)
    // return updateTokens
    console.log(typeof filter.deviceId);
    return await this.dataSource.query('UPDATE tokens SET "blackList" = true WHERE "deviceId" = $1', [filter.deviceId])
  }

  async updateStatusTokensAfterDeleteAllInDb(filter: any) {
    // const updateTokens = await this.tRepository.update(filter, payload)
    // return updateTokens
    return await this.dataSource.query('UPDATE tokens SET "blackList" = true WHERE "deviceId" = $1 AND "userId" <> $2', [filter.deviceId, filter.userId])
  }

  async updateOneTokenInDb(filter: any, payload: any) {
    // const updateTokens = await this.tRepository.update(filter, payload)
    // return updateTokens
  }

  async createToken(tokenData: any) {
    const result = await this.dataSource.query('INSERT INTO tokens ("userId", "deviceId", "refreshToken", "blackList") VALUES ($1, $2, $3, $4) RETURNING *', [
      tokenData.userId,
      tokenData.deviceId,
      tokenData.refreshToken,
      tokenData.blackList
    ]);
    return result
    // const saveToken = await this.tRepository.save(tokenData)
    // return saveToken
  }

}
