document.addEventListener("DOMContentLoaded", () => {
  const malla = document.getElementById("malla");
  materias.forEach((materia, index) => {
    const div = document.createElement("div");
    div.className = "materia";
    div.textContent = materia.nombre;
    div.addEventListener("click", () => {
      div.classList.toggle("aprobada");
    });
    malla.appendChild(div);
  });
});
