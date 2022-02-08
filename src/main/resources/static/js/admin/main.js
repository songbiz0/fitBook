// 차트 예시

// const labels = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
// 'July',
// ];
//
// const data = {
//     labels: labels,
//     datasets: [{
//     label: 'My First dataset',
//     backgroundColor: 'rgb(255, 99, 132)',
//     borderColor: 'rgb(255, 99, 132)',
//     data: [0, 10, 5, 2, 20, 30, 45],
// }]
// };
//
// const config = {
//     type: 'line',
//     data: data,
//     options: {}
// };
//
// const myChart = new Chart(
//     document.getElementById('myChart'),
//     config
// );

// 막대 그래프
// const config = {
//     type: 'bar',
//     data: data,
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     },
// };


// 월별차트그래프 (막대)
{
    const year = new Date();
    const current_year = year.getFullYear();
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


    const data = {
        labels: labels,
        datasets: [{
            label: `${current_year}년 월별 차트`,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
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
            }
        },
    };

    const myChart = new Chart(
        document.getElementById('monthChart'),
        config
    );
}