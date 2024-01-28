import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { SetBlockDto } from './dto';
import * as dayjs from 'dayjs';

@Injectable()
export class BlockService {
  constructor(private prisma: PrismaService) {}

  async setBlocks(dto: SetBlockDto) {
    const taskBlocks = [];
    let addedBlocks = [];

    let today = new Date().toJSON();

    today = today.split('T')[0];

    try {
      const user = await this.prisma.user.findUnique({
        where: { id: dto.user_id },
      });

      const wake_time = user.waketime;

      const wakeTime = dayjs(wake_time);

      const startTime = dayjs(new Date(dto.start_time));
      const endTime = dayjs(new Date(dto.end_time));
      const startBlock = Math.trunc(startTime.diff(wakeTime, 'minute') / 10);

      const endBlock =
        endTime.diff(wakeTime, 'minute') / 10 >
        Math.trunc(endTime.diff(wakeTime, 'minute') / 10)
          ? Math.trunc(endTime.diff(wakeTime, 'minute') / 10)
          : Math.trunc(endTime.diff(wakeTime, 'minute') / 10) - 1;

      for (let i = startBlock; i <= endBlock; i++) {
        taskBlocks.push(i);
      }

      const task = await this.prisma.task.create({
        data: {
          title: dto.title,
          description: dto.description,
          userId: dto.user_id,
        },
      });

      const taskId = task.id;
      taskBlocks.map(async (e) => {
        await this.prisma.block.create({
          data: {
            date: today,
            blockindex: e,
            taskId,
            userId: dto.user_id,
            is_productive: dto.is_productive,
          },
        });

        addedBlocks = [...addedBlocks, e];
      });
      return { success: true, blocks: taskBlocks };
    } catch (err) {
      console.log(err);
    }
  }
}
