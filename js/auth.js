

// INICIALIZAR USUARIOS


function inicializarUsuarios() {

    let usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];


    // Crear administrador de prueba

    const existeAdmin = usuarios.some(
        usuario => usuario.carnet === "ADMIN001"
    );


    if (!existeAdmin) {

        usuarios.push({

            id: Date.now(),

            nombre: "Administrador",

            apellido: "UDB",

            carnet: "ADMIN001",

            carrera: "Administración del Sistema",

            correo: "admin@udb.edu.sv",

            password: "Admin123",

            rol: "admin"

        });


        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

    }

}


// ==========================================
// REGISTRAR USUARIO
// ==========================================

function registrarUsuario(
    nombre,
    apellido,
    carnet,
    carrera,
    correo,
    password
) {

    let usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];


    // Comprobar carnet existente

   const existeCarnet = usuarios.some(
    usuario =>
        String(usuario.carnet || "").toLowerCase() ===
        carnet.toLowerCase()
    );


    if (existeCarnet) {

        return {

            correcto: false,

            mensaje:
                "Este carnet estudiantil ya está registrado."

        };

    }


    // Comprobar correo existente

   const existeCorreo = usuarios.some(
    usuario =>
        String(usuario.correo || "").toLowerCase() ===
        correo.toLowerCase()
    );


    if (existeCorreo) {

        return {

            correcto: false,

            mensaje:
                "Este correo ya está registrado."

        };

    }


    // Crear usuario

    const nuevoUsuario = {

        id: Date.now(),

        nombre: nombre,

        apellido: apellido,

        carnet: carnet,

        carrera: carrera,

        correo: correo.toLowerCase(),

        password: password,

        rol: "usuario"

    };


    usuarios.push(nuevoUsuario);


    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );


    return {

        correcto: true,

        mensaje:
            "Usuario registrado correctamente."

    };

}



// INICIAR SESIÓN


function iniciarSesion(
    carnet,
    correo,
    password
) {

    const usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];


    const usuario = usuarios.find(

        usuario =>

            String(usuario.carnet || "")
                .trim()
                .toLowerCase() ===
            carnet.trim().toLowerCase()

            &&

            String(usuario.correo || "")
                .trim()
                .toLowerCase() ===
            correo.trim().toLowerCase()

            &&

            usuario.password === password

    );


    if (!usuario) {

        return {

            correcto: false,

            mensaje:
                "El correo, carnet o contraseña son incorrectos."

        };

    }


   
    // GUARDAR SESIÓN
    

    localStorage.setItem(
        "sesionActual",
        JSON.stringify(usuario)
    );


    return {

        correcto: true,

        usuario: usuario

    };

}


    // Guardar sesión

    localStorage.setItem(
        "sesionActual",
        JSON.stringify(usuario)
    );


    return {

        correcto: true,

        usuario: usuario

    };




// ==========================================
// OBTENER SESIÓN
// ==========================================

function obtenerSesion() {

    return JSON.parse(
        localStorage.getItem("sesionActual")
    );

}


// ==========================================
// CERRAR SESIÓN
// ==========================================

function cerrarSesion() {

    localStorage.removeItem(
        "sesionActual"
    );


    window.location.href =
        "login.html";

}


// ==========================================
// PROTEGER PÁGINAS
// ==========================================

function protegerPagina() {

    const usuario =
        obtenerSesion();


    if (!usuario) {

        window.location.href =
            "login.html";

        return null;

    }


    return usuario;

}


// ==========================================
// PROTEGER ADMINISTRADOR
// ==========================================

function protegerAdmin() {

    const usuario =
        obtenerSesion();


    if (!usuario) {

        window.location.href =
            "login.html";

        return;

    }


    if (usuario.rol !== "admin") {

        alert(
            "No tienes permisos para acceder a esta página."
        );


        window.location.href =
            "dashboard.html";

    }

}


// ==========================================
// INICIALIZAR
// ==========================================

inicializarUsuarios();