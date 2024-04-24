import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([]), CqrsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ImageModule {}
