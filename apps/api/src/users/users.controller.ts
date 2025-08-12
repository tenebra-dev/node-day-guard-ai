import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar usuário', description: 'Cria um novo usuário no sistema' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso', type: UserEntity })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar usuários', description: 'Obtém a lista de todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso', type: [UserEntity] })
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }
  
  @Get('active')
  @ApiOperation({ summary: 'Listar usuários ativos', description: 'Obtém a lista de todos os usuários ativos' })
  @ApiResponse({ status: 200, description: 'Lista de usuários ativos retornada com sucesso', type: [UserEntity] })
  findAllActive(): Promise<UserEntity[]> {
    return this.usersService.findAllActive();
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Obter usuário por email', description: 'Obtém um usuário pelo email' })
  @ApiParam({ name: 'email', description: 'Email do usuário', example: 'usuario@example.com' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado', type: UserEntity })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findByEmail(@Param('email') email: string): Promise<UserEntity> {
    return this.usersService.findByEmail(email);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter usuário', description: 'Obtém um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado', type: UserEntity })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }
  
  @Get(':id/active')
  @ApiOperation({ summary: 'Obter usuário ativo', description: 'Obtém um usuário ativo pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 200, description: 'Usuário ativo encontrado', type: UserEntity })
  @ApiResponse({ status: 404, description: 'Usuário ativo não encontrado' })
  findActiveById(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findActiveById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar usuário', description: 'Atualiza os dados de um usuário existente' })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso', type: UserEntity })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover usuário', description: 'Remove um usuário do sistema (deleção física)' })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
  
  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Desativar usuário', description: 'Desativa um usuário (deleção lógica)' })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 200, description: 'Usuário desativado com sucesso', type: UserEntity })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  deactivate(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.deactivate(id);
  }
}
