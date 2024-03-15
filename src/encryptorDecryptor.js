// Elementos del DOM
const elements = {
  advert: document.getElementById("advert"),
  spanAd: document.getElementById("spanAdd"),
  imgAd: document.getElementById("imgAdd"),
  initialTextElement: document.getElementById("initialText"),
  decryptorInf: document.getElementById("decryptorTexts"),
  decryptorElments: document.getElementById("decryptorElements"),
  encryptedTextElement: document.getElementById("encrypted"),
  btndecryptor : document.getElementById("decryptor")
};

// Definición de claves para encriptar y desencriptar
const keys = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

// Definición de claves para desencriptar
const reverseKeys = {
  ai: "a",
  enter: "e",
  imes: "i",
  ober: "o",
  ufat: "u",
};

// Función para encriptar texto
const encryptText = (text) => text.replace(new RegExp(Object.keys(keys).join("|"), "g"), (match) => keys[match]);

// Función para desencriptar texto

const decryptText = (text) =>
  text.replace(new RegExp(Object.keys(reverseKeys).join("|"), "g"), (match) => reverseKeys[match]);

// Función para realizar la animación cuando el campo está vacío
const placeholderShake = () => {
  elements.initialTextElement.classList.add("shake-placeholder", "shake-orange");

  setTimeout(() => {
    elements.initialTextElement.classList.remove("shake-placeholder");
    setTimeout(() => {
      elements.initialTextElement.classList.remove("shake-orange");
      elements.initialTextElement.setAttribute("placeholder", "Ingrese el texto aquí");
    }, 200);
  }, 700);
};

// Listener para el evento de carga del DOM
document.addEventListener("DOMContentLoaded", function () {
  elements.initialTextElement.focus();
});

// Listener para el evento de tecla presionada
elements.initialTextElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evitar el comportamiento por defecto de la tecla "Enter"
  }
});

// Listener para el evento de entrada (input)
elements.initialTextElement.addEventListener("input", function () {
  // Obtener el valor actual del campo de entrada
  let valor = elements.initialTextElement.value;
  if (/[^a-z\s¡!¿?]/g.test(valor)) {
    // Si se ingresan caracteres inválidos, cambiar la imagen y el color del texto
    elements.imgAd.src = "assets/img/bi_exclamation-circle-fill-orange.png";
    elements.advert.classList.add("shake-placeholder");
    elements.advert.classList.add("shake-placeholder");
    elements.spanAd.style.color = "#fd750d";
   
    setTimeout(() => {
      valor = this.value;
      valor = valor.replace(/[^a-z\s¡!¿?]/g, ""); // Remover caracteres inválidos
      elements.initialTextElement.value = valor;
      
      setTimeout(() => {
        elements.advert.classList.remove("shake-placeholder");
      }, 500);
      
    }, 70);
  } else {
    // Si no hay caracteres inválidos, cambiar la imagen y el color del texto
    elements.imgAd.src = "assets/img/bi_exclamation-circle-fill-green.png";
    elements.spanAd.style.color = "#27b361";
    
  }

  // Si el campo está vacío, restaurar la imagen y el color del texto
  if (elements.initialTextElement.value.trim() === "") {
    elements.imgAd.src = "assets/img/bi_exclamation-circle-fill.png";
    elements.spanAd.style.color = "#495057";
  }

  // Actualizar el valor del campo de entrada sin caracteres inválidos
  elements.initialTextElement.value = valor;
});


// Función para encriptar el texto ingresado
const encryptorText = () => {
  // Verificar si el campo de texto no está vacío
  if (elements.initialTextElement.value.trim() !== "") {
    // Configurar la apariencia visual
    elements.imgAd.src = "assets/img/bi_exclamation-circle-fill.png";
    elements.spanAd.style.color = "#495057";
    elements.decryptorInf.style.display = "none";
    elements.decryptorElments.style.display = "flex";

    // Encriptar el texto ingresado y mostrarlo en el elemento correspondiente
    elements.encryptedTextElement.innerHTML = encryptText(elements.initialTextElement.value.toString());
    elements.initialTextElement.value = ""; // Limpiar el campo de texto

    // Desplazarse al elemento "decryptorElments" si es necesario
    scrollToElement();
  } else {
    // Si el campo de texto está vacío, realizar la animación
    placeholderShake();
  }
};

// Función para desencriptar el texto ingresado
const decryptorText = () => {
  if (elements.initialTextElement.value.trim() !== "") {
    // Configurar la apariencia visual
    elements.imgAd.src = "assets/img/bi_exclamation-circle-fill.png";
    elements.spanAd.style.color = "#495057";

    // Desencriptar el texto ingresado y mostrarlo en el elemento correspondiente
    elements.encryptedTextElement.innerHTML = decryptText(elements.initialTextElement.value.toString());
    elements.decryptorInf.style.display = "none";
    elements.decryptorElments.style.display = "flex";
    elements.initialTextElement.value = ""; // Limpiar el campo de texto

    scrollToElement();
  } else {
    placeholderShake();
  }
};

// Función para desplazarse al elemento "decryptorElments" en dispositivos móviles
function scrollToElement() {
  if (window.matchMedia("(max-width: 425px)").matches || window.matchMedia("(max-width: 868px)").matches) {
    elements.btndecryptor.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
