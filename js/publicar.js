
// PUBLICAR OBJETOS


document.addEventListener("DOMContentLoaded", function () {

    const usuario = obtenerSesion();

    // Si no hay sesión, regresar al login
    if (!usuario) {

        window.location.href = "login.html";

        return;
    }


    const formulario =
        document.getElementById("formPublicar");


    formulario.addEventListener("submit", function (event) {

        event.preventDefault();


        const nombre =
            document.getElementById("nombreObjeto").value.trim();

        const categoria =
            document.getElementById("categoria").value;

        const descripcion =
            document.getElementById("descripcion").value.trim();

        const ubicacion =
            document.getElementById("ubicacion").value.trim();

        const fecha =
            document.getElementById("fecha").value;

        const estado =
            document.getElementById("estado").value;


        const mensaje =
            document.getElementById("mensaje");


        // Validaciones

        if (
            !nombre ||
            !categoria ||
            !descripcion ||
            !ubicacion ||
            !fecha ||
            !estado
        ) {

            mensaje.className =
                "alert alert-danger";

            mensaje.textContent =
                "Todos los campos son obligatorios.";

            return;
        }


        // Obtener objetos existentes

        let objetos =
            JSON.parse(localStorage.getItem("objetos")) || [];


        // Crear objeto

        const nuevoObjeto = {

            id: Date.now(),

            nombre: nombre,

            categoria: categoria,

            descripcion: descripcion,

            ubicacion: ubicacion,

            fecha: fecha,

            estado: estado,

            usuarioId: usuario.id,

            usuarioNombre:
                usuario.nombre + " " + usuario.apellido,

            fechaRegistro:
                new Date().toLocaleString()

        };


        // Guardar

        objetos.push(nuevoObjeto);


        localStorage.setItem(
            "objetos",
            JSON.stringify(objetos)
        );


        // Mensaje

        mensaje.className =
            "alert alert-success";

        mensaje.textContent =
            "¡Objeto registrado correctamente!";


        formulario.reset();

    });

});