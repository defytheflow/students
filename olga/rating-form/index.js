// @ts-check
"use strict";

const form = document.querySelector("#rating-form");
const raitingRadioGroup = document.querySelector("#rating-group");
const commentTextarea = document.querySelector("#comment");

form.addEventListener("submit", function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const rating = Number(formData.get("rating"));
  let comment = formData.get("comment");

  const isRatingValid = Number.isInteger(rating) && 1 <= rating && rating <= 5;
  const isCommentValid =
    typeof comment == "string" && (comment = comment.trim()).length >= 10;

  if (!isRatingValid) {
    raitingRadioGroup.setAttribute("aria-invalid", "true");
  } else {
    raitingRadioGroup.removeAttribute("aria-invalid");
  }

  if (!isCommentValid) {
    commentTextarea.setAttribute("aria-invalid", "true");
  } else {
    commentTextarea.removeAttribute("aria-invalid");
  }

  if (!isRatingValid) {
    raitingRadioGroup.querySelector("input").focus();
  } else if (!isCommentValid) {
    commentTextarea.focus();
  }

  if (isRatingValid && isCommentValid) {
    const data = { rating, comment };
    console.log(data);
  }
});

raitingRadioGroup.addEventListener("change", function onRadioGroupChange(event) {
  const { value } = event.target;
  const starEls = raitingRadioGroup.querySelectorAll(".fa-star");

  for (let i = 0; i < Number(value); i++) {
    starEls[i].classList.replace("fa-regular", "fa-solid");
  }

  for (let i = Number(value); i < starEls.length; i++) {
    starEls[i].classList.replace("fa-solid", "fa-regular");
  }
});
