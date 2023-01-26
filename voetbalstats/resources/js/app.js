function fetchGoals(){
    var min = document.getElementById("minDisplay").textContent;
    var max = document.getElementById("maxDisplay").textContent;
    var stat = getStat();
    var url = "http://127.0.0.1:8000/api/" + stat + "/" + min + "/" + max
    fetch(url)
        .then(verwerkResponse)
        .then(getGoals)
        .catch(showError);
}

function verwerkResponse(response)
{
    if (response.ok){
        return response.json();
    }
    else{
        Promise.reject("internet error")
    }
}

function showError(){
    alert("Er ging iets verkeerd")
}

function getGoals(json){  
    deleteRows();
    for (i in json) {
        console.log(i)
      var row = document.createElement("TR");
      document.getElementById("output").appendChild(row);
  
      var data = document.createElement("TD");
      data.appendChild(document.createTextNode(json[i].naam));
      row.appendChild(data);
      console.log(json[i].naam)

      var stat = getStat();
      var data2 = document.createElement("TD");
      if (stat == "goals"){
        data2.appendChild(document.createTextNode(json[i].goals));
      }else if (stat == "assists"){
        data2.appendChild(document.createTextNode(json[i].assists));
      }else{
        data2.appendChild(document.createTextNode(json[i]["rode kaarten"]));
      }
      row.appendChild(data2);
    }
}

function onSelectChange(){
    deleteRows()
    var stat = getStat();
    if (stat == "rodeKaarten"){
        document.getElementById("min").setAttribute("max", 50)
        document.getElementById("max").setAttribute("max", 50)
    }else{
        document.getElementById("min").setAttribute("max", 500)
        document.getElementById("max").setAttribute("max", 500)
    }
    var header = document.getElementById("stat");
    header.innerHTML = document.getElementById("stats").value;   
}

function deleteRows(){
    var rowCount = document.getElementById("output").rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        document.getElementById("output").deleteRow(i);
    }
}

function getStat(){
    var stat = document.getElementById("stats").value.toLowerCase();
    if (stat == "rode kaarten"){
        stat = "rodeKaarten";
    }
    return stat;
}