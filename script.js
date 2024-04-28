google.charts.load('current', {'packages':['corechart', 'table']});
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            drawPieChart(data.pieData);
            drawLineChart(data.salesData);
            drawBarChart(data.employeeData);
            drawDataTable(data.employeeData);
            drawDonutChart(data.pieData);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function drawPieChart(pieData) {
    var data = google.visualization.arrayToDataTable([
        ['Category', 'Sales'],
        ...pieData.map(item => [item.category, item.sales])
    ]);

    var options = {
        title: 'Sales by Category',
        is3D: true, // Enable 3D effect
    };

    var chart = new google.visualization.PieChart(document.getElementById('pie-chart'));

    chart.draw(data, options);
}

function drawLineChart(salesData) {
    var data = google.visualization.arrayToDataTable([
        ['Month', 'Sales'],
        ...salesData.map(item => [item.month, item.sales])
    ]);

    var options = {
        title: 'Monthly Sales',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('line-chart'));

    chart.draw(data, options);
}

function drawBarChart(employeeData) {
    var data = google.visualization.arrayToDataTable([
        ['Name', 'Sales'],
        ...employeeData.map(item => [item.name, item.sales])
    ]);

    var options = {
        title: 'Employee Sales',
        legend: { position: 'top' }
    };

    var chart = new google.visualization.BarChart(document.getElementById('bar-chart'));

    chart.draw(data, options);
}

function drawDataTable(employeeData) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Sales');
    data.addRows(
        employeeData.map(item => [item.name, item.sales])
    );

    var table = new google.visualization.Table(document.getElementById('data-table'));

    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
}

function drawDonutChart(pieData) {
    var data = google.visualization.arrayToDataTable([
        ['Category', 'Sales'],
        ...pieData.map(item => [item.category, item.sales])
    ]);

    var options = {
        title: 'Sales by Category',
        pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donut-chart'));

    chart.draw(data, options);
}
