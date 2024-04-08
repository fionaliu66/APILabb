$(document).ready(function(){
    $("#btnDraw").on("click",drawCard);
});


function drawCard() {
    fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1",{
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(res =>{
        if(res.ok)
         return res.json();
        throw new Error('Failed to get repos');
    }).then(data =>{
        //can save deck id to reuse
        let kCard = "cards";
        let kImgUrl = "image"
        let $cardItem = $("<div>").addClass("card").css({"height":"176px","width":"126px"});
        let $innerDiv = $("<img>").attr("src", data[kCard][0][kImgUrl]).attr("alt", "Image description").addClass("img-fluid");
        $cardItem.append($innerDiv);
        $(".cardView").append($cardItem);
    })
    .catch(err =>{console.log(err)});
  };