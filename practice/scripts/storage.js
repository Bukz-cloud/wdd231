export function initTheme(){
  const saved = localStorage.getItem("theme");
  if(saved === "dark"){
    document.body.style.background = "#1d3557";
    document.body.style.color = "white";
  }
}

export function saveTheme(){
  const isDark = localStorage.getItem("theme") === "dark";

  if(isDark){
    localStorage.setItem("theme","light");
    location.reload();
  } else {
    localStorage.setItem("theme","dark");
    location.reload();
  }
}
