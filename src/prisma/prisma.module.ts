import { Module } from '@nestjs/common';
import { PrimaService } from './prisma.service';

@Module({
  providers: [PrimaService],
  exports: [PrimaService],
})
export class PrismaModule {}
