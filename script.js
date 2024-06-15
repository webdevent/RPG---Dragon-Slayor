let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["woooden sword"];
let lootInventory = [''];
let armor = 0;
let weaponCost = 30;

const locationImages = {
  'Town Square': './Town-square.jpg', 
  'store': './store sence.jpg', 
  'cave': './cave sence.jpg', 
  'Goblin': './Goblin-fight.jpg',
  'Beetle': './beetle-fight.jpg',
  'King Dragon': './Dragon-fight.jpg',
  'lose': './game over.jpg',
  'intro': './intro.jpg',
  'win': './win game.jpg',
  'win game': './victory.jpg',
  'Snake': './snake.jpg',
  'Dragon minions': './dragon-min.jpg',
  'Skeleton Guard': './Skeleton-guard.jpg'
};
const disScreenImg = document.querySelector('.dis-screen');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const button6 = document.querySelector("#button6");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const armorText = document.querySelector("#armorText")
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'wooden sword', power: 8 },
  { name: 'dagger', power: 32 },
  { name: 'claw hammer', power: 50 },
  { name: 'ice sword', power: 90 },
  { name: 'Ice Axe', power: 100},
  { name: 'Fire Sword', power: 120},
  { name: 'Thor Hammer', power: 200}
];

const loot = [
  {
    name: 'Goblin tooth',
    worth: 5,
  },
  {
    name: 'broken sword',
    worth: 15,
  },
  {
    name: 'gem stone',
    worth: 8,
  },
  {
    name: 'Dragon eye',
    worth: 20,
  },
  {
    name: 'Dragon scale',
    worth: 20
  }
];

const monsters = [
  {
    name: "Goblin",
    level: 2,
    health: 15
  },
  {
    name: "Beetle",
    level: 8,
    health: 60 
  },
  {
    name: 'Skeleton Guard',
    level: 10,
    health: 70
  },
  {
    name: 'Snake',
    level: 12,
    health: 175
  },
  {
    name: 'Dragon minions',
    level: 20,
    health: 250
  },
  {
    name: 'King Dragon',
    level: 100,
    health: 550
  }
]

const buttonSounds = {
  'button1': './game sound effects/sword-sound.mp3',
  'button2': 'sound2.mp3',
  'button3': 'sound3.mp3',
}
const audio = document.getElementById('myAudio');
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightKingDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", `Buy weapon (${weaponCost} gold)`, "Go to town square", "Buy Armor (100 gold)"],
    "button functions": [buyHealth, buyWeapon, goTown, buyArmor],
    text: "You are now in the store please note that the weapon cost increases by 10 every time you buy a weapon"
  },
  {
    name: "cave",
    "button text": ["Fight Goblin", "Fight Beetle's", "Fight Skeleton Guard", "Fight Snake", "Dragon minion", "Go to town square"],
    "button functions": [fightGoblin, fightBeetle, fightSkeleton, fightSnake, fightDragonMin, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go back to cave", "Fight again"],
    "button functions": [goTown, goCave, fightAgain],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You died. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightKingDragon;

function update(location) {
  monsterStats.style.display = "none";
  button4.style.display = "none";
  button5.style.display = "none";
  button6.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button5.innerText = location["button text"][4];
  button6.innerText = location["button text"][5];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  button5.onclick = location["button functions"][4];
  button6.onclick = location["button functions"][5];
  text.innerHTML = location.text;
  
}

function bacImage(imgUrl) {
    disScreenImg.src = imgUrl;
}

function goTown() {
  update(locations[0]);
  bacImage(locationImages['Town Square']);
}

function goStore() {
  update(locations[1]);
  bacImage(locationImages['store']);
  if (locations[1].name === 'store') {
    button4.style.display = 'block';
  }
}

function goCave() {
  update(locations[2]);
  bacImage(locationImages['cave']);
  if (locations[2].name === 'cave') {
    button4.style.display = 'block';
    button5.style.display = 'block';
    button6.style.display = 'block';
  }
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyArmor() {
  if (gold >= 100) {
    gold -= 100;
    armor += 100;
    text.innerText = "You now have Armor";
    armorText.innerText = armor;
    goldText.innerText = gold;
  } else {
    text.innerText = `You Don't have enough gold`;
  }
}

function buyWeapon() {
  if (currentWeaponIndex < weapons.length - 1) {
    if (gold >= weaponCost) {
      gold -= weaponCost;
      currentWeaponIndex++;
      let newWeapon = weapons[currentWeaponIndex].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      weaponCost += 10;
      goldText.innerText = gold;
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += weaponCost/2;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function findLoot() {
  const randomIndex = Math.floor(Math.random() * loot.length);
  const randomLoot = loot[randomIndex];
  text.innerText += 'You found a ' + randomLoot.name + ' worth ' + randomLoot.worth + ' gold!';
  gold += randomLoot.worth;
  goldText.innerText = gold;
}

function fightGoblin() {
  fighting = 0;
  goFight();
  bacImage(locationImages['Goblin']);
}

function fightBeetle() {
  fighting = 1;
  goFight();
  bacImage(locationImages['Beetle']);
}

function fightSkeleton() {
  fighting = 2;
  goFight();
  bacImage(locationImages['Skeleton Guard']);
}

function fightSnake() {
  fighting = 3;
  goFight();
  bacImage(locationImages['Snake']);
}

function fightDragonMin() {
  fighting = 4;
  goFight();
  bacImage(locationImages['Dragon minions']);
}

function fightKingDragon() {
  fighting = 5;
  goFight();
  bacImage(locationImages['King Dragon']);
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeaponIndex].name + ".";
  if (armor > 0) {
    armor -= getMonsterAttackValue(monsters[fighting].level/2);
    if (armor <= 0) {
      armor = 0;
      text.innerText += " Your armor breaks.";
    }
  } else {
    health -= getMonsterAttackValue(monsters[fighting].level);
  }
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  armorText.innerText = armor;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 5) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeaponIndex--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function fightAgain () {
  goFight();
  bacImage(locationImages[monsters[fighting].name]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  bacImage(locationImages['win']);
  findLoot();
}

function lose() {
  update(locations[5]);
  bacImage(locationImages['lose']);
}

function winGame() {
  update(locations[6]);
  bacImage(locationImages['win game']);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["wooden sword"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
