// Use d3 to read the JSON file.
// The data from the JSON file is arbitrarily named importedData as the argument.
d3.json("data/data.json").then((importedData) => {
    // console.log(importedData);
    var data = importedData

  // Sort the data array by using the sample_values.
  data.sort(function(a, b) {
    return parseFloat(b.sample_values) - parseFloat(a.sample_values);
  });

  // Slice the first 10 objects for plotting.
  data = data.slice(0, 10);

  // Reverse the array because of the Plotly defaults.
  data = data.reverse();

  // Trace1 for the Greek data.
  var trace1 = {
    x: data.map(row => row.sample_values),
    y: data.map(row => row.otu_ids),
    text: data.map(row => row.otu_labels),
    name: "names",
    type: "bar",
    orientation: "h"
  };

  // Data
  var chartData = [trace1];

  // Apply the group bar mode to the layout.
  var layout = {
    title: "Greek gods search results",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with the id of "plot".
  Plotly.newPlot("plot", chartData, layout);
});
