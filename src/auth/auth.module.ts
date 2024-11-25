
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import {JwtStrategy} from './jwt.strategy';

@Module({
    imports: [
        UserModule,
        JwtModule.register({ secret: 'ghjjdjdhyyhhdd', signOptions: { expiresIn: '1h' } }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
