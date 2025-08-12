import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({ description: 'Status da operação', example: true })
  success: boolean;

  @ApiProperty({ description: 'Código de status HTTP', example: 200 })
  statusCode: number;

  @ApiProperty({ description: 'Mensagem descritiva', example: 'Operação realizada com sucesso' })
  message: string;

  @ApiProperty({ description: 'Dados retornados pela API', example: {}, nullable: true })
  data?: T;

  @ApiProperty({ description: 'Timestamp da resposta', example: '2023-01-01T12:00:00.000Z' })
  timestamp: string;

  constructor(partial: Partial<ApiResponseDto<T>>) {
    Object.assign(this, partial);
    this.timestamp = new Date().toISOString();
  }
}
