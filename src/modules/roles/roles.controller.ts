import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common'
import { Role } from 'entities/role.entity'


import { CreateUpdateRoleDto } from './dto/create-update-role.dto'
import { RolesService } from './roles.service'
import { PeginatedResult } from 'interfaces/peginated-result.interface'

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) { }
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Role[]> {
        return this.rolesService.findAll(['permissions'])
    }

    @Get('/paginated')
    @HttpCode(HttpStatus.OK)
    async pagineted(@Query('page') page: number): Promise<PeginatedResult> {
        return this.rolesService.paginate(page, ['permissions'])
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<Role> {
        return this.rolesService.findById(id, ['permissions'])
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createRoleDto: CreateUpdateRoleDto, @Body('permissions') permissionsIds: string[]): Promise<Role> {
        return this.rolesService.create(
            createRoleDto,
            permissionsIds.map((id) => ({
                id,
            })),
        )
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateRoleDto: CreateUpdateRoleDto, @Body('permissions') permissionsIds: string[]): Promise<Role> {
        return this.rolesService.update(
            id,
            updateRoleDto,
            permissionsIds.map((id) => ({
                id,
            })),
        )
    }


    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<Role> {
        return this.rolesService.remove(id)
    }
}
