import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(username: string, password: string, role: string = 'viewer'): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, password: hashedPassword, role });
    return this.userRepository.save(user);
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async updateUserRole(id: number, role: string): Promise<User> {
    const user = await this.userRepository.findOneById(id);
    if (user) {
      user.role = role;
      return this.userRepository.save(user);
    }
    throw new Error('User not found');
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
