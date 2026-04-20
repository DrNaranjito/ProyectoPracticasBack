export class crearUsuariosDto{
    mail! : string;
    name! : string
    password! :  string;
    role! : 'registrado' | 'sinRegistrar' | 'Admin';
    language! : 'Español' | 'Inglés';
}

//Con esta clase me aseguro de que el usuario