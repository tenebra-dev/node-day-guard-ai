import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from './common/dto/api-response.dto';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Boas-vindas à API', 
    description: 'Endpoint que retorna uma mensagem de boas-vindas' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Mensagem retornada com sucesso',
    type: String,
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('info')
  @ApiOperation({ 
    summary: 'Informações da API', 
    description: 'Retorna informações sobre versão e status da API' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Informações retornadas com sucesso',
    type: ApiResponseDto
  })
  getInfo(): ApiResponseDto<{version: string; environment: string}> {
    return new ApiResponseDto({
      success: true,
      statusCode: 200,
      message: 'Informações da API',
      data: {
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      }
    });
  }
}
