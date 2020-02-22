window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "G6 Countries and China Energy Consumption vs. Generation"
        },
        axisY: {
            title: "M TOE"
        },
        legend: {
            cursor:"pointer",
            itemclick : toggleDataSeries
        },
        toolTip: {
            shared: true,
            content: toolTipFormatter
        },
        data: [{
            type: "bar",
            showInLegend: true,
            name: "Consumption",
            color: "black",
            dataPoints: [
                { y: 153.45, label: "Italy" },
                { y: 432.03, label: "Japan" },
                { y: 247.09, label: "France" },
                { y: 175.88, label: "United Kingdom" },
                { y: 311.25, label: "Germany" },
                { y: 2155.23, label: "USA" },
                {y: 3063.43, label: "China" }

            ]
        },
        {
            type: "bar",
            showInLegend: true,
            name: "Estimated Generation",
            color: "#A57164",
            dataPoints: [
                { y: 22.24, label: "Italy" },
                { y: 87.01, label: "Japan" },
                { y: 47.98, label: "France" },
                { y: 29.14, label: "United Kingdom" },
                { y: 53.98, label: "Germany" },
                { y: 65.37, label: "USA" },
                {y: 483.45, label: "China" }
            ]
        }]
    });
    chart.render();
    
    function toolTipFormatter(e) {
        var str = "";
        var total = 0 ;
        var str3;
        var str2 ;
        for (var i = 0; i < e.entries.length; i++){
            var str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\">" + e.entries[i].dataSeries.name + "</span>: <strong>"+  e.entries[i].dataPoint.y + "</strong> <br/>" ;
            total = e.entries[i].dataPoint.y - total;
            str = str.concat(str1);
        }
        str2 = "<strong>" + e.entries[0].dataPoint.label + "</strong> <br/>";
        str3 = "<span style = \"color:Tomato\">Generation minus consumption: </span><strong>" + total + "</strong><br/>";
        return (str2.concat(str)).concat(str3);
    }
    
    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
    
    }
    
