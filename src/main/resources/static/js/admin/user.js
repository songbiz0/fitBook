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
                <td>${item.email}</td>
                <td>${item.recent_price}</td>
                <td>${item.result_price}</td>
                <td>${item.recent_rdt}</td>
                <td>${item.join_rdt}</td>
                <td>${item.point}</td>
            `;
            tbodyElem.appendChild(trElem);
            tableElem.appendChild(tbodyElem);
        })
    }



    const searchFrm = document.querySelector('.search_form');
    searchFrm.addEventListener('submit', (e) => {
        e.preventDefault();
        const typeVal = document.querySelector('#searchSel').value;
        const keywordVal = document.querySelector('#keyword').value;

        fetch(`/ajax/admin/selectUserSearchList?type=${typeVal}&keyword=${keywordVal}`)
            .then(res => res.json())
            .then(list => {

                const listTableElem = document.querySelector('#listTable');
                listTableElem.querySelector('tbody').innerHTML = '';

                list.forEach(item => {
                    const trElem = document.createElement('tr');
                    trElem.innerHTML = `
                <td>${item.iuser}</td>
                <td>${item.uid}</td>
                <td>${item.nm}</td>
                <td>${item.email}</td>
                <td>${item.recent_price}</td>
                <td>${item.result_price}</td>
                <td>${item.recent_rdt}</td>
                <td>${item.join_rdt}</td>
                <td>${item.point}</td>
            `;
                    tbodyElem.appendChild(trElem);
                    tableElem.appendChild(tbodyElem);
                })

            })
            .catch(e => {
                console.log(e);
            });
    });
}