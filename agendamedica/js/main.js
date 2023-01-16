let _meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let _dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
let _nextStep;
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


// ------------------ Login ------------------
// tipoIdentificacion & numeroIdentificacion
let tipoIdentificacion = document.querySelector('#tipoIdentificacion');
let numeroIdentificacion = document.querySelector('#numeroIdentificacion');

document.querySelector('#getInto').addEventListener('click', function (e) {
    if (tipoIdentificacion.value == "2") {
        let cedulaValida = validarCedula(numeroIdentificacion.value);
        if (cedulaValida) {
            _nextStep = true;
            numeroIdentificacion.parentElement.classList.remove("invalid");
            numeroIdentificacion.classList.remove('is-invalid');
        } else {
            _nextStep = false;
            // how to style required field validator
            showMsg("error","Número de identificación incorrecto");
            numeroIdentificacion.classList.add('is-invalid');
            // $(this).parent().addClass('inactive');
            // $('#numeroIdentificacion').parent().addClass('invalid');
            // numeroIdentificacion.parentNode.classList.add("invalid");
            numeroIdentificacion.parentElement.classList.add("invalid");
        }
    } else {
        _nextStep = true;
        console.log('PASAPORTE');
    }
});

tipoIdentificacion.addEventListener('change', function () {
    if (this.value == "2") {
        console.log('Es numero de cedula');
        // Ingresar solo 10 numero
        numeroIdentificacion.setAttribute("maxlength", "10");
        numeroIdentificacion.setAttribute("pattern", "[0-9]{0,10}");
        numeroIdentificacion.type = "number";
    } else {
        console.log('Es pasaporte');
        // Ingresar letra y numero
        numeroIdentificacion.removeAttribute("maxlength", "15");
        numeroIdentificacion.removeAttribute("pattern", "[0-9]{0,15}");
        numeroIdentificacion.type = "text";
        // removeAttribute
    }
});

// if (tipoIdentificacion.value == "2") {
//     numeroIdentificacion.addEventListener('keyup', function (e) {
//         let cedulaValida = validarCedula(numeroIdentificacion.value);
//         if (cedulaValida) {
//             numeroIdentificacion.parentElement.classList.remove("invalid");
//             numeroIdentificacion.classList.remove('is-invalid');
//             document.querySelector('#getInto').classList.remove("disabled");
//         } else {
//             numeroIdentificacion.classList.add('is-invalid');
//             numeroIdentificacion.parentElement.classList.add("invalid");
//             document.querySelector('#getInto').classList.add("disabled");
//         }
//     });
// }

// ------------------ Ciudades ------------------
document.querySelector('.btn-location').addEventListener('click', function () {
    if ($('input[name="ciudad"]').is(':checked')) {
        // alert("checked");
        $('#listConvenios').modal('show');
        obtenerConvenios();
        _nextStep = true

    } else {
        showMsg("error","Debe seleccionar una ciudad para continuar");
        _nextStep = false
        // alert("You didn't check it! Let me check it for you.");
    }
});

// ------------------ Modal convenios ------------------
document.querySelector('#next').addEventListener('click', function () {
    _nextStep = true;
    $('#listConvenios').modal('hide');
});

// ------------------ Especialidades ------------------
document.querySelector('.btn-specialties').addEventListener('click', function () {
    if ($('input[name="especialidad"]').is(':checked')) {
        // alert("checked");
        _nextStep = true
    } else {
        showMsg("error","Debe seleccionar una Especialidad para continuar");
        _nextStep = false
        // alert("You didn't check it! Let me check it for you.");
    }
});

// ------------------ Central Medica ------------------
document.querySelector('.btn-medical-center').addEventListener('click', function () {
    if ($('input[name="centralmedica"]').is(':checked')) {
        // alert("checked");
        _nextStep = true
    } else {
        showMsg("error","Debe seleccionar una Central medica para continuar");
        _nextStep = false
        // alert("You didn't check it! Let me check it for you.");
    }
});

// ------------------ Doctor ------------------
document.querySelector('.btn-physician').addEventListener('click', function () {
    if ($('input[name="doctor-hour"]').is(':checked')) {
        // alert("checked");
        _nextStep = true
        separarCita();
    } else {
        showMsg("error","Debe seleccionar un Horario para su cita y poder continuar");
        _nextStep = false
    }
});

