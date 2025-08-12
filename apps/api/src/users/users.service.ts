import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * Serviço de usuários usando injeção de repositório padrão do TypeORM
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  /**
   * Busca todos os usuários
   */
  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  /**
   * Busca todos os usuários ativos
   */
  async findAllActive(): Promise<UserEntity[]> {
    return this.usersRepository.find({ where: { isActive: true } });
  }

  /**
   * Busca um usuário pelo ID
   */
  async findOne(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }
  
  /**
   * Busca um usuário ativo pelo ID
   */
  async findActiveById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id, isActive: true } });
    if (!user) {
      throw new NotFoundException(`Usuário ativo com ID ${id} não encontrado`);
    }
    return user;
  }

  /**
   * Busca um usuário pelo email
   */
  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado`);
    }
    return user;
  }

  /**
   * Cria um novo usuário
   */
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    // Verificar se o email já está em uso
    const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new Error(`Email ${createUserDto.email} já está sendo usado`);
    }
    
    // Criar o usuário
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    
    // Buscar o usuário salvo para garantir que retorne um objeto UserEntity
    return this.findByEmail(createUserDto.email);
  }

  /**
   * Atualiza um usuário existente
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    // Verificar se o usuário existe
    await this.findOne(id);
    
    // Verificar se o email está sendo alterado e se já está em uso
    if (updateUserDto.email) {
      const existingUser = await this.usersRepository.findOne({ where: { email: updateUserDto.email } });
      if (existingUser && existingUser.id !== id) {
        throw new Error(`Email ${updateUserDto.email} já está sendo usado`);
      }
    }
    
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  /**
   * Remove um usuário (deleção física)
   */
  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
  }
  
  /**
   * Desativa um usuário (deleção lógica)
   */
  async deactivate(id: string): Promise<UserEntity> {
    await this.findOne(id);
    await this.usersRepository.update(id, { isActive: false });
    return this.findOne(id);
  }
}
