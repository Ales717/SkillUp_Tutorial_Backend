import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Permission } from 'entities/permisson.entity'
import { AbstractService } from 'modules/common/abstract.service'
import { Repository } from 'typeorm'
import { CreatePermissionDto } from './dto/create-permission.dto'
import Logging from 'library/Logging'

@Injectable()
export class PermissionsService extends AbstractService {
    constructor(@InjectRepository(Permission) private readonly permissionsRepository: Repository<Permission>) {
        super(permissionsRepository)
    }

    async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
        try {
            const permission = this.permissionsRepository.create(createPermissionDto)
            return this.permissionsRepository.save(permission)
        } catch (error) {
            Logging.error(error)
            new BadRequestException('Something went wrong whilee creating a new permission.')
        }
    }
}
