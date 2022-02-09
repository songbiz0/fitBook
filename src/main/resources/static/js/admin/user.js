{
    const tableElem = document.querySelector('.mytable');
    const tbodyElem = tableElem.querySelector('tbody');

    fetch('/ajax/admin/user')
        .then(res => res.json())
        .then(list => {
            console.log(list);
            getdata(list);
        })
        .catch(e => {
            console.log(e);
        });

    const getdata = (list) => {
        list.forEach(item => {
            const trElem = document.createElement('tr');
            trElem.innerHTML = `
                <td>${item.iuser}</td>
                <td>${item.uid}</td>
                <td>${item.nm}</td>
                <td>${item.nickname}</td>
                <td>${item.email}</td>
                <td>${item.post}</td>
                <td>${item.addr}</td>
                <td>${item.addr_detail}</td>
                <td>${item.point}</td>
            `;
            tbodyElem.appendChild(trElem);
            tableElem.appendChild(tbodyElem);
        })
    }
}