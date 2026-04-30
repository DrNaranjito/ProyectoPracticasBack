import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger" //Importación de las librerias Swagger-UI
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const options = new DocumentBuilder()

    //stremas
    .setTitle('Gatos')
    .setDescription('Esta es la descripcion')
    .setVersion('1.0')
    .addBearerAuth()
    .build();  //.Collect(collectors.)


  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/docs', app, document); //

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
