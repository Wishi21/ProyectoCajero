
let cuentas = [
    { nombre: "Daniel Torres", email: "dn.arnul21@gmail.com", password: "12345" ,saldo: 100 },
    { nombre: "Jesus Humberto", email: "jehumoga@gmail.com", password: "123456", saldo: 290 },
    { nombre: "Luis Ramos", email: "luiz-ramoz@gmail.com", password: "123", saldo: 67 }
];

let cuenta

let eventDeposito = document.getElementById('inputDeposito');
eventDeposito.onkeydown = function(e) { 
    return eventSoloNumeros(e)
}

let eventRetiro = document.getElementById('inputRetiro');
eventRetiro.onkeydown = function(e) { 
    return eventSoloNumeros(e)
}

function eventSoloNumeros(e)
{
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8)) {
    return false
    }
}

number.oninput = function () {
    if (number.value > 2000) {
        number.value = 2000
    }
}

function login(){
    const forms = document.getElementById('formLogin')
    if(!forms.checkValidity()){
        return
    }
    let emailInput = document.getElementById('inputEmail')
    let passwordInput = document.getElementById('inputPassword')

    let email = emailInput.value
    let password = passwordInput.value

    let cuenta = cuentas.find((cuenta) => cuenta.email == email && cuenta.password == password)
    
    if(cuenta == null){
        swal("Credenciales incorrectas", "Intentalo de nuevo", "error");
        return
    }

    if(cuenta){
        this.cuenta = cuenta
        toggleElements()
        swal("Bienvenido "+cuenta.nombre, "Seras reedirigido a tu banca en linea", "success")
        .then(() =>{
            emailInput.value = ""
            passwordInput.value = ""
        })
        
    }  
}

function swalRetiroCero(element){
    swal("Error en el retiro", "Ingresa una cantidad mayor a $0", "error")
    .then(() =>{
        element.value = ""
    });
}

function toggleElements(){
    let divLogin = new bootstrap.Collapse(document.getElementById('loginDiv'))
    let divBanca = new bootstrap.Collapse(document.getElementById('bancaDiv'))
    divLogin.toggle()
    divBanca.toggle()
}

function consultarSaldo(){
    swal(this.cuenta.nombre+" tu saldo actual es de ", "$"+this.cuenta.saldo)
}

function ingresarMonto(){
    const forms = document.getElementById('formDepositar')
    if(!forms.checkValidity()){
        return
    }

    let montoInput = document.getElementById('inputDeposito')
    if(montoInput.value == 0){
        swalRetiroCero(montoInput)
        return;
    }
    this.cuenta.saldo+= +montoInput.value

    swal("Deposito realizado con exito", "Se a confirmado tu deposito de $"+montoInput.value, "success")
    .then(() =>{
        montoInput.value = ""
    })
    
}

function retirarMonto(){
    const forms = document.getElementById('formRetirar')
    if(!forms.checkValidity()){
        return
    }
    
    let retiroInput = document.getElementById('inputRetiro')
    if(retiroInput.value == 0){
        swalRetiroCero(retiroInput)
        return;
    }

    if(this.cuenta.saldo - retiroInput.value < 10){
        swal("Error en el retiro", "Saldo restante minimo de $10", "error");
        return
    }

    this.cuenta.saldo-= retiroInput.value 
    swal("Retiro realizado con exito", "Se a confirmado tu retiro de $"+retiroInput.value, "success")
    .then(() =>{
        retiroInput.value = ""
    })
}

function logout(){
    let montoInput = document.getElementById('inputDeposito')
    let retiroInput = document.getElementById('inputRetiro')
    toggleElements()
    swal("Alerta", "Has cerrado tu sesion", "success")
    .then(() =>{
        montoInput.value = ""
        retiroInput.value = ""
    })
}

  