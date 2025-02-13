import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UpdateUserDto } from './dtos/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    findAll() {
        return this.userRepository.find()
    }

    async findOneById(id: string) {
        return id ? this.userRepository.findOneBy({ id }) : null
    }

    async update(id: string, data: UpdateUserDto) {
        const user = await this.findOneById(id)

        if (!user) {
            throw new NotFoundException()
        }

        Object.assign(user, data)
        return this.userRepository.save(user)
    }

    async remove(id: string) {
        const user = await this.findOneById(id)

        if (!user) {
            throw new NotFoundException()
        }

        return this.userRepository.remove(user)
    }
}
