//Gym Web
//Declaracion de Funciones
const registroClientes = [];
class Cliente{
    constructor(usuario, password,nombre, apellido,dni, email, edad, actividad){
        this.usuario=usuario;
        this.password=password;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
        this.edad = edad;
        this.actividad = actividad;
    }
}
document.querySelector("#form-registro").addEventListener("submit", envioRegistro);
function envioRegistro(e){
    e.preventDefault();
    const formUsuario = document.querySelector("#usuario").value;
    const formPassword = document.querySelector("#password").value;
    const formNombre = document.querySelector("#nombre").value;
    const formApellido = document.querySelector("#apellido").value;
    const formDNI = document.querySelector("#dni").value;
    const formEmail = document.querySelector("#email").value;
    const formEdad = document.querySelector("#edad").value;
    const formActividad = document.querySelector("#formActividades").value;
    const cliente = new Cliente(formUsuario,formPassword,formNombre,formApellido,formDNI,formEmail,formEdad,formActividad);
    registroClientes.push(cliente);
    localStorage.setItem("registroClientes", JSON.stringify(registroClientes));
    document.querySelector("#divRegistro").style.display = "none";
    alert('Registro Exitoso!')

}


function abrirMenu(menu){
    if(menu == "divIngresar"){
        document.querySelector("#divIngresar").style.display = "block";
        document.querySelector("#divRegistro").style.display = "none";
    } else if (menu == "divRegistro"){
        document.querySelector("#divRegistro").style.display = "block";
        document.querySelector("#divIngresar").style.display = "none";
    } 
}
// Evento click nuevo usuario/cliente
document.querySelector("#btnIngresar").addEventListener("click", () => abrirMenu("divIngresar") );
// Evento click buscar usuario/cliente
document.querySelector("#btnRegistrarse").addEventListener("click", () => abrirMenu("divRegistro"));

document.querySelector("#form-ingresar").addEventListener("submit", envioIngresar);
function envioIngresar(e){
    e.preventDefault(); 
    const formUser = document.querySelector("#usuario").value;
    const formPass = document.querySelector("#password").value;
    validarUsuario(formUser,formPass)
}

function validarUsuario(busquedaUsuario,contrasenia){
    const arrayFiltrado = JSON.parse(localStorage.getItem("registroClientes"));
    let resultadoBuscar = arrayFiltrado.find(objeto => objeto.usuario === busquedaUsuario && objeto.password === contrasenia);
    let textoAcceso;
    if (resultadoBuscar){
        document.querySelector("#registro-botones").style.display = "none";
        document.querySelector("#divIngresar").style.display = "none";
        textoAcceso = `<h2>Bienvenido ${resultadoBuscar.usuario}</h2>`;
        console.log(textoAcceso)
    }else{
        Swal.fire({
            title: 'Error!',
            text: 'El Usuario y/o Contraseña es Incorecto\nIntente Nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
        textoAcceso=''
    }
    document.querySelector("#textoDeAcceso").innerHTML = textoAcceso;
}

console.log(registroClientes);