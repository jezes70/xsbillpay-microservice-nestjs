import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XBILLUserAgent } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(XBILLUserAgent)
    private userRepository: Repository<XBILLUserAgent>,
  ) {}

  async saveUser(newUser: XBILLUserAgent): Promise<XBILLUserAgent> {
    return this.userRepository.save(newUser);
  }

  async findOneByEmail(userEmail: string): Promise<XBILLUserAgent | undefined> {
    return this.userRepository.findOne({ where: { email: userEmail } });
  }
  
  async findOneById(id: number): Promise<XBILLUserAgent | undefined> {
    return this.userRepository.findOne({ where: { id: id } });
  }

}
