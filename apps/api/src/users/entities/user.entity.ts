import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UserEntity {
  @ApiProperty({ description: 'ID único do usuário', example: '1' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nome do usuário', example: 'João Silva' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Email do usuário', example: 'joao@example.com' })
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @ApiProperty({ description: 'Se o usuário está ativo', example: true, default: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Data de criação', example: '2023-01-01T12:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização', example: '2023-01-01T12:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
