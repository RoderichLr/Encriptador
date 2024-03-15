function autoResize() {
  // Obtener el elemento del área de texto principal
  const mainTextArea = document.getElementById("initialText");

  // Obtener la altura de desplazamiento anterior
  const previousScrollHeight = mainTextArea.scrollHeight;

  // Verificar si la altura de desplazamiento actual es mayor que la anterior
  // Si es mayor, ajustar el desplazamiento para mantener la vista en la parte inferior
  if (mainTextArea.scrollHeight > previousScrollHeight) {
    mainTextArea.scrollTop = mainTextArea.scrollHeight;
  }
}