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

      document.querySelector(".container");
    }
  } catch (error) {
    alert("hey I could not find that agent unc");
  }
}

card();
