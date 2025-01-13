import "./style.css";
let value1;
let value2;
let enemyvalue1;

let newcard;
let yourtotal;
let enemytotal;
let playagain;
let betamount;
let money = 500;




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
    if (yourtotal + cardvalue >= 21){
      cardvalue = 1;
    }

    console.log(typeof cardvalue);
    return cardvalue;
  }
}
async function hit(deckid, current_total, deck, who) {
  console.log(deckid);
  try {
    const hitting = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`
    );

    if (hitting.status != 200) {
      throw new Error(hitting);
    } else {
      console.log("jhgfdjlsdeg");
      deck = await hitting.json();
      newcard = deck.cards[0];
      console.log(newcard);

      let newcardvalue = checkvalue(newcard);
      if (who === "Enemy"){
        document.querySelector(".enemycards").insertAdjacentHTML(
          "beforeend",
          `
          
          <img src = "${newcard.image}" class = "card-image" alt = "newcard">
          
          
          `
        );
      } else{
        document.querySelector(".yourcards").insertAdjacentHTML(
          "beforeend",
          `
          
          <img src = "${newcard.image}" class = "card-image" alt = "newcard">
          
          
          `
        );
      }
      
      console.log(current_total + newcardvalue);
      return current_total + newcardvalue;
    }
  } catch (error) {
    alert("hey I could not find that agent");
    return current_total;
  }
}

function bustorno(total, who) {
  
  let result;
  if (who === "You"){
    document.querySelector(".Total").innerHTML = `${total} Your cards:`;
  } else{
    document.querySelector(".ETotal").innerHTML = `${total} Opponent's cards:`;
  }
  if (total > 21) {
    console.log("bust");
    
    result = "Bust";
    
  } else if (total === 21){
    console.log("BlackJack!");
    result = "BlackJack";
  } else{
    console.log("continue");
    result = "CanContinue";
    
    
  }
  return result;
}

function beting(money){
  if (Number(money) === 0){
    money = 500;
  }
  document.querySelector(".container").insertAdjacentHTML(
    "beforeend",
    `
    <h2 class = "amount">Current Balance: $${money}</h2>
    <form action="" class="form">
      <input type="number" id="bet-input" placeholder="Enter Betting Amount" min="1" max="${money}"
      required />
      
    </form>
    `
  )
}

function adjustmoney(outcome, betamount, money){
  money = Number(money);
  betamount = Number(betamount);
  if (outcome === "Win"){
    money = money + 2 *betamount;
    
  } else if(outcome === "Split"){
    money = money + betamount;
  }
  return money;
}

