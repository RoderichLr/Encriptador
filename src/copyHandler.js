function copyText() {
  // Obtener elementos del DOM
  const textareaEncrypted = document.getElementById("encrypted");
  const buttonCopy = document.getElementById("copy");
  let decryptorInf = document.getElementById("decryptorTexts");
  let decryptorElments = document.getElementById("decryptorElements");
  let btnCopy = document.querySelector('.element-button')


  try {
    // Intentar copiar el texto al portapapeles
    let copiedText = navigator.clipboard
      .writeText(textareaEncrypted.value)
      .then(() => {
        // Acciones después de copiar el texto
        buttonCopy.innerText = "";
        buttonCopy.disabled = true;
        buttonCopy.classList.add("verde");
        btnCopy.style.width = 'auto';

        // Restaurar el botón de copiar y la visualización de los elementos
        setTimeout(function () {
          buttonCopy.classList.remove("verde");
          buttonCopy.innerText = "Copiar";
          btnCopy.style.width = "100%";
          buttonCopy.disabled = false;
          decryptorInf.style.display = "flex";
          decryptorElments.style.display = "none";

          // Desplazarse al logotipo en dispositivos móviles
          if (
            window.matchMedia("(max-width: 425px)").matches ||
            window.matchMedia("(max-width: 868px)").matches
          ) {
            const destination = document.getElementById("logoA");
            destination.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 500);
      })
      .catch((error) => {
        // Manejar errores al copiar el texto
        console.error("Error al copiar el texto: ", error);
        alert("Error al copiar el texto. Por favor, intente nuevamente.");
      });
  } catch (error) {
    // Manejar errores al acceder al portapapeles
    console.error("Error al acceder al portapapeles: ", error);
    alert("No se pudo acceder al portapapeles. Por favor, intente nuevamente.");
  } finally {
    // Limpiar la selección actual
    window.getSelection().removeAllRanges();
  }
}
