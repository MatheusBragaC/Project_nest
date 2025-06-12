import { forwardRef, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
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
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'meghan94@ethereal.email',
          pass: 'WQz1tyVNVsB3tM6XK4',
        },
      },
      defaults: {
        from: '"nest-modules" <meghan94@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
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
        configService.get(
          'APP_USR-4212527076103591-022114-c47f6f3fac8950949d6d85e37ff0f7aa-1723802760',
        ),
      inject: [ConfigService],
    },
  ],
  exports: [AppService],
})
export class AppModule {}
