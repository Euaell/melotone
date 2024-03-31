import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { CreateHandDto, UpdateHandDto, HandResponseDto, HandsResponseDto } from './hands.dto';
import { HandsService } from './hands.service';

@Controller('hands')
export class HandsController {

    constructor(private handService: HandsService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getHands(): HandsResponseDto {
        const hands = this.handService.findAll();
        return { hands };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getHand(@Param('id') id: string): HandResponseDto {
        const hand = this.handService.findOne(id);
        return { hand };        
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createHand(@Body() createHandDto: CreateHandDto): HandResponseDto {
        const hand = this.handService.create(createHandDto);
        return { hand };
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    updateHand(
        @Param('id') id: string,
        @Body() updateHandDto: UpdateHandDto,
    ): HandResponseDto {
        const hand = this.handService.update(id, updateHandDto);
        return { hand };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeHand(@Param('id') id: string): string {
        const deleteStatus = this.handService.remove(id);
        return deleteStatus ? 'Hand deleted successfully' : 'Hand not found';
    }
}
