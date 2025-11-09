
const cards = document.getElementsByClassName("card");
const body = document.getElementById("body");

const teams = ["ferrari", "mercedes", "redbull", "racingbulls"];

for (var i = 0; i < cards.length; i++) {
  const team = teams[i];

  cards[i].addEventListener("mouseenter", () => {
    body.className = team; // add class
  });

  cards[i].addEventListener("mouseleave", () => {
    body.className = ""; // remove when leaving
  });
}
