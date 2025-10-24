// Configuration — update if your class names differ
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// --- helpers ---
const showInputError = (formEl, inputEl, message, config) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(config.inputErrorClass);
  errorEl.textContent = message;
  errorEl.classList.add(config.errorClass);
};

const hideInputError = (formEl, inputEl, config) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass);
  errorEl.textContent = "";
  errorEl.classList.remove(config.errorClass);
};

const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

const hasInvalidInput = (inputs) => inputs.some((i) => !i.validity.valid);

const toggleButtonState = (inputs, buttonEl, config) => {
  const disable = hasInvalidInput(inputs);
  buttonEl.disabled = disable;
  buttonEl.classList.toggle(config.inactiveButtonClass, disable);
};

const setEventListeners = (formEl, config) => {
  const inputs = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  // Initial state
  toggleButtonState(inputs, buttonEl, config);

  inputs.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputs, buttonEl, config);
    });
  });

  formEl.addEventListener("submit", (evt) => {
    if (hasInvalidInput(inputs)) {
      evt.preventDefault();
      return;
    }
    // success path:
    const modal = formEl.closest(".modal");
    if (modal && typeof closeModal === "function") closeModal(modal);
    formEl.reset();
    inputs.forEach((i) => hideInputError(formEl, i, config));
    toggleButtonState(inputs, buttonEl, config);
  });
};

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((formEl) => setEventListeners(formEl, config));
}

// Per the rubric, call from validation.js
enableValidation(settings);
