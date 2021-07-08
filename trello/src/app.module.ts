import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { BoardsController } from './boards/boards.controller';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, BoardsController, TasksController],
  providers: [AppService],
})
export class AppModule {}