// ------------------ Agendar cita ------------------
document.querySelector('.btn-schedule-change').addEventListener('click', function () {
    cancelarCita();
});

// ------------------ Pago ------------------
// tipoIdentificacionFact & numeroIdentificacionFact
let tipoIdentificacionFact = document.querySelector('#tipoIdentificacionFact');
let numeroIdentificacionFact = document.querySelector('#numeroIdentificacionFact');
let telefonoFact = document.querySelector('#telefonoFact');

tipoIdentificacionFact.addEventListener('change', function () {
    jQuery('.nuiRuc_invalid').remove();
    if (this.value == "1") {
        console.log('Es ruc');
        let rucFactValida = validarRuc(numeroIdentificacionFact.value);
        if (rucFactValida) {
            numeroIdentificacionFact.parentElement.classList.remove("invalid");
            numeroIdentificacionFact.classList.remove('is-invalid');
            document.querySelector('#toPayPTP').classList.remove("disabled");
        } else {
            numeroIdentificacionFact.classList.add('is-invalid');
            numeroIdentificacionFact.parentElement.classList.add("invalid");
            document.querySelector('#toPayPTP').classList.add("disabled");
        }
        // input nombre* to Razon social
        const nameLabel = document.querySelector('.name-label');
        nameLabel.innerHTML = "Raz&oacute;n social";
        // Elmentos no ruc
        let elemNoRUC = document.getElementsByClassName('elem-no-ruc');
        for (i = 0; i < elemNoRUC.length; i++) {
            elemNoRUC[i].classList.add('d-none');
        }
        // Input no ruc
        let inputNoRUC = document.getElementsByClassName('input-no-ruc');
        for (i = 0; i < inputNoRUC.length; i++) {
            inputNoRUC[i].removeAttribute('required');
        }
    } else {
        console.log('Es cedula');
        let cedulaFactValida = validarCedula(numeroIdentificacionFact.value);
        if (cedulaFactValida) {
            numeroIdentificacionFact.parentElement.classList.remove("invalid");
            numeroIdentificacionFact.classList.remove('is-invalid');
            document.querySelector('#toPayPTP').classList.remove("disabled");
        } else {
            numeroIdentificacionFact.classList.add('is-invalid');
            numeroIdentificacionFact.parentElement.classList.add("invalid");
            document.querySelector('#toPayPTP').classList.add("disabled");
        }
        // input nombre* to Razon social
        const nameLabel = document.querySelector('.name-label');
        nameLabel.innerHTML = "Nombres";
        // Elmentos no ruc
        let elemNoRUC = document.getElementsByClassName('elem-no-ruc');
        for (i = 0; i < elemNoRUC.length; i++) {
            elemNoRUC[i].classList.remove('d-none');
        }
        // Input no ruc
        let inputNoRUC = document.getElementsByClassName('input-no-ruc');
        for (inputElem = 0; inputElem < inputNoRUC.length; inputElem++) {
            inputNoRUC[inputElem].setAttribute('required',"");
        }
    }
});

numeroIdentificacionFact.addEventListener('keypress', function (e){
	if (!soloNumeros(event)){
  	e.preventDefault();
  }
});

telefonoFact.addEventListener('keypress', function (e){
	if (!soloNumeros(event)){
  	e.preventDefault();
  }
});

jQuery('#formBillingInform').on('change','input, select',function(){
    isCompleteBill();
});

// jQuery('#formBillingInform').on('click','.btn-pago-online, select',function(){
//     jQuery('.btn-pago-online').addClass('disabled');
// });

var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms, 2 seconds for example

