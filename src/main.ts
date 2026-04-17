import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger" //Importación de las librerias Swagger-UI

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const options = new DocumentBuilder()

  //Persona javi  = new Persona();

  //stremas
  .setTitle('Products')
  .setDescription('Esta es la descripcion')
  .setVersion('1.0')
  .addTag('Products')
  .build();  //.Collect(collectors.)
  

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/docs' , app , document); //


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