async function card() {
  try {
    
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    if (response.status != 200) {
      throw new Error(response);
    } else {
      
      
      let data = await response.json();
      console.log(data);

      beting(money);
      document.querySelector("form").addEventListener("submit", async function (event) {
        event.preventDefault();

        betamount = document.getElementById("bet-input").value;
        money = Number(money);
        betamount = Number(betamount);
        money = money - betamount;
        document.getElementById("bet-input").remove();
        document.querySelector(".amount").remove();

        document.querySelector(".container").insertAdjacentHTML(
          "beforeend",
          `
          <h2>Current Balance: $${money}</h2>
          
          `
        )


        let deckid = data.deck_id;
        console.log(deckid);

        

        const enemy = await fetch(
          `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`
        );
        let deck = await enemy.json();

        let enemycard1 = deck.cards[0];
        console.log(enemycard1);

        

        enemyvalue1 = checkvalue(enemycard1);
        

        if (
          (typeof enemyvalue1 === "number") 
        ) {
          enemytotal = enemyvalue1 
          
          console.log(enemytotal);
          document.querySelector(".container").insertAdjacentHTML(
            "beforeend",
            `
            <div class = "ETotal">
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
            
            
          </div>
          `
        );

        const bruh = await fetch(
          `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=2`
        );
        deck = await bruh.json();

        

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

        if (yourtotal === 21){
          document.querySelector(".hitorstand").innerHTML = "";
          document.querySelector(".container").insertAdjacentHTML(
            "beforeend",
            `
            <div class = "Win">
              <h2>You got BLACKJACK! Try your luck again!</h2>
              <button class ="tryagain">Play Again? You know you want to</button>
              
            </div>
            `
          );
          money = adjustmoney("Win", betamount, money);
          playagain = document.querySelector(".tryagain");
          waitforclick();

        }
        if (document.querySelector(".hitbutton")){
          document
            .querySelector(".hitbutton")
            .addEventListener("click", async function () {
              yourtotal = await hit(deckid, yourtotal, deck, "You");
              
              let afterhit = bustorno(yourtotal, "You");

              if (afterhit === "Bust"){
                money = adjustmoney("Lost", betamount, money);
                if ( money <= 0){
                  document.querySelector(".hitorstand").innerHTML = "";
                  document.querySelector(".yourcards").insertAdjacentHTML(
                    "beforeend",
                    `
                    <div class = "Bust">
                      <h2>You Busted and also you're broke. GAME OVER</h2>
                      <img src = "public/broke.jpg" class = "winners-image" alt = "winning">
                      <button class ="tryagain">Restart?</button>
                    </div>
                    `
                  );
                }else{
                  document.querySelector(".hitorstand").innerHTML = "";
                  document.querySelector(".yourcards").insertAdjacentHTML(
                    "beforeend",
                    `
                    <div class = "Bust">
                      <h2>You Busted, But Do Not Despair! You can always Try again!</h2>
                      <img src = "public/again.webp" class = "winners-image" alt = "winning">
                      <button class ="tryagain">Play Again? You know you want to</button>
                    </div>
                    `
                  );
                }
                
                
                playagain = document.querySelector(".tryagain");
                waitforclick();

              } else if (afterhit === "BlackJack"){
                document.querySelector(".hitorstand").innerHTML = "";
                document.querySelector(".yourcards").insertAdjacentHTML(
                  "beforeend",
                  `
                  <div class = "Win">
                    <h2>You got BLACKJACK! Try your luck again!</h2>
                    <button class ="tryagain">Play Again? You know you want to</button>
                  </div>
                  `
                );
                money = adjustmoney("Win", betamount, money);
                playagain = document.querySelector(".tryagain");
                waitforclick();
              }


            });
          document.querySelector(".standbutton").addEventListener("click", async function() {
            while(enemytotal < yourtotal || enemytotal === 21){
              enemytotal = await hit(deckid, enemytotal, deck, "Enemy");
              bustorno(enemytotal, "Enemy");
              console.log("end of loop");
              console.log(enemytotal);

            }
            if (enemytotal > 21){
              document.querySelector(".hitorstand").innerHTML = "";
              document.querySelector(".yourcards").insertAdjacentHTML(
                "beforeend",
                `
                <div class = "lost">
                  <h2>Your opponent busted! Try your luck again!</h2>
                  <button class ="tryagain">Play Again? You know you want to</button>
                  
                </div>
                `
              );
              money = adjustmoney("Win", betamount, money);
              
            } else if (enemytotal > yourtotal){
              money = adjustmoney("Lost", betamount, money);
              if ( money <= 0){
                document.querySelector(".hitorstand").innerHTML = "";
                document.querySelector(".yourcards").insertAdjacentHTML(
                  "beforeend",
                  `
                  <div class = "Bust">
                    <h2>You not only lost to a computer but you are also broke. GAME OVER</h2>
                    <img src = "public/broke.jpg" class = "winners-image" alt = "winning">
                    <button class ="tryagain">Restart?</button>
                  </div>
                  `
                );
              } else{
                document.querySelector(".hitorstand").innerHTML = "";
                document.querySelector(".yourcards").insertAdjacentHTML(
                  "beforeend",
                  `
                  <div class = "lost">
                    <h2>You just lost to a bot, kind of embarrassing honestly</h2>
                    <button class ="tryagain">Play Again? You know you want to</button>
                    
                  </div>
                  `
                );
              }
              
            } else{
              document.querySelector(".hitorstand").innerHTML = "";
              document.querySelector(".yourcards").insertAdjacentHTML(
                "beforeend",
                `
                <div class = "lost">
                  <h2>You Split</h2>
                  <button class ="tryagain">Play Again? You know you want to</button>
                  
                </div>
                `
              );
              money = adjustmoney("Split", betamount, money);
            }
            playagain = document.querySelector(".tryagain");
            waitforclick();
          })
        }
      });
      
    }
  } catch (error) {
    alert("hey I could not find that agent");
  }
}


function waitforclick() {
  if (playagain) {
    playagain.addEventListener("click", function () {
      console.log("rego");
      document.querySelector(".container").innerHTML = "";
      
      
      playgame();
    });
  } else {
    setTimeout(waitforclick, 100);
  }
}

async function playgame() {
  await card();
}

playgame();

