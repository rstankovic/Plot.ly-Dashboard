var names = [];
var samples = [];
var metadata = [];
d3.json("./samples.json").then(function(data) {
    names = data.names;
    samples = data.samples;
    metadata = data.metadata;
    console.log(names);
    console.log(samples);
    console.log(metadata);
    // data.names.forEach(function(d) {
    //     names.push(d);
    // });
    // data.samples.forEach(function(d) {
    //     samples.push(d);
    // });
    // data.metadata.forEach(function(d) {
    //     metadata.push(d);
    // });
    var selection = d3.select("body").select("select");
    selection.selectAll("option")
        .data(names)
        .enter()
        .append("option")
        .attr("value",function(d) {
            return d;
        })
        .text(function(d) {
            return d;
        });
});
var patientData = [];
function plotBarPatient(patientInfo) {
    var tempYValues = patientInfo[0].otu_ids.slice(0, 10).reverse();
    var oneSec = [];
    tempYValues.forEach(function(name) {
        var fullID = "OTU_" + name;
        oneSec.push(fullID)
    });
    const yValues = oneSec;

    const xValues = patientInfo[0].sample_values.slice(0, 10).reverse();
    const textValues = patientInfo[0].otu_labels.slice(0,10).reverse();
    
    var trace = {
        type: "bar",
        orientation: "h",
        x: xValues,
        y: yValues,
        text: textValues
    };

    var layout = {
        title: "temp title",
    };

    Plotly.newPlot("bar", [trace], layout);
}

function plotBubblePatient(patientInfo) {
    var 
}

function optionChanged(patientName) {
    patientData = [];
    patientData.push(samples.find(patient => patient.id === patientName));
    patientData.push(metadata.find(patient => patient.id === parseInt(patientName)));
    plotBarPatient(patientData);
    plotBubblePatient(patientData);
}