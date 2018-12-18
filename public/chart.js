const socket = io.connect('localhost:4000');

var _chart = document.getElementById("myChart").getContext('2d');
var _value = document.getElementById("value");
var _text = document.getElementsByClassName("text")[0];


function updateChartData(chart, data) {
  chart.data.datasets[0].data = data;
  chart.update();
}


var myChart = new Chart(_chart, {
    type: 'line',
    data: {
        labels: ["", "", "", "", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", "", "", "", ""],
        datasets: [{
            label: 'Dolar',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:false
                }
            }]
        }
    }
});

socket.on('changeDollar', function(data){
    console.log(data);
    addAnimation();
    _value.innerHTML = data.value;
    updateChartData(myChart, data.chartData);
});

const addAnimation = () => {
    _text.classList.add('opacity');
    setTimeout(()=>{
        _text.classList.remove('opacity');
    },400)
}
