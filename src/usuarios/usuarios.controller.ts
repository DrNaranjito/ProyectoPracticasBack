import { ApiTags } from "@nestjs/swagger"; //Importación de Swagger para que salga como tag Users para más control
import { Controller, Get, Post, Body, Param } from "@nestjs/common";

@ApiTags('Users') // Con esta linea estamos declarando que en nuestro Swagger se va a ver la documentación relacionada con los usuarios como "Users"
@Controller('users')
export class UsersController{

}
