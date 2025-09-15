// ===============================
// 1. CONSTANTES APP
// ===============================
const APP_NOMBRE = "AnimWorld";
const APP_VERSION = "1.0";
const ANIO = 2025;

// ===============================
// 2. VARIABLES con let
// ===============================
let contadorVisitas = 0;
let usuarioActivo = "Invitado";
let esMovil = /Mobi|Android/i.test(navigator.userAgent);

// ===============================
// 3. FUNCIONES sumar() y multiplicar()
// ===============================
function sumar(a, b) {
  return a + b;
}

function multiplicar(a, b) {
  return a * b;
}

// ===============================
// 4. Mensaje de bienvenida en #salida
// ===============================
function mostrarBienvenida() {
  const salida = document.getElementById("salida");
  if (salida) {
    salida.textContent = `¡Bienvenido/a ${usuarioActivo} a ${APP_NOMBRE} versión ${APP_VERSION} (${ANIO})!`;
  }
}

// ===============================
// 5. Botón contador de visitas en #totalVisitas
// ===============================
function manejarVisitas() {
  const btnVisitas = document.getElementById("btnVisitas");
  const totalVisitas = document.getElementById("totalVisitas");
  if (btnVisitas && totalVisitas) {
    // Si hay en LocalStorage, cargarlo
    contadorVisitas = parseInt(localStorage.getItem("contadorVisitas")) || 0;
    totalVisitas.textContent = contadorVisitas;

    btnVisitas.addEventListener("click", () => {
      contadorVisitas++;
      totalVisitas.textContent = contadorVisitas;
      localStorage.setItem("contadorVisitas", contadorVisitas);
    });
  }
}

// ===============================
// 6. Función mostrarHora() con reloj en header
// ===============================
function mostrarHora() {
  const horaEl = document.getElementById("hora");
  if (!horaEl) return;
  setInterval(() => {
    const ahora = new Date();
    horaEl.textContent = ahora.toLocaleTimeString();
  }, 1000);
}

// ===============================
// 7. Navegación activa usando data-page y clase activo
// ===============================
function activarNavegacion() {
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    if (link.dataset.page === document.body.dataset.page) {
      link.classList.add("activo");
    }
  });
}


function prepararCambioColor() {
  const btnRojo = document.getElementById("btnRojo");
  const btnVerde = document.getElementById("btnVerde");
  const btnAzul = document.getElementById("btnAzul");

  if (btnRojo) btnRojo.addEventListener("click", () => cambiarColor("rojo"));
  if (btnVerde) btnVerde.addEventListener("click", () => cambiarColor("verde"));
  if (btnAzul) btnAzul.addEventListener("click", () => cambiarColor("azul"));
}

function cambiarColor(color) {
  document.body.classList.remove("rojo", "verde", "azul");
  document.body.classList.add(color);
}

function prepararNotas() {
  const btnAgregarNota = document.getElementById("btnAgregarNota");
  const inputNota = document.getElementById("inputNota");
  const listaNotas = document.getElementById("listaNotas");

  if (btnAgregarNota && inputNota && listaNotas) {
    btnAgregarNota.addEventListener("click", () => {
      const nota = inputNota.value.trim();
      if (nota === "") {
        inputNota.classList.add("error");
        return;
      }
      inputNota.classList.remove("error");

      const li = document.createElement("li");
      li.textContent = nota;
      listaNotas.appendChild(li);
      inputNota.value = "";
    });
  }
}

function validarFormulario() {
  const form = document.getElementById("formContacto");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valido = true;

    const campos = form.querySelectorAll("[required]");
    campos.forEach((campo) => {
      const errorSpan = campo.nextElementSibling;
      if (campo.value.trim() === "") {
        campo.classList.add("error");
        if (errorSpan && errorSpan.classList.contains("mensaje-error")) {
          errorSpan.style.display = "block";
        }
        valido = false;
      } else {
        campo.classList.remove("error");
        if (errorSpan && errorSpan.classList.contains("mensaje-error")) {
          errorSpan.style.display = "none";
        }
      }
    });

    if (valido) {
      alert("Formulario enviado con éxito ✅");
      form.reset();
    }
  });
}


function prepararBuscador() {
  const inputBuscar = document.getElementById("buscarServicio");
  const listaServicios = document.getElementById("listaServicios");
  if (inputBuscar && listaServicios) {
    inputBuscar.addEventListener("input", () => {
      const filtro = inputBuscar.value.toLowerCase();
      listaServicios.querySelectorAll("li").forEach((item) => {
        item.style.display = item.textContent.toLowerCase().includes(filtro)
          ? "block"
          : "none";
      });
    });
  }
}


function evaluarNumero(n) {
  if (n > 0) return "positivo";
  else if (n < 0) return "negativo";
  else return "cero";
}


function obtenerDia(numero) {
  switch (numero) {
    case 1: return "Lunes";
    case 2: return "Martes";
    case 3: return "Miércoles";
    case 4: return "Jueves";
    case 5: return "Viernes";
    case 6: return "Sábado";
    case 7: return "Domingo";
    default: return "Número no válido";
  }
}


function renderizarPerfil() {
  const perfilEl = document.getElementById("perfil");
  if (perfilEl) {
    const nombre = "Juan Otaku";
    const edad = 20;
    const ciudad = "Cúcuta";
    perfilEl.innerHTML = `
      <h3>${nombre}</h3>
      <p>Edad: ${edad}</p>
      <p>Ciudad: ${ciudad}</p>
      <p>Fan de: Naruto y One Piece</p>
    `;
  }
}


class Util {
  static formatearMoneda(valor) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(valor);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  mostrarBienvenida();
  manejarVisitas();
  mostrarHora();
  activarNavegacion();
  prepararCambioColor();
  prepararNotas();
  validarFormulario();
  prepararBuscador();
  renderizarPerfil();
});
