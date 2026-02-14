export function displayPrograms(programs){

  const container = document.querySelector("#programContainer");

  container.innerHTML = programs.map(program => `
    <div class="card">
      <h3>${program.name}</h3>
      <p><strong>Grade:</strong> ${program.grade}</p>
      <p><strong>Teacher:</strong> ${program.teacher}</p>
      <p><strong>Schedule:</strong> ${program.schedule}</p>
      <button data-id="${program.id}" class="detailsBtn">View Details</button>
    </div>
  `).join("");

}

export function setupSearch(programs){
  const input = document.querySelector("#searchInput");

  input.addEventListener("input", e => {
    const filtered = programs.filter(p =>
      p.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    displayPrograms(filtered);
  });
}

export function setupModal(){

  const modal = document.querySelector("#modal");
  const modalBody = document.querySelector("#modalBody");

  document.addEventListener("click", e => {
    if(e.target.classList.contains("detailsBtn")){
      const id = e.target.dataset.id;
      modalBody.innerHTML = `<p>Program ID: ${id}</p>`;
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
    }
  });

  document.querySelector("#closeModal")?.addEventListener("click", ()=>{
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  });

}
