/* Permier tableau */
var div = document.createElement("div");
div.id = "divtab";
var container = document.getElementById("mw-content-text");

container.insertBefore(div, table1);

var data = [];
var table = document.getElementById("table1");
var years = table.getElementsByTagName("tr")[1].getElementsByTagName("th");
var yearsArray = [];

for(let i = 2; i < years.length; i++) {
        let content = years[i].innerHTML;
        yearsArray.push(content);
}

var rows = table.getElementsByTagName("tr");

for(let i = 2; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");

        for(let j = 0; j < cells.length; j++) {
                if(j === 0) {
                        var pays = cells[j].innerHTML;
                }

                else if(!isNaN(parseInt(cells[j].innerHTML))) {
                        data.push({data:parseInt(cells[j].innerHTML), pays:pays, years:yearsArray[j-1]});
                }

        }
}

var svg = dimple.newSvg("#divtab", "100%", 450);
var myChart = new dimple.chart(svg, data);
myChart.setBounds(30, 110, "100%", 305);
var x = myChart.addCategoryAxis("x", "years");
myChart.addMeasureAxis("y", "data");
myChart.addSeries("pays", dimple.plot.line);
myChart.addSeries("pays", dimple.plot.scatter);
myChart.addLegend(10, 10, "100%", 200);
myChart.draw();

/* Deuxième tableaux */

var div = document.createElement("div");
div.id = "divtab2";
var newContainer = document.getElementById("mw-content-text");

newContainer.insertBefore(div, table2);

var data = [];
var table = document.getElementById("table2");
var years = table.getElementsByTagName("tr")[0].getElementsByTagName("th");
var yearsArray = [];

for(let i = 2; i < years.length; i++) {
        let content = years[i].innerHTML;
        yearsArray.push(content);
}

var rows = table.getElementsByTagName("tr");

for(let i = 2; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");

        for(let j = 0; j < cells.length; j++) {
                if(j === 0) {
                        var pays = cells[j].innerHTML;
                }

                else if(!isNaN(parseInt(cells[j].innerHTML))) {
                        data.push({data:parseInt(cells[j].innerHTML), pays:pays, years:yearsArray[j-1]});
                }

        }
}

var svg = dimple.newSvg("#divtab2", "100%", 450);
var myChart = new dimple.chart(svg, data);
myChart.setBounds(30, 110, "100%", 305);
var x = myChart.addCategoryAxis("x", "years");
x.addOrderRule("years", false);
var y = myChart.addMeasureAxis("y", "data");
y.addOrderRule("data", false);
myChart.addSeries("pays", dimple.plot.line);
myChart.addSeries("pays", dimple.plot.scatter);
myChart.addLegend(20, 0, "100%", 300);
myChart.draw();

/* Troisième tableaux */


var myRequest = new XMLHttpRequest();
var dataBecode;
var data = [];
function createCont(){
  var tabAjax = document.createElement("div");
  tabAjax.classList.add("Ajax");
  var tabParAjax = document.getElementById("content");
  var bodyContent = document.getElementById("bodyContent");
  tabParAjax.insertBefore(tabAjax,bodyContent);
}

createCont();

myRequest.open ("GET","https://inside.becode.org/api/v1/data/random.json");
myRequest.onload = function(){
 dataBecode = JSON.parse(myRequest.responseText);
for (var i = 0; i < dataBecode.length; i++) {
  let obj = {
    "x": dataBecode[i][0],
    "y": dataBecode[i][1]
  }
  data.push(obj);
}

var svgUp = dimple.newSvg(".Ajax", 800, 600);

     var chartUp = new dimple.chart(svgUp, data);
     chartUp.addCategoryAxis("x", "x");
     chartUp.addMeasureAxis("y", "y");
     chartUp.addSeries(null, dimple.plot.bar);
     myChart.addSeries("data", dimple.plot.scatter);
     chartUp.draw();
     updateChart();
 console.log(data)
};
myRequest.send();

function updateChart(){
  myRequest.open ("GET","https://inside.becode.org/api/v1/data/random.json");
  myRequest.onload = function(){
   dataBecode = JSON.parse(myRequest.responseText);
  for (var i = 0; i < dataBecode.length; i++) {
    let obj = {
      "x": dataBecode[i][0],
      "y": dataBecode[i][1]
    }
    data.push(obj);

  }
d3.select(".Ajax").remove();
createCont();

  var svgUp = dimple.newSvg(".Ajax", 800, 600);
       var chartUp = new dimple.chart(svgUp, data);
       chartUp.addCategoryAxis("x", "x");
       chartUp.addMeasureAxis("y", "y");
       chartUp.addSeries(null, dimple.plot.bar);
       chartUp.draw();
   console.log(data)
  };
  myRequest.send();

setTimeout(function(){updateChart()}, 1000);

}
