// 월별차트그래프 (막대) -------------------(start)
{
    const getMonthData = () => {
        fetch("/ajax/admin/month")
            .then(res => res.json())
            .then(list => {
                barGraph(list);
            })
            .catch(e => {
                console.log(e);
            });
    }
    getMonthData();

    const barGraph = (list) => {

        const labels = [];
        const datas = [];

        for(let i in list) {
            labels.push(i);
        }

        for(let i=0; i<labels.length; i++) {
            datas.push(list[labels[i]]);
        }
        const data = {
            labels: labels,
            datasets: [{
                label: "월간수익",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: datas,
            }]
        };


        const config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: false
            },
        };

        const myChart = new Chart(
            document.getElementById('monthChart'),
            config
        );
    }
}
// 월별차트그래프 (막대) -------------------(end)

// 브랜드수요 (원형) ----------------------(start)
{
    const getBrandDemandData = () => {
        fetch('/ajax/admin/brand')
            .then(res => res.json())
            .then(list => {
                console.log(list);
                doughnutGraph(list);
            })
            .catch(e => {
                console.log(e);
            })
    }
    getBrandDemandData();
    const doughnutGraph = (list) => {
        const label = [];
        const datas = [];

        for(let i in list) {
            label.push(i);
        }

        for(let i=0; i<label.length; i++) {
            datas.push(list[label[i]]);
        }

        const data = {
            labels: label,
            datasets: [{
                label: 'My First Dataset',
                data: datas,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        };

        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: false
            }
        };
        const myChart = new Chart(
            document.getElementById('brandDemand'),
            config
        );
    }
}
// 브랜드수요 (원형) ----------------------(end)

// 요번달수익 (줄그래프) -------------------(start)
{
    const getDailyData = () => {
        fetch("/ajax/admin/daily")
            .then(res => res.json())
            .then(list => {
                lineGraph(list);
            })
            .catch(e => {
                console.log(e);
            });
    }
    getDailyData();

    const lineGraph = (list) => {
        const label = [];
        const datas = [];
        for(let i in list) {
            label.push(i);
        }

        for(let i=0; i<label.length; i++) {
            datas.push(list[label[i]]);
        }
        const data = {
            labels: label,
            datasets: [{
                label: '이번 달 수익',
                data: datas,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        };
        const myChart = new Chart(
            document.getElementById('thisMonthChart'),
            config
        );
    }
}
// 요번달수익 (줄그래프) -------------------(end)