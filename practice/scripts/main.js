import { fetchPrograms } from "./data.js";
import { displayPrograms, setupSearch, setupModal } from "./ui.js";
import { initTheme, saveTheme } from "./storage.js";

document.addEventListener("DOMContentLoaded", async () => {

  initTheme();

  const themeToggle = document.querySelector("#themeToggle");
  if(themeToggle){
    themeToggle.addEventListener("click", saveTheme);
  }

  const container = document.querySelector("#programContainer");

  if(container){
    const programs = await fetchPrograms();
    displayPrograms(programs);
    setupSearch(programs);
    setupModal();
  }

});
