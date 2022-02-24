const pointHistoryTbodyElem = document.querySelector('#pointHistoryTbody');

const makeActive = item => {
    item.classList.remove('link');
    item.classList.add('active');
}

const makeLink = item => {
    item.classList.remove('active');
    item.classList.add('link');
}

const recordCount = 10;
let currentPage = 1;
let maxPage = 1;

const getMaxPage = () => {
    fetch('/mypage/api/maxpagepoint', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            recordCount
        })
    }).then(res => res.json())
        .then(data => {
            maxPage = Math.max(data.result, 1);
            makePage();
        })
        .catch(err => {
            console.error(err);
        });
}

const searchPaginationElem = document.querySelector('#searchPagination');

const makePage = () => {
    searchPaginationElem.innerHTML = '';

    const a1 = document.createElement('a');
    if (currentPage <= 10) {
        a1.classList.add('disabled');
    }
    a1.classList.add('item');
    a1.innerHTML = `<i class="angle left icon mr0"></i>`;

    a1.addEventListener('click', () => {
        if (a1.classList.contains('disabled')) {
            return;
        }
        currentPage = currentPage - (currentPage % 10 === 0 ? 10 : currentPage % 10);
        loadPointHistory();
    });

    searchPaginationElem.appendChild(a1);

    const startPage = currentPage - (currentPage % 10 === 0 ? 10 : currentPage % 10) + 1;
    const lastPage = Math.min(maxPage, startPage + 9);

    for (let i = startPage; i <= lastPage; i++) {
        const a2 = document.createElement('a');
        if (currentPage === i) {
            a2.classList.add('active');
        }
        a2.classList.add('item');
        a2.innerText = i;

        a2.addEventListener('click', () => {
            if (a2.classList.contains('active')) {
                return;
            }
            currentPage = Number(a2.innerText);
            loadPointHistory();
        });

        searchPaginationElem.appendChild(a2);
    }

    const a3 = document.createElement('a');
    if (currentPage > Math.floor(maxPage / 10) * 10) {
        a3.classList.add('disabled');
    }
    a3.classList.add('item');
    a3.innerHTML = `<i class="angle right icon mr0"></i>`;

    a3.addEventListener('click', () => {
        if (a3.classList.contains('disabled')) {
            return;
        }
        currentPage = currentPage - (currentPage % 10 === 0 ? 10 : currentPage % 10) + 11;
        loadPointHistory();
    });

    searchPaginationElem.appendChild(a3);
}

const loadPointHistory = () => {
    fetch('/mypage/api/pointhistory', {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            recordCount,
            currentPage
        })
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            makeList(data);
            getMaxPage();
        })
        .catch(err => {
            console.error(err);
        });
}

const makeList = list => {
    pointHistoryTbodyElem.innerHTML = '';

    if (list.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML =
            `<td rowspan="1" colspan="3" class="btline h100">포인트 변동 내역이 없습니다.</td>`
        pointHistoryTbodyElem.appendChild(tr);
    }

    list.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML =
            `<td>
                <div>${item.reason}</div>
            </td>
            <td>
                <div>${item.changed_point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            </td>
            <td>            
                <div>${item.rdt.toString().substring(0, 10)}</div>
            </td>`
        pointHistoryTbodyElem.appendChild(tr);
    });
}

loadPointHistory();