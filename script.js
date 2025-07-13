const container = document.getElementById("materias-container");
const progresoGuardado = JSON.parse(localStorage.getItem("progresoEnfermeria") || "[]");

function crearMateria(materia) {
  const div = document.createElement("div");
  div.classList.add("materia");
  div.innerText = materia.nombre;
  div.dataset.id = materia.id;
  container.appendChild(div);
}

function estaAprobada(id) {
  return progresoGuardado.includes(id);
}

function sePuedeDesbloquear(materia) {
  return materia.correlativas.every(correlativa => progresoGuardado.includes(correlativa));
}

function renderMaterias() {
  container.innerHTML = "";
  materias.forEach(materia => {
    const div = document.createElement("div");
    div.classList.add("materia");
    div.innerText = materia.nombre;
    div.dataset.id = materia.id;

    const aprobada = estaAprobada(materia.id);
    const desbloqueada = sePuedeDesbloquear(materia);

    if (aprobada) {
      div.classList.add("aprobada");
    } else if (!desbloqueada && materia.correlativas.length > 0) {
      div.classList.add("bloqueada");
    }

    div.addEventListener("click", () => {
      if (!div.classList.contains("bloqueada")) {
        if (estaAprobada(materia.id)) {
          const index = progresoGuardado.indexOf(materia.id);
          if (index > -1) progresoGuardado.splice(index, 1);
        } else {
          progresoGuardado.push(materia.id);
        }
        localStorage.setItem("progresoEnfermeria", JSON.stringify(progresoGuardado));
        renderMaterias();
      }
    });

    container.appendChild(div);
  });
}

renderMaterias();
