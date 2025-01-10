import "./style.css";
let value1;
let value2;
let enemyvalue1;
let enemyvalue2;
let newcard;
let yourtotal;
let enemytotal;

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
async function hit(deckid, current_total, deck) {
  console.log(deckid);
  try {
    const hitting = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`
    );

    if (response.status != 200) {
      throw new Error(hitting);
    } else {
      console.log("jhgfdjlsdeg");
      deck = await hitting.json();
      newcard = deck.cards[0];
      console.log(newcard);

      let newcardvalue = checkvalue(newcard);
      document.querySelector(".yourcards").insertAdjacentHTML(
        "beforeend",
        `
        
        <img src = "${newcard.image}" class = "card-image" alt = "newcard">
        
        
        `
      );
      console.log(current_total + newcardvalue);
      return current_total + newcardvalue;
    }
  } catch (error) {
    alert("hey I could not find that agent");
    return current_total;
  }
}

function bustorno(yourtotal) {
  if (yourtotal > 21) {
    console.log("bust");
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
        yourtotal = value1 + value2;
        if (yourtotal > 21) {
          value2 = 1;
          yourtotal = value1 + value2;
        }
        console.log(yourtotal);
        document.querySelector(".container").insertAdjacentHTML(
          "beforeend",
          `
          <div class = "Total">
            <h2>${yourtotal} Your cards:</h2>
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
      document.querySelector(".container").insertAdjacentHTML(
        "beforeend",
        `
        <div class = "hitorstand">
          <button class ="hitbutton">Hit</button>
          <button class ="standbutton">Stand</button>
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
        enemytotal = enemyvalue1 + enemyvalue2;
        if (enemytotal > 21) {
          enemyvalue2 = 1;
          enemytotal = enemyvalue1 + enemyvalue2;
        }
        console.log(enemytotal);
        document.querySelector(".container").insertAdjacentHTML(
          "beforeend",
          `
          <div class = "Total">
            <h2>${enemytotal} Opponent's cards:</h2>
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
          <img src = "/garfield.jpg" class = "awsome-image" alt = "awsome">
        </div>
        `
      );
      document
        .querySelector(".hitbutton")
        .addEventListener("click", async function () {
          yourtotal = await hit(deckid, yourtotal, deck);
          bustorno(yourtotal);
        });
    }
  } catch (error) {
    alert("hey I could not find that agent");
  }
}

card();
