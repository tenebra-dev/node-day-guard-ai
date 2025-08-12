import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Criar a aplicação com buffer de logs
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  
  // Configurar logger
  app.useLogger(app.get(Logger));
  
  // Obter configuração
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port', 3000);
  const nodeEnv = configService.get<string>('app.nodeEnv', 'development');
  const corsConfig = configService.get('app.cors');
  
  // Configurar pipes globais para validação
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    stopAtFirstError: true,
  }));
  
  // Configurar prefixo global para APIs
  app.setGlobalPrefix('api');
  
  // Configurar versionamento de API
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  
  // Configurar CORS
  if (corsConfig.enabled) {
    app.enableCors({
      origin: corsConfig.origin,
      credentials: true,
    });
  }
  
  // Configurar Swagger apenas em ambientes não produtivos
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Day Guard API')
      .setDescription('API para a aplicação Day Guard - Sistema de monitoramento e controle diário')
      .setVersion('1.0')
      .addTag('health', 'Endpoints de verificação de saúde da aplicação')
      .addTag('auth', 'Autenticação e gerenciamento de tokens')
      .addTag('users', 'Gerenciamento de usuários')
      .addServer(`http://localhost:${port}`, 'Servidor Local')
      .addBearerAuth(
        { 
          type: 'http', 
          scheme: 'bearer', 
          bearerFormat: 'JWT',
          description: 'Informe o token JWT',
          in: 'header'
        },
        'JWT-auth'
      )
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
      ignoreGlobalPrefix: false,
    });
    SwaggerModule.setup('docs', app, document, {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'none',
        filter: true,
      }
    });
  }

  // Iniciar servidor
  await app.listen(port);
  const logger = app.get(Logger);
  logger.log(`Aplicação iniciada na porta ${port} em ambiente ${nodeEnv}`);
}

// Gerenciar término gracioso da aplicação
process.on('SIGINT', async () => {
  console.log('Encerrando aplicação graciosamente...');
  process.exit(0);
});

bootstrap();
