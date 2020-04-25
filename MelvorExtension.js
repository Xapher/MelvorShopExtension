// Here You can type your custom JavaScript...
//47 iron ore
var buy = "<div class=\"block-content border-top\"><div class=\"media d-flex align-items-center push\"><div class=\"mr-3\"><img class=\"shop-img\" src=\"";
var imageStart = "\"></div><div class=\"media-body\"><div class=\"font-w600\">";
var name = "testname";
var mid = "</div><div class=\"font-size-sm\">";
var desc = "test";
var mid2 = "</div><div class=\"font-w600\"><img class=\"skill-icon-xs\" src=\"assets/media/main/coins.svg\"><span class=\"customMaterial\">";
var cost = 0;
var buyEnd = "</span></div></div><div class=\"mr-3\"><a class=\"item item-rounded\" href=\"javascript:buyNonLItem(";
var finalEnd = ")\"><button class=\"btn btn-success\">Buy</button></a></div></div></div>";

//RUNESCAPE ID'S
var buyItems = [436, 438, 440, 453, 442, 444, 447, 449, 451, 1511];
//MELVORE ID'S
var localCodes = [45, 46, 47, 48, 49, 50, 51, 52, 53, 0];
//RUNESCAPE NAMES
var itemNames = ["Copper Ore", "Tin Ore", "Iron Ore", "Coal Ore", "Silver Ore", "Gold Ore", "Mithril Ore", "Adamantite Ore", "Runite Ore", "Normal Logs"];
var imageLink = "https://melvoridle.com/assets/media/skills/mining/";
//MELVORE IMAGE FILE NAMES
var imageNames = ["ore_copper", "ore_tin", "ore_iron", "ore_coal", "ore_silver", "ore_gold", "ore_mithril", "ore_adamantite", "ore_runite", "logs_normal"];
var link = "https://cors-anywhere.herokuapp.com/http://services.runescape.com/m=itemdb_oldschool/api/graph/";
var price;
var material = document.getElementById('shop-cat-5');
function test() {
  updateBuyQty = updateBuyPrice;
  console.log(material);
  makePrice(0);
}

function makePrice(i) {
  
  if(i < buyItems.length) {
    var request = makeHttpObject();
    console.log(i);
    request.open("GET", link + buyItems[i] + ".json", true);
    request.send(null);
    request.onreadystatechange = function() {
      if(request.readyState==4) {
        console.log("4");
        price = request.responseText.split(',')[179].split(':')[1].replace("}", "");
        console.log(itemNames[i]);
        console.log(price);
        material.innerHTML = material.innerHTML + buy + (imageLink + imageNames[i] + ".svg") + imageStart + itemNames[i] + mid + "" + mid2 + (price * buyQty).toString() + buyEnd + localCodes[i] + ", " + price + finalEnd;
        
        if(i == 8) {
          material.innerHTML = material.innerHTML + buy + (imageLink + "ore_dragonite.svg") + imageStart + "Dragonite Ore" + mid + "" + mid2 + ((Math.floor((price * 1.35))) * buyQty).toString() + buyEnd + "54, " + price + finalEnd;
        }
        makePrice(i + 1);
      }
    };
    console.log(price);
  }
}


function buyNonLItem(itemCode, p) {
  if(gp - (p * buyQty) >= 0) {
    addItemToBank(itemCode, buyQty, found = true, showNotification = true);
    gp -= p * buyQty;
    updateGP();
  }
}

function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}


function updateBuyPrice(qty) {
    var temp = buyQty;
    buyQty = parseInt(qty, 10);
    $('#shop-buy-qty-btn').text('Buy x' + formatNumber(qty));
    updateShopPrices();
    var customShopList = document.getElementsByClassName("customMaterial");
   for (var i = 0; i < customShopList.length; i++) {
      customShopList[i].innerHTML = (customShopList[i].innerHTML / temp) * buyQty;
   }
}



if(window.addEventListener){
  window.addEventListener('load', test)
}else{
  window.attachEvent('onload', test)
}
