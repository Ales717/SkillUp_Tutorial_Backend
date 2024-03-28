import { BadRequestException, InternalServerErrorException } from "@nestjs/common"
import Logging from "library/Logging"
import * as bcrypt from 'bcrypt'
import { getHashes } from "crypto"

export const hash = async (data: string, salt = 10): Promise<string> => {
    try {
        const generateSalt = await bcrypt.genSalt(salt)
        return bcrypt.hash(data, generateSalt)
    } catch (error) {
        Logging.error(error)
        throw new InternalServerErrorException('Something went wrong while hasing the password.')
    }
}

export const compareHash = async (data: string | Buffer, encrypetedData: string): Promise<boolean> => {
    try {
        return bcrypt.compare(data, encrypetedData)
    } catch (error) {
        Logging.error(error)
        throw new InternalServerErrorException('Something went wrong while comparing hash.')
    }
}