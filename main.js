function main() {
  for (let x = 0; x < 42; x++) {
    const element = document.createElement("div");
    element.onclick = () => element.classList.toggle("foo");

    document.querySelector(".container").appendChild(element);
  }
}

window.onload = main;
