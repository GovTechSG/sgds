var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};


var config = {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],

            label: 'Dataset 1'
        }],
        labels: [
            'Red',
            'Orange',
            'Yellow',
            'Green',
            'Blue'
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
};

var config2 = {
    type: 'bar',
    data: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Spet", "Oct", "Nov", "Dec"],
        datasets: [{
            label: 'Total Sales Per Month',
            data: [2100, 1119, 3234, 5123, 2123, 3123, 1232, 1400, 1200, 5000, 3000, 4000],
            backgroundColor: 'rgba(22, 59, 101, 1)',
            borderColor: 'rgba(22, 59, 101, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};

var config3 = {
    type: 'radar',
    data: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Spet", "Oct", "Nov", "Dec"],
        datasets: [{
            label: 'Total API Calls',
            data: [2100, 1119, 3234, 5123, 2123, 3123, 1232, 1400, 1200, 5000, 3000, 4000],
            backgroundColor: 'rgba(22, 59, 101, 1)',
            borderColor: 'rgba(22, 59, 101, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};



window.onload = function() {
    var ctx = document.getElementById('topAPI').getContext('2d');
    var myChart = new Chart(ctx, config2);


};

