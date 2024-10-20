import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { DeviceEntity } from '../domain/devices.entity';


@Injectable()
export class DevicesRepository {
  constructor(
    @InjectRepository(DeviceEntity) private readonly dRepository: Repository<DeviceEntity>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
  }

  async createSession(deviceData: any) {
    const result = await this.dataSource.query('INSERT INTO devices (userId, deviceId, title, ip, lastActiveDate) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
      deviceData.userId,
      deviceData.deviceId,
      deviceData.title,
      deviceData.ip,
      deviceData.lastActiveDate,
    ]);
    return result
  }

  async findManyDevices(filter: any) {
    const findedDevice = await this.dRepository.findOne({where: {...filter}});
    // if (!findedDevice) {
    //   throw new NotFoundException('Device not found');
    // }
    return findedDevice;
  }

  async findDevice(filter: any) {
    const findedDevice = await this.dRepository.find(filter);
    if (!findedDevice) {
      throw new NotFoundException('Device not found');
    }
    return findedDevice;
  }

  async updateDeviceById(id: string, deviceData: any) {
    return this.dRepository.save({
      id,
      ...deviceData
    });
  }

}
