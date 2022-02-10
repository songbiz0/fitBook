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
                <td>${item.rdt}</td>
                <td>${item.nm}</td>
                <td>${item.uid}</td>
                <td>${item.spent_point}</td>
                <td>${item.payment_way}</td>
                <td>${item.order_status}</td>
                <td>${item.result_price}</td>
                <td>${item.cdt}</td>
            `;
            tbodyElem.appendChild(trElem);
            tableElem.appendChild(tbodyElem);
        })
    }
}