var names = [];
var samples = [];
var metadata = [];
d3.json("./samples.json").then(function(data) {
    names = data.names;
    samples = data.samples;
    metadata = data.metadata;
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
    const xValues = patientInfo[0].otu_ids;
    const yValues = patientInfo[0].sample_values;
    const markerSizes = patientInfo[0].sample_values;
    const markerColors = xValues;
    const textValues = patientInfo[0].otu_labels;
    var trace = {
        mode: "markers",
        marker: {
            size: markerSizes,
            color: markerColors
        },
        x: xValues,
        y: yValues,
        text: textValues
    };

    var layout = {
        title: "temp title",
        showlegend: false,
    };
    
    Plotly.newPlot("bubble", [trace], layout);
}

function pullDemographicInfo(patientInfo) {
    var stuff = [];
    for (var key in patientInfo[1]) {
        var newstuff = [];
        newstuff.push(key);
        newstuff.push(patientInfo[1][key]);
        stuff.push(newstuff.join(": "));
    };
    var clearTable = [];
    d3.select("#striped_table_body").selectAll("tr")
        .data(clearTable)
        .exit()
        .remove();
    d3.select("#striped_table_body").selectAll("tr")
        .data(stuff)
        .enter()
        .append("tr")
        .text(function(d) {return d;});
}

function installGauge(patientInfo) {
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: patientInfo[1].wfreq,
            title: { text: "Scrubbing Frequency" },
            type: "indicator",
            mode: "gauge+number",
        }
    ];
    
    var layout = { 
        width: 600, 
        height: 500, 
        margin: { t: 0, b: 0 }
    };
    Plotly.newPlot('gauge', data, layout);
}

function optionChanged(patientName) {
    patientData = [];
    patientData.push(samples.find(patient => patient.id === patientName));
    patientData.push(metadata.find(patient => patient.id === parseInt(patientName)));
    plotBarPatient(patientData);
    plotBubblePatient(patientData);
    pullDemographicInfo(patientData);
    installGauge(patientData);
}