//on keyup, start the countdown
jQuery('#formBillingInform').on('keyup','input',function(){
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
jQuery('#formBillingInform').on('keydown','input',function(){
    clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping () {
    isCompleteBill();
}

function isCompleteBill(){
    console.log('isCompleteBill');
    var active_form = true;
    // var espacio_stard_end = /^\s|\s$/
    jQuery.each(jQuery('input, select'), function(){
        var idElem = jQuery(this).attr('id');
        if(jQuery("#"+idElem).is(":visible")){
            var elemIsValid = true;
            switch(idElem){
                case 'terminos':
                    if(!jQuery("#"+idElem).is(':checked')){
                        console.log('1');
                        active_form = false;
                        elemIsValid = false;
                        jQuery("#"+idElem).addClass('is-invalid');
                    }else{
                        jQuery("#"+idElem).removeClass('is-invalid');
                        console.log('2');
                    }
                break;
                case 'tipoIdentificacionFact':
                    if(jQuery("#"+idElem+" option:selected").val() == ''){
                        active_form = false;
                        elemIsValid = false;
                        jQuery("#"+idElem).addClass('is-invalid');
                    }else{
                        jQuery("#"+idElem).removeClass('is-invalid');
                    }
                break;
                case 'numeroIdentificacionFact':
                    // console.log(active_form);
                    var tipoIdentificacionFact = jQuery('#tipoIdentificacionFact').val();
                    if(tipoIdentificacionFact == 1){
                        if(!validarRuc(jQuery("#"+idElem).val())){
                            active_form = false;
                        }
                    }else{
                        if(!validarCedula(jQuery("#"+idElem).val())){
                            active_form = false;
                        }
                    }
                    if(active_form){
                        jQuery("#"+idElem).removeClass('is-invalid');
                    }else{
                        elemIsValid = false;
                        jQuery("#"+idElem).addClass('is-invalid');
                    }
                    console.log(active_form);
                break;
                case "mailFact":
                    console.log("MAIL: "+active_form);
                    if(!validarEmail(jQuery("#"+idElem).val()) || jQuery("#"+idElem).val().trim() == ""){
                        active_form = false;
                        elemIsValid = false;
                        jQuery("#"+idElem).addClass('is-invalid');
                    }else{
                        jQuery("#"+idElem).removeClass('is-invalid');
                    }
                break;
                case 'primerNombreFact':
                    if( jQuery("#"+idElem).val() == "" || jQuery("#"+idElem).val().trim() == "") {
                        // || jQuery("#"+idElem).val().match(espacio_stard_end)
                        // console.log(idElem+"------");
                        active_form = false;
                        elemIsValid = false;
                        jQuery("#"+idElem).addClass('is-invalid');
                    }else{
                        jQuery("#"+idElem).removeClass('is-invalid');
                        jQuery('.msg-field-'+idElem).hide();
                    }
                break;
                case 'primerApellidoFact':
                    if( jQuery("#"+idElem).val() == "" || jQuery("#"+idElem).val().trim() == "") {
                        // || jQuery("#"+idElem).val().match(espacio_stard_end)
                        // console.log(idElem+"------");
                        active_form = false;
                        elemIsValid = false;
                        jQuery("#"+idElem).addClass('is-invalid');
                    }else{
                        jQuery("#"+idElem).removeClass('is-invalid');
                        jQuery('.msg-field-'+idElem).hide();
                    }
                break;
                case 'segundoApellidoFact':
                    if( jQuery("#"+idElem).val() == "" || jQuery("#"+idElem).val().trim() == "") {
                        // || jQuery("#"+idElem).val().match(espacio_stard_end)
                        // console.log(idElem+"------");
                        active_form = false;
                        elemIsValid = false;
                        jQuery("#"+idElem).addClass('is-invalid');
                    }else{
                        jQuery("#"+idElem).removeClass('is-invalid');
                        jQuery('.msg-field-'+idElem).hide();
                    }
                break;
                case 'direccionFact':
                    if( jQuery("#"+idElem).val() == "" || jQuery("#"+idElem).val().trim() == "") {
                        // || jQuery("#"+idElem).val().match(espacio_stard_end)
                        // console.log(idElem+"------");
                        active_form = false;
                        elemIsValid = false;
                        jQuery("#"+idElem).addClass('is-invalid');
                    }else{
                        jQuery("#"+idElem).removeClass('is-invalid');
                        jQuery('.msg-field-'+idElem).hide();
                    }
                break;
                case 'telefonoFact':
                    if( jQuery("#"+idElem).val() == "" || jQuery("#"+idElem).val().trim() == "") {
                        // || jQuery("#"+idElem).val().match(espacio_stard_end)
                        // console.log(idElem+"------");
                        active_form = false;
                        elemIsValid = false;
                        jQuery("#"+idElem).addClass('is-invalid');
                    }else{
                        jQuery("#"+idElem).removeClass('is-invalid');
                        jQuery('.msg-field-'+idElem).hide();
                    }
                break;
                // default:
                //     if( jQuery("#"+idElem).val() == "" || jQuery("#"+idElem).val().trim() == "") {
                //         // || jQuery("#"+idElem).val().match(espacio_stard_end)
                //         // console.log(idElem+"------");
                //         active_form = false;
                //         elemIsValid = false;
                //         jQuery("#"+idElem).addClass('warning_input');
                //     }else{
                //         jQuery("#"+idElem).removeClass('warning_input');
                //         jQuery('.msg-field-'+idElem).hide();
                //     }
                // break;
            }
            if(elemIsValid){
                jQuery(".msg-error-"+idElem).hide();
            }else{
                jQuery(".msg-error-"+idElem).show();
            }
        // console.log(idElem+" - "+active_form+" - "+elemIsValid);
        }
    });
    if(active_form){
        // <?php if(isset($_REQUEST['pasarela']) && $_REQUEST['pasarela'] == "kushki"): ?>
        //     jQuery('#kushki-pay-form').css('pointer-events','auto');
        // <?php else: ?>
        //     jQuery('.btn-pago-online').removeClass('disabled');
        // <?php endif; ?>
        jQuery('#kushki').css('pointer-events','auto');
        document.querySelector('#toPayPTP').classList.remove("disabled");
    }else{
        console.log('Por favor, ingrese los datos solicitados.')
        // <?php if(isset($_REQUEST['pasarela']) && $_REQUEST['pasarela'] == "kushki"): ?>
        //     jQuery('#kushki-pay-form').css('pointer-events','none');
        // <?php else: ?>
        //     jQuery('.btn-pago-online').addClass('disabled');
        // <?php endif; ?>
        jQuery('#kushki').css('pointer-events','none');
        // jQuery('.btn-pago-online').addClass('disabled');
        document.querySelector('#toPayPTP').classList.add("disabled");
    }
}

document.querySelector('#toPayPTP').addEventListener('click', function (e) {
    // console.log('test');
    // console.log(tipoIdentificacionFact.value);
    switch(tipoIdentificacionFact.value){
        case '2'://CEDULA
            // console.log('test-2');
            let esCorrectaCedula = validarCedula(numeroIdentificacionFact.value);
            // console.log(esCorrectaCedula);
            if(esCorrectaCedula){
                document.querySelector('.nuiRuc_invalid').remove();
                // jQuery('.nuiRuc_invalid').remove();
            }else{
                document.querySelector('.nuiRuc_invalid').remove();
                // jQuery('.nuiRuc_invalid').remove();
                numeroIdentificacionFact.append('<div class="nuiRuc_invalid"> Cédula inválida. </div>');
                // jQuery('.numeroIdentificacionFact').append('<div class="nuiRuc_invalid"> Cédula inválida. </div>');
            }
            return esCorrectaCedula;
        break;
        case '1'://RUC
            let esCorrectaRuc = validarRuc(numeroIdentificacionFact.value);
            if(esCorrectaRuc){
                jQuery('.nuiRuc_invalid').remove();
            }else{
                jQuery('.nuiRuc_invalid').remove();
                jQuery('.numeroIdentificacionFact').append('<div class="nuiRuc_invalid"> RUC inválido. </div>');
            }
            return esCorrectaRuc;
        break;
        default:
            return true;
        break;
    }
});

// Select Payment Method
const textPaymentMethod = document.querySelector('.text-paymentMethod');
const buttonPaymetMethod = document.querySelector('#payMeth');
buttonPaymetMethod.addEventListener('click', function (e) {
    selectPaymentToMethod();
    console.log('click');
});

function selectPaymentToMethod() {
    let cardPTP = document.getElementById("PTP");
    let cardKushki = document.getElementById("kushki");
    if (cardPTP.style.display === "block") {
        cardPTP.style.display = "none";
        cardKushki.style.display = "block";
        textPaymentMethod.innerHTML = "Si deseas pagar con <strong>Diners Club</strong> o <strong>Discover</strong>";
    } else {
        if (cardKushki.style.display === "block") {
            cardKushki.style.display = "none";
            cardPTP.style.display = "block";
            textPaymentMethod.innerHTML = "Si desea probar otra forma de pago.";
        }
    }
}

/* ------------------ HELPERS ------------------ */
function showLoader(){
    $('body').css('overflow','hidden');
	$('.body-loader').show();
}

function hideLoader(){
    $('body').css('overflow','auto');
	$('.body-loader').hide();
}

function showMsg(type,msg){
	toastr[type](msg);
}

function pad(n){
	return n<10 ? '0'+n : n
}

function getValueFI(idElem){
	return jQuery("#"+idElem+" option:selected").val();
}

function getAttrFI(idElem,attrName){
	return jQuery("#"+idElem+" option:selected").attr(attrName);
}

function getValueFIByName(nameElem){
	return jQuery('input[name="'+nameElem+'"]:checked').val();
}

// Validar Cedula
function validarCedula(cedula) {
    var cad = cedula.trim();
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;
    if (cad !== "" && longitud === 10) {
        for (i = 0; i < longcheck; i++) {
            if (i % 2 === 0) {
                var aux = cad.charAt(i) * 2;
                if (aux > 9) aux -= 9;
                total += aux;
            } else {
                total += parseInt(cad.charAt(i)); // parseInt o concatenarÃ¡ en lugar de sumar
            }
        }
        total = total % 10 ? 10 - total % 10 : 0;
        if (cad.charAt(longitud - 1) == total) {
            //document.getElementById("salida").innerHTML = ("Cedula VÃ¡lida");
            return true;
        } else {
            //document.getElementById("salida").innerHTML = ("Cedula InvÃ¡lida");
            return false;
        }
    }
    return false;
}

// Validar Ruc
function validarRuc(ruc) {
    var last3 = ruc.substr(ruc.length - 3);
    if (ruc.length == 13 && last3 == "001") {
        return true;
    } else {
        return false;
    }
}

// Validar Email
function validarEmail(email) {
    var EmailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
    return EmailRegex.test(email);
}

// Solo permite introducir numeros.
function soloNumeros(e){
    var key = e.charCode;
    // console.log(key);
    return key >= 48 && key <= 57;
}

// Scroll bottom checkend btn-check
// function scrollBottom() {
    document.querySelectorAll(".btn-check").forEach(el => {
        el.addEventListener('click', function (e) {
            window.scrollTo(0, document.body.scrollHeight);
        });
    });
// }
// Desplazar hasta la parte superior
function scrollTop() {
    document.body.scrollTop = 0;    // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/* ------------------ HELPERS/END ------------------ */

// ------------------ MUlti step ------------------ 
const multiStepForm = document.querySelector("[data-multi-step]");      //  [data-multi-step] is Attribute that"s why here used [] when selecting
const formSteps  = [...multiStepForm.querySelectorAll("[data-step]")]
const navItemSteps  = document.querySelectorAll(".navbar-nav li a.nav-link")
const progressSteps = document.querySelectorAll(".nav-step");

let currentStep = formSteps.findIndex(step =>{
    return step.classList.contains("active")
    // console.log(step.classList.contains("active"))
});

if (currentStep < 0){
    currentStep = 0
}

// function for the Next-Previous button with reportValidity(). 
// i want to make sure that the inputs valid
multiStepForm.addEventListener("click", e =>{
    let incrementor;
    if(e.target.matches("[data-next]")){
        incrementor = 1
    }
    else if(e.target.matches("[data-previous]")){
        incrementor = -1
    }
    if(incrementor == null) return
    const inputs = [...formSteps[currentStep].querySelectorAll("input")]
    const allValid = inputs.every(input=>input.reportValidity())
    console.log(allValid);
    // no lee esta variable
    _nextStep
    console.log('Valor de nextStep: ' +_nextStep);
    if(allValid && _nextStep){
        console.log('Validar los inputs: ' +allValid);
        currentStep +=incrementor
        console.log('currentStep: ' +currentStep);
        // updateProgressbar()
    }
    doActionStep(currentStep);
    console.log('Incremento: ' +incrementor);
    showCurrentStep()
    updateProgressbar()
    
});

formSteps.forEach(step =>{
    step.addEventListener("animationend", (e) =>{
        // remove hide una vez completado la info
        formSteps[currentStep].classList.remove("hide")
        // console.log('datos selecionado y completado');

        // agrega y quita el hide[adelante] cuando click data-previous atras linea clave 
        e.target.classList.toggle("hide", e.target.classList.contains("active"))
    })
});

// hide and show the current step by toggleing the class "active"
function showCurrentStep(){
    formSteps.forEach((step,index) =>{
        // console.log('------------------------------ data-step -----------------------------------');
        // console.log('data-step' +step);
        step.classList.toggle ("active", index===currentStep)
        // console.log('Index ' +index);

        // navItemSteps.classList.toggle ("active", index===currentStep)
        // navItemSteps[currentStep].classList.add("active");

        if (index === currentStep){
            // click btn con data-next
            step.classList.remove("hide")
            // console.log('click btn data-next');
        }

        // if (index != currentStep) {
        //     navItemSteps[currentStep].classList.remove("active");
        // }
    });
}

function updateProgressbar() {
    progressSteps.forEach((progressStep, idx) => {
        // console.log('------------------------------ nav link -----------------------------------');
        // console.log('progressStep ' +progressStep);
        // console.log('Index nav-link ' +idx);
        if (idx < currentStep) {    // idx < currentStep + 1
            // progressStep.classList.add("active");

            // console.log('INDEX ES MENOR A CURRENTSTEP');
            progressStep.classList.add("done");
        } else {
            // progressStep.classList.remove("active");

            // console.log('REGR5ESO ATRAS');
            progressStep.classList.remove("done");
        }

        progressStep.classList.toggle ("active", idx===currentStep)
        // if (idx === currentStep) {
        //     progressStep.classList.remove("hide")
        // }
        
    });
  
    // const progressActive = document.querySelectorAll(".progress-step-active");
  
    // progress.style.width =
    //   ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

function doActionStep(currentStep) {
    switch (currentStep) {
        case 1:
            console.log('Tipo y numero de indetificacion fuero ingresado....');
            obtenerUsuario();
            console.log('Obtener todas las ciudades disponibles....');
            obtenerCiudad();
        break;
        case 2:
            console.log('ha eligido una ciudad');
            obtenerEspecialidad();
        break;
        case 3:
            console.log('ha eligido una especialidad');
            console.log('Obtener todas las centrales medicas....');
            obtenerCentroMedico();
        break;
        case 4:
            console.log('ha eligido un centro medico');
            obtenerFechasDisponibles();
        break;
        case 5:
            console.log('ha Seleccionado fecha y doctor');
            mostrarInfoCita();
        break;
        case 6:
            console.log('Su cita fue agenada con exito.');
            confirmarCita();
            // isCompleteBill();
        break;
    }
}

// ------------------ Flujo ------------------
// Step Login
function obtenerUsuario() {
    let setNumeroIdentificacion = true;
    // console.log('--------- validar cedula: obtenerUsuario ---------');
    // console.log(numeroIdentificacion.value);
    if (getValueFI('tipoIdentificacion') == "2" ) {
        setNumeroIdentificacion = validarCedula(numeroIdentificacion.value);
        // console.log('Validar cedula: ' +setNumeroIdentificacion);
        // console.log('numero identificacion: ' +numeroIdentificacion.value);
    }
    // console.log('--------- validar cedula ---------');

    if (setNumeroIdentificacion) {
        // scrollTop();
        _nextStep = true;
        console.log(_nextStep);
    } else {
        showMsg("error","Número de identificación incorrecto");
        // toastr["error"]('Número de identificación incorrecto');
        _nextStep = false;
        console.log(_nextStep);
    }
}

// Step Ciudad
function obtenerCiudad() {
    console.log('obtenerCiudad');
}

function obtenerConvenios() {
    console.log('obtenerConvenios');
}

// Step Especialidad
function obtenerEspecialidad() {
    scrollTop();
    console.log('obtenerEspecialidad');
}

// Step Centro medico
function obtenerCentroMedico() {
    scrollTop();
}

// Step Fecha y hora
function obtenerFechasDisponibles() {
    scrollTop();
    console.log('carga todas las fechas disponibles');
}

function setCalendar() {
    
}

function obtenerDisponibilidad() {
    
}

function separarCita() {
    console.log('Separar la cita medica [pre-reserva]');
}

// ----------------------
function cancelarCita() {
    console.log('Eliminar citas: click btn cambiar');
}
function valorizarCita() {
    console.log('Obtener valorizacion');
}
// ----------------------

// Step Agendar cita

function mostrarInfoCita() {
    scrollTop();
    console.log('Obtener información de la cita');
}

function confirmarCita() {
    scrollTop();
    console.log('Cita confirmada con éxito...');
    setTimeout(() => {
        console.log("Delayed for 1 second.");
        cargarDetalle();
    }, "1500");
    document.querySelector('.text-cita-agendada').innerHTML = '<p class="fw-600 fs-5 mb-0">Miguel. <br> ¡Nos vemos pronto!</p>';
}
// obtener detalle de pago formulario
function cargarDetalle() {
    isCompleteBill();
}