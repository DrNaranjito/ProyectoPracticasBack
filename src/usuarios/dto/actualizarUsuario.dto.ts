export class actualizarUsuariosDto{
    mail? : string;
    name? : string
    password? :  string;
    role? : 'registrado' | 'sinRegistrar' | 'Admin';
    language? : 'Español' | 'Inglés';
}

//En esta clase se pone el interrogante en vez de la exclamación ya que poner el dato o no es opcionalW