import "./style.css";
let value1;
let value2;
let enemyvalue1;
let enemyvalue2;

function checkvalue(yourcard) {
  let cardvalue;
  if (
    yourcard.value !== "ACE" &&
    yourcard.value !== "KING" &&
    yourcard.value !== "QUEEN" &&
    yourcard.value !== "JACK"
  ) {
    cardvalue = yourcard.value;
    cardvalue = Number(cardvalue);
    return cardvalue;
  }

  if (
    yourcard.value === "KING" ||
    yourcard.value === "QUEEN" ||
    yourcard.value === "JACK"
  ) {
    cardvalue = 10;

    console.log(typeof cardvalue);
    return cardvalue;
  }

  if (yourcard.value === "ACE") {
    cardvalue = 11;

    console.log(typeof cardvalue);
    return cardvalue;
  }
}

async function card() {
  try {
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    if (response.status != 200) {
      throw new Error(response);
    } else {
      //convert promise to json
      let data = await response.json();
      console.log(data);

      let deckid = data.deck_id;
      console.log(deckid);

      const bruh = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=2`
      );
      let deck = await bruh.json();

      let yourcard1 = deck.cards[0];
      console.log(yourcard1);

      let yourcard2 = deck.cards[1];
      console.log(yourcard2);

      value1 = checkvalue(yourcard1);
      value2 = checkvalue(yourcard2);

      if ((typeof value1 === "number") & (typeof value2 === "number")) {
        let WhyisLaithcopyingme = value1 + value2;
        if (WhyisLaithcopyingme > 21) {
          value2 = 1;
          WhyisLaithcopyingme = value1 + value2;
        }
        console.log(WhyisLaithcopyingme);
        document.querySelector(".container").insertAdjacentHTML(
          "beforeend",
          `
          <div class = "Total">
            <h2>${WhyisLaithcopyingme} Your cards:</h2>
          </div>
          `
        );
      }

      document.querySelector(".container").insertAdjacentHTML(
        "beforeend",
        `
        <div class = "yourcards">
          <img src = "${yourcard1.image}" class = "card-image" alt = "card1">
          <img src = "${yourcard2.image}" class = "card-image" alt = "card1">
        </div>
        `
      );

      const enemy = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=2`
      );
      deck = await enemy.json();

      let enemycard1 = deck.cards[0];
      console.log(enemycard1);

      let enemycard2 = deck.cards[1];
      console.log(enemycard2);

      enemyvalue1 = checkvalue(enemycard1);
      enemyvalue2 = checkvalue(enemycard2);

      if (
        (typeof enemyvalue1 === "number") &
        (typeof enemyvalue2 === "number")
      ) {
        let Laithisabum = enemyvalue1 + enemyvalue2;
        if (Laithisabum > 21) {
          enemyvalue2 = 1;
          Laithisabum = enemyvalue1 + enemyvalue2;
        }
        console.log(Laithisabum);
        document.querySelector(".container").insertAdjacentHTML(
          "beforeend",
          `
          <div class = "Total">
            <h2>${Laithisabum} Opponent's cards:</h2>
          </div>
          `
        );
      }
      document.querySelector(".container").insertAdjacentHTML(
        "beforeend",
        `
        <div class = "enemycards">
          <img src = "${enemycard1.image}" class = "enemycard-image" alt = "enemycard1">
          <img src = "${enemycard2.image}" class = "enemycard-image" alt = "enemycard1">
          <img src = "public/garfield.jpg" class = "awsome-image" alt = "awsome">
        </div>
        `
      );
    }
  } catch (error) {
    alert("hey I could not find that agent unc");
  }
}

card();
