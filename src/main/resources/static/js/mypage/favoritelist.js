const maxPageUrl = '/mypage/api/maxpagefav';
const getListUrl = '/mypage/api/favlist';
const nullMessage = '좋아요한 상품이 없습니다.';

const recordCount = 10;
let currentPage = 1;
let maxPage = 1;

const searchPaginationElem = document.querySelector('#searchPagination');
const tbodyElem = document.querySelector('#tbody');

const makeActive = item => {
    item.classList.remove('link');
    item.classList.add('active');
}

const makeLink = item => {
    item.classList.remove('active');
    item.classList.add('link');
}

const getMaxPage = () => {
    fetch(maxPageUrl, {
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
        loadList();
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
            loadList();
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
        loadList();
    });

    searchPaginationElem.appendChild(a3);
}

const loadList = () => {
    fetch(getListUrl, {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            recordCount,
            currentPage
        })
    }).then(res => res.json())
        .then(data => {
            makeList(data);
            getMaxPage();
        })
        .catch(err => {
            console.error(err);
        });
}

const makeList = list => {
    tbodyElem.innerHTML = '';

    if (list.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML =
            `<td rowspan="1" colspan="5" class="btline h100">${nullMessage}</td>`
        tbodyElem.appendChild(tr);
    }

    list.forEach(item => {
        const price = Number(item.price);
        const dcRate = Number(item.dc_rate);
        const dcPrice = Number(price * dcRate);
        const resultPrice = Number(price - dcPrice);
        const point = Math.floor(price * 0.001);

        const tr = document.createElement('tr');
        tr.classList.add('products');
        tr.innerHTML =
            `<div class="disnone">${item.iproduct}</div>
             <td><div class="ui checkbox chk"><input type="checkbox"><label></label></div></td>
             <td>
                <div class="fr w100p ct gap20">
                    <img src="/imgPath/products/detail/${item.idetail}/${item.img}" width="100px" height="100px">
                            <div class="taleft">
                                <div class="mb5">${item.brand} ${item.nm}</div>
                                <div class="mb5">${item.product_code}</div>
                            </div>
                </div>
</td>
<td>${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
<td>
    <b>-${dcPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</b>
    <br>(${point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 적립 예정)
</td>
<td>
    <b>${resultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</b>
</td>`
        tbodyElem.appendChild(tr);
    });
}

loadList();

//

const allChkElem = document.querySelector('#allChk');

$('#allChk').checkbox().first().checkbox({
    onChecked: () => { $('.chk').checkbox('check'); },
    onUnchecked: () => { $('.chk').checkbox('uncheck'); }
});

//

const delBtnElem = document.querySelector('#delBtn');
const cartBtnElem = document.querySelector('#cartBtn');

delBtnElem.addEventListener('click', () => {
    const productsArr = [];

    const productsElem = document.querySelectorAll('.products');
    productsElem.forEach(item => {
        const eachChkElem = item.querySelector('.chk');
        if($(eachChkElem).checkbox('is checked')) {
            productsArr.push(Number(item.querySelector('.disnone').innerText));
        }
    });

    fetch('/mypage/api/delfav', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productsArr)
    }).then(res => res.json())
        .then(data => {
            if(data.result === 0) {
                makeErrorToast('상품 삭제에 실패했어요.');
            } else {
                loadList();
            }
        })
        .catch(err => console.error(err));
});

cartBtnElem.addEventListener('click', () => {
    const productsArr = [];

    const productsElem = document.querySelectorAll('.products');
    productsElem.forEach(item => {
        const eachChkElem = item.querySelector('.chk');
        if($(eachChkElem).checkbox('is checked')) {
            productsArr.push(Number(item.querySelector('.disnone').innerText));
        }
    });

    fetch('/mypage/api/inscart', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productsArr)
    }).then(res => res.json())
        .then(data => {
            if(data.result === 0) {
                makeErrorToast('장바구니에 담는데 실패했어요.');
            } else {
                makeInfoToast('상품을 장바구니에 담았어요.');
            }
        })
        .catch(err => console.error(err));
});