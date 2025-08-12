import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ 
    description: 'Nome do usuário', 
    example: 'João Silva',
    minLength: 2 
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    description: 'Email do usuário', 
    example: 'joao@example.com' 
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    description: 'Senha do usuário', 
    example: 'senha123',
    minLength: 6 
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
