$(document).ready(function () {
    $("#inputForm").submit(function (e) {
        e.preventDefault();
    });
    $("#btnSearch").on("click", searchStarWarChar);
});

function searchStarWarChar() {
    let url = "https://www.swapi.tech/api/people/";
    let searchingName = $("#inputName").val();
    $("#inputName").val("");
    fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
        .then(res => {
            if (res.ok)
                return res.json();
            throw new Error('Failed to get repos');
        })
        .then(data => {
            //filter
            let peopleList = data.results;
            let key = "name";
            let kUrl = "url";
            const firstMatch = peopleList.find(p => p[key] == searchingName);
            if (firstMatch != undefined) {
                getStarWarChar(firstMatch[kUrl]);
            } else {
               $("#output").html("There is no such character!");
            }
        })
        .catch(err => console.log(err));
}

function getStarWarChar(url) {
    fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    .then(res =>{
        if (res.ok)
                return res.json();
            throw new Error('Failed to get load');
    })
    .then(data =>{
        let kName = "name";
        let kHeight= "height";
        let kMass = "mass";
        let kGender = "gender";
        let kHColor= "hair_color";
        let prop = data.result.properties;
        
        let s = `Name: ${prop[kName]}
                Height: ${prop[kHeight]}
                Mass: ${prop[kMass]} 
                Gender: ${prop[kGender]}
                Hair Color: ${prop[kHColor]}
                `;
        $("#output").html(s);
    })
    .catch(err => console.log(err));
}