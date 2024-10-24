const left = document.querySelector(".left");
const right = document.querySelector(".right");
const container = document.querySelector(".container");

function debounce(func, delay = 100) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

function addClassWithCallback(element, className, callback) {
  if (element) {
    element.classList.add(className);
    callback && callback(className);
  }
}

function removeClassWithCallback(element, className, callback) {
  if (element) {
    element.classList.remove(className);
    callback && callback(className);
  }
}

function onMouseEnterCallback(className) {
  console.log(`Classe ${className} foi adicionada ao container`);
}

function onMouseLeaveCallback(className) {
  console.log(`Classe ${className} foi removida do container`);
}

if (left && right && container) {
  left.addEventListener(
    "mouseenter",
    debounce(() => addClassWithCallback(container, "hover-left", onMouseEnterCallback), 200)
  );
  left.addEventListener(
    "mouseleave",
    debounce(() => removeClassWithCallback(container, "hover-left", onMouseLeaveCallback), 200)
  );

  right.addEventListener(
    "mouseenter",
    debounce(() => addClassWithCallback(container, "hover-right", onMouseEnterCallback), 200)
  );
  right.addEventListener(
    "mouseleave",
    debounce(() => removeClassWithCallback(container, "hover-right", onMouseLeaveCallback), 200)
  );
}

function handleTouchStart(event, className) {
  addClassWithCallback(container, className, onMouseEnterCallback);
}

function handleTouchEnd(event, className) {
  removeClassWithCallback(container, className, onMouseLeaveCallback);
}

left.addEventListener("touchstart", (e) => handleTouchStart(e, "hover-left"));
left.addEventListener("touchend", (e) => handleTouchEnd(e, "hover-left"));

right.addEventListener("touchstart", (e) => handleTouchStart(e, "hover-right"));
right.addEventListener("touchend", (e) => handleTouchEnd(e, "hover-right"));

const style = document.createElement("style");
style.textContent = `
  .container {
    transition: transform 0.3s ease-in-out;
  }
  .hover-left .container {
    transform: translateX(-50px);
  }
  .hover-right .container {
    transform: translateX(50px);
  }
`;
document.head.append(style);
