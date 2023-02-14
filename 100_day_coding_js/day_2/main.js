let optionBtns = document.querySelectorAll(".option-button");
let avancedOptBtns = document.querySelectorAll(".adv-option-button");
let formatBtn = document.querySelectorAll(".format");
let scriptBtn = document.querySelectorAll(".script");
let alignBtn = document.querySelectorAll(".align");
let spacingBtn = document.querySelectorAll(".spacing");
let linkBtn = document.getElementById("createLink");
let fontName = document.getElementById("fontName");
let fontSize = document.getElementById("fontSize");

let fontList = ["Arial", "Times New Roman"];

const initializer = () => {
  highlighter(alignBtn, true);
  highlighter(spacingBtn, true);
  highlighter(formatBtn, false);
  highlighter(scriptBtn, true);

  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSize.appendChild(option);
  }
  fontSize.value = 3;
};

const modifyTest = (command, defaultUi, value) =>
  document.execCommand(command, defaultUi, value);

optionBtns.forEach((button) =>
  button.addEventListener("click", () => modifyTest(button.id, false, null))
);

avancedOptBtns.forEach((button) =>
  button.addEventListener("change", () =>
    modifyTest(button.id, false, button.value)
  )
);

linkBtn.addEventListener("click", () => {
  let userLink = prompt("Enter a URL? ");
  if (/http/i.test.userLink) modifyTest(linkBtn.id, false, userLink);
  else {
    userLink = "https://" + userLink;
    modifyTest(linkBtn.id, false, userLink);
  }
});

const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = false;
        if (button.classList.contains("active")) alreadyActive = true;
        highlighterRemover(className);
        if (!alreadyActive) button.classList.add("active");
      } else button.classList.toggle("active");
    });
  });
};

const highlighterRemover = (className) =>
  className.forEach((button) => {
    button.classList.remove("active");
  });

window.onload = initializer();
