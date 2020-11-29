function main() {
  for (let x = 0; x < 48; x++) {
    const element = document.createElement("div");
    element.onclick = () => element.classList.toggle("active");

    document.querySelector(".container").appendChild(element);
  }
}

window.onload = main;
