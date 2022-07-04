import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LevelingModule } from './app/routes/leveling/leveling.module';

@Module({
  imports: [LevelingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
