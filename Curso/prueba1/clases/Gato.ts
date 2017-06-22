export class Gato{
	nombre:string;
	raza:string;


	constructor(nombre:string, raza:string){
		this.nombre = nombre;
		this.raza = raza;
	}


	saludar(){
		console.log(`Hola soy un gato`);
	}
}