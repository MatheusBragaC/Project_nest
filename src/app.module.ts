import { forwardRef, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { PixService } from './pix/pix.service';
import { PixController } from './pix/pix.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot(),
  ],
  controllers: [AppController, PixController],
  providers: [
    AppService,
    PixService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: 'MERCADO_PAGO_ACCESS_TOKEN',
      useFactory: (configService: ConfigService) =>
        configService.get('MERCADO_PAGO_ACCESS_TOKEN'),
      inject: [ConfigService],
    },
  ],
  exports: [AppService],
})
export class AppModule {}
