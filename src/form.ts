document.addEventListener("DOMContentLoaded", () => {
  let debug = true;
  debug && console.log("script loaded");
  const form = document.querySelector<HTMLFormElement>("form");
  if (!form) return;
  const wTabContent = form.querySelector<HTMLDivElement>(".w-tab-content");
  if (!wTabContent) return;
  const formContentPanes =
    wTabContent.querySelectorAll<HTMLDivElement>("[data-w-tab]");

  const tabMenu = form.querySelector<HTMLDivElement>(".w-tab-menu");
  if (!tabMenu) return;
  const tabLinks = tabMenu.querySelectorAll<HTMLAnchorElement>("a");
  if (!tabLinks) return;

  const nextButton = form.querySelector<HTMLAnchorElement>(
    '[wb-data="next-button"]'
  );
  if (!nextButton) return;
  const backButton = document.querySelector<HTMLAnchorElement>(
    '[wb-data="back-button"]'
  );
  if (!backButton) return;
  const submitButton = form.querySelector<HTMLInputElement>(
    '[wb-data="submit-button"]'
  );
  if (!submitButton) return;

  debug && console.log("selectors finished");

  // set current step to start form
  let currentStep = 0;
  let numberOfSteps = formContentPanes.length;

  console.log({ numberOfSteps });

  // inputs
  const formFields = document.querySelectorAll<HTMLInputElement>("input");

  const validateEmail = (value) => {
    const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (value.match(emailValidation)) {
      return true;
    }
    return false;
  };

  const checkInputValidity = (type: string, value) => {
    if (type === "text") {
      if (value.length > 0) {
        return true;
      } else {
        return false;
      }
    } else if (type === "email") {
      return validateEmail(value);
    }
  };

  const updateUI = (isValid) => {
    // last step
    if (currentStep === numberOfSteps - 1) {
      nextButton.classList.add("hide");
    } else {
      nextButton.classList.remove("hide");
    }

    // first step
    if (currentStep === 0) {
      backButton.classList.add("hide");
    } else {
      backButton.classList.remove("hide");
    }

    // update next button
    if (isValid) {
      nextButton.classList.remove("disabled");
    } else {
      nextButton.classList.add("disabled");
    }
  };

  const handleFormChange = (e) => {
    console.log(e.target.value);
    console.log(e.target);
    let type = e.target.type;
    let value = e.target.value;
    let isValid = checkInputValidity(type, value);
    updateUI(isValid);
  };

  const handleNextButtonClicked = (e) => {
    currentStep++;
    let oncomingForm = formContentPanes[currentStep].querySelector("input");
    if (!oncomingForm) return;
    let type = oncomingForm.type;
    let value = oncomingForm.value;
    let isValid = checkInputValidity(type, value);

    updateUI(isValid);
    tabLinks[currentStep].click();
  };

  const handleBackButtonClicked = (e) => {
    currentStep--;
    let oncomingForm = formContentPanes[currentStep].querySelector("input");
    if (!oncomingForm) return;
    let type = oncomingForm.type;
    let value = oncomingForm.value;
    let isValid = checkInputValidity(type, value);
    updateUI(isValid);
    tabLinks[currentStep].click();
  };

  Webflow.push(function () {
    $("form").submit(function () {
      console.log(`submit attempt current step: ${currentStep}`);
      if (currentStep === numberOfSteps - 1) {
        console.log("submitting form");
        return true;
      } else {
        return false;
      }
    });
  });

  formFields.forEach((formField) => {
    formField.addEventListener("input", handleFormChange);
  });

  nextButton?.addEventListener("click", handleNextButtonClicked);
  backButton?.addEventListener("click", handleBackButtonClicked);

  document.addEventListener("keypress", function (e) {
    if (currentStep === numberOfSteps - 1) return;
    if (e.key === "Enter") {
      if (nextButton.classList.contains("disabled")) return;
      setTimeout(() => {
        nextButton.click();
      }, 500);
    }
  });
});
