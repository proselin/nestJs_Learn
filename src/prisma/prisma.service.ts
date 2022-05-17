import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { env } from 'process';


// using when class have something on contructor and using or call it on code 
@Injectable()
export class PrismaService extends PrismaClient {
    constructor(private config: ConfigService) {
        super(
            {
             datasources: {
                    db: {
                        /* In express can use  
                        *  process.env.DATABASE_URL
                        *  Because it have dotenv packet
                        */
                        url: config.get('DATABASE_URL')
                    }
                }
            }
        )
        console.log( config.get('DATABASE_URL'));
        
    }
}
