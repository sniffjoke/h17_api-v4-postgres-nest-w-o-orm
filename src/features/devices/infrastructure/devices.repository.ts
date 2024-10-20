import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class DevicesRepository {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
  }

  async createSession(deviceData: any) {
    const result = await this.dataSource.query('INSERT INTO devices ("userId", "deviceId", "title", "ip", "lastActiveDate") VALUES ($1, $2, $3, $4, $5) RETURNING *', [
      deviceData.userId,
      deviceData.deviceId,
      deviceData.title,
      deviceData.ip,
      deviceData.lastActiveDate,
    ]);
    return result
  }

  async findManyDevices(filter: any) {
    const findedDevice = await this.dataSource.query(
      'SELECT * FROM devices WHERE "userId" = $1 AND "ip" = $2 AND "title" = $3',
      [filter.userId, filter.ip, filter.title]
    );
    if (!findedDevice) {
      throw new NotFoundException('Device not found');
    }
    return findedDevice[0];
  }

  async findDeviceByUserId(filter: any) {
    const findedDevice = await this.dataSource.query(
      'SELECT * FROM devices WHERE "userId" = $1',
      [filter.userId]
    );
    if (!findedDevice) {
      throw new NotFoundException('Device not found');
    }
    return findedDevice;
  }

  async updateDeviceById(id: string, deviceData: any) {
    // return this.dRepository.save({
    //   id,
    //   ...deviceData
    // });
    return await this.dataSource.query('UPDATE devices SET "lastActiveDate" = $1 WHERE id = $2', [deviceData, id])
  }

}
