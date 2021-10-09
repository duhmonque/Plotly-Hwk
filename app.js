var individualBacteriaData = [];
var selectMenu;
// Use d3 to read the JSON file.
// The data from the JSON file is arbitrarily named importedData as the argument.
d3.json("samples.json").then((importedData) => {
    // console.log(importedData);

    individualBacteriaData = importedData.samples;

    //merge the 3 corresponding arrays into a property called otu and then sort
    individualBacteriaData = individualBacteriaData.map((z) => {
     

            var tempObj = {id: z.id, otus: []};
            console.log(z.otu_ids);
            for(let idx = 0; idx<z.otu_ids.length;idx++)
            {
                tempObj.otus.push({id: z.otu_ids[idx], label: z.otu_labels[idx], value: z.sample_values[idx]});
            }
                return tempObj;
           
    

    })
selectMenu = document.getElementById("selDataset");
individualBacteriaData.forEach(i => {
    var el = document.createElement("option");
    el.setAttribute("value", i.id);
    el.innerHTML = i.id.toString();
    selectMenu.appendChild(el);


});
console.log(individualBacteriaData);


//   // Render the plot to the div tag with the id of "plot".
//   Plotly.newPlot("plot", chartData, layout);
optionChanged(selectMenu.value);
});
function optionChanged(val){
    console.log("individual's data");

    var myData = individualBacteriaData.filter(i=>i.id.toString()==val.toString())[0];
    var top10 = myData.otus.slice(0, 10);
    var horizontalBar = [{
        type: 'bar',
        x: top10.map(m=> m.value).reverse(),
        y: top10.map(m=> "OTU  " + m.id).reverse(),
        orientation: 'h',
        mode: 'markers',
        marker: {size:1600},
        text: top10.map(m=> m.label).reverse(),
      }];
      var layout = {title: 'Hover over the points to see the text' ,hovermode:'closest'};
      var myPlot = document.getElementById("horizontalBar");
      Plotly.newPlot('horizontalBar', horizontalBar, layout);
      var hoverInfo = document.getElementById('hoverinfo');
      myPlot.on('plotly_hover', function(data){
        var infotext = data.points.map(function(d){
          return "hover";
        });
    
        hoverInfo.innerHTML = infotext.join('<br/>');
    })
     .on('plotly_unhover', function(data){
        hoverInfo.innerHTML = '';
    });
}
    // Bubble Chart
    var bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        hovermode: "closest"
        xaxis: { title: "OTU ID"},
        margin: {t:30}
    }
    var bubbleData = [
        {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }
    ];
    
    Plotly.newPlot("bubble", bubbleData, layout);
    var yticks = otu_ids.slice(0,10).map(function(otuID){
        return 'OTU ${otuID}';
    }).reverse();

    var barData = [
        {
            y:yticks,
            x:sample_values.slice(0,10).reverse(),
            text:otu_labels.slice(0,10).reverse(),
            type:"bar",
            orientation: "h"
        }
    ];
    var barLayout = {
        title: "Top Bacteria Cultures Found",
        margin: {t:30, l:150}
    };

    Plotly.newPlot("bar", barData, barLayout)
})
    var metadata = data.metadata;
    var resultsArray = metadata.filter(function(data)){
        return data.id == sample;
    })
    console.log(resultsArray);
    var result = resultsArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");

    Object.entries(result).forEach(function([key, value]){
        PANEL.append("h6").text(`${key.toUpperCase()}:${value}`);
    })
