import { BlockService } from './block.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SetBlockDto } from './dto';

@Controller('block')
export class BlockController {
  constructor(private blockService: BlockService) {}

  @Post('setblocks')
  setBlocks(@Body() dto: SetBlockDto) {
    console.log(dto);
    return this.blockService.setBlocks(dto);
  }
}
