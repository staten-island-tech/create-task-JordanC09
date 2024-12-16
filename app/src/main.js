import "./style.css";
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

      document.querySelector(".container").insertAdjacentHTML(
        "beforeend",
        `
        <div class = "yourcards">
          <img src = "${yourcard1.image}" class = "card-image" alt = "card1">
          <img src = "${yourcard2.image}" class = "card-image" alt = "card1">
        </div>
        `
      );
      if (
        yourcard2.value !== "ACE" &&
        yourcard1.value !== "KING" &&
        yourcard1.value !== "QUEEN" &&
        yourcard1.value !== "JACK"
      ) {
        Number(yourcard1.value);
        console.log(yourcard1.value);
      }
      if (
        yourcard2.value !== "ACE" &&
        yourcard2.value !== "KING" &&
        yourcard2.value !== "QUEEN" &&
        yourcard2.value !== "JACK"
      ) {
        Number(yourcard2.value);
        console.log(yourcard2.value);
      }
      if (
        typeof yourcard1.value === Number &&
        typeof yourcard2.value === Number
      ) {
        let value = yourcard1.value + yourcard2.value;
        console.log(value);
      }
    }
  } catch (error) {
    alert("hey I could not find that agent unc");
  }
}

card();
