{
    const tableElem = document.querySelector('.mytable');
    const tbodyElem = tableElem.querySelector('tbody');

    fetch('/ajax/admin/order')
        .then(res => res.json())
        .then(list => {
            getdata(list);
        })
        .catch(e => {
            console.log(e);
        });

    const getdata = (list) => {
        list.forEach(item => {
            const trElem = document.createElement('tr');
            trElem.innerHTML = `
                <td>${item.iorder}</td>
                <td>${item.detailNm} (외 ${item.cnt}건)</td>
                <td>${item.rdt}</td>
                <td>${item.nm}/${item.uid}</td>
                <td>${item.spent_point}</td>
                <td>${item.payment_way}</td>
                <td>${item.order_status}</td>
                <td>${item.result_price}</td>
            `;
            tbodyElem.appendChild(trElem);
            tableElem.appendChild(tbodyElem);
        })
    }
}