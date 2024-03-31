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
    Logger,
} from '@nestjs/common';
import { CreateHandDto, UpdateHandDto, HandResponseDto, HandsResponseDto } from './hands.dto';
import { HandsService } from './hands.service';

@Controller('hands')
export class HandsController {
    private readonly logger = new Logger(HandsController.name);

    constructor(private handService: HandsService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getHands(): Promise<HandsResponseDto> {
        const hands = await this.handService.findAll();
        return { hands };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getHand(@Param('id') id: string): Promise<HandResponseDto> {
        const hand = await this.handService.findOne(id);
        return { hand };        
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createHand(@Body() createHandDto: CreateHandDto): Promise<HandResponseDto> {
        const hand = await this.handService.create(createHandDto);
        return { hand };
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async updateHand(
        @Param('id') id: string,
        @Body() updateHandDto: UpdateHandDto,
    ): Promise<HandResponseDto> {
        const hand = await this.handService.update(id, updateHandDto);
        return { hand };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async removeHand(@Param('id') id: string): Promise<string> {
        const deleteStatus = await this.handService.remove(id);
        return deleteStatus ? 'Hand deleted successfully' : 'Hand not found';
    }
}
