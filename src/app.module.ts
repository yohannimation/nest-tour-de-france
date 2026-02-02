import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StagesModule } from './module/stages/stages.module';

@Module({
  imports: [StagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
