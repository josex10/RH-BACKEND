import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle("Restaurant Helper API")
    .setVersion("1.0.0 ")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup("/api/docs", app, document);
  
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(3000);
  myFuncion();

}
bootstrap();

function myFuncion() {
  
 let nums = [1, 2, 3, 4];
 let sum = nums.reduce(function(preVal, curVal, curIndex, oriArr){
  return preVal + curVal;
 })

 console.log(sum)
}
