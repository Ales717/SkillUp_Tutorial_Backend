import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { PeginatedResult } from 'interfaces/peginated-result.interface';
import { User } from 'entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { isFileExtensionSafe, removeFile, saveImageToStorage } from 'helpers/imageStorage';
import { join } from 'path';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly userService: UsersService) {

    }
    @ApiCreatedResponse({ description: 'List of users.' })
    @ApiBadRequestResponse({ description: 'Error for list of users.' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query('page') page: number): Promise<PeginatedResult> {
        return this.userService.paginate(page, ['role'])
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findById(id)
    }

    @ApiCreatedResponse({ description: 'Creates new user.' })
    @ApiBadRequestResponse({ description: 'Error for creting a new user.' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto)
    }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('avatar', saveImageToStorage))
    @HttpCode(HttpStatus.CREATED)
    async upload(@UploadedFile() file: Express.Multer.File, @Param('id') id: string): Promise<User> {
        const filename = file?.filename
        if (!filename) throw new BadRequestException('File must be png, jpg/jpeg.')

        const imagesFolderPath = join(process.cwd(), 'files')
        const fullImagePath = join(imagesFolderPath + '/' + file.filename)
        if (await isFileExtensionSafe(fullImagePath)) {
            return this.userService.updateUserImageId(id, filename)
        }
        removeFile(fullImagePath)
        throw new BadRequestException('File content does not mathc extesion.')
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.update(id, updateUserDto)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<User> {
        return this.userService.remove(id)
    }
}

