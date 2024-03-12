window.addEventListener('load', () => {
    const form = document.querySelector('#formulario')
    const usuario = document.getElementById('usuario')
    const email = document.getElementById('email')
    const pass = document.getElementById('pass')
    const registrado= document.getElementById('modalEmail')

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        validaCampos();

    })

    const validaCampos = () => {
        //capturar los valores ingresados por el usuario
        const usuarioValor = usuario.value.trim()
        const emailValor = email.value.trim()
        const passValor = pass.value.trim()


        //validando campo usuario
        if (usuarioValor === "") {
            //console.log('CAMPO VACIO')
            validaFalla(usuario, 'Por favor, complete este campo.')
        } else {
            validaOk(usuario)
        }

        //validando campo email
        if (emailValor === "") {
            validaFalla(email, 'Por favor, complete este campo.')
        } else if (!validaEmail(emailValor)) {
            validaFalla(email, 'El e-mail no es válido')
        } else {
            validaOk(email)
        }
        //validando campo password      
        if (passValor === "") {
            validaFalla(pass, 'Por favor, complete este campo.')
        } else if (passValor.length < 8) {
            validaFalla(pass, 'Debe tener 8 caracteres cómo mínimo.')
        } else {
            validaOk(pass)
            alert('Gracias por registrarte')
            form.reset();

        }

    }

    const validaFalla = (input, msje) => {
        const formControl = input.parentElement
        const aviso = formControl.querySelector('p')
        aviso.innerText = msje

        formControl.className = 'form-control falla'
    }
    const validaOk = (input,) => {
        const formControl = input.parentElement
        formControl.className = 'form-control ok'
    }

    const validaEmail = (email) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }


})