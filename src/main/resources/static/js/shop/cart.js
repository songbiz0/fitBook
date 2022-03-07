const makeList = list => {
    const tbodyElem = document.querySelector('#tbody');
    tbodyElem.innerHTML = '';
    let totalPrice = 0;

    list.forEach(item => {
        const tr = document.createElement('tr');
        totalPrice += item.price * item.quantity;
        tr.innerHTML =
            `<td><div class="ui checkbox" data-idetail="${item.idetail}"><input type="checkbox"><label></label></div></td>
                    <td>
                        <div class="fr w100p ct gap20">
                            <img src="/imgPath/products/detail/${item.idetail}/${item.img}"
                                 width="100px" height="100px">
                            <div class="taleft minw140">
                                <div class="mb5">${item.brand} ${item.nm}</div>
                                <div class="mb5">${item.product_code}</div>
                                <div class="c777777">옵션 : ${item.option}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="w40 ib">
                            <div class="ui mini fluid selection dropdown">
                                <input type="hidden" name="quantity">
                                <i class="dropdown icon"></i>
                                <div class="default text cb">${item.quantity}</div>
                                <div class="scrollhint menu"></div>
                            </div>
                        </div>
                    </td>
                    <td><b>${item.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원'}</b></td>
                    <td><b>${item.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원'}</b><br>
                        <p>(${item.accumulate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원 적립 예정'}</p></td>
                    <td><b class="resultPriceB">${(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원'}</b></td>`

        const menuElem = tr.querySelector('.scrollhint.menu');
        for(let i=1; i<=item.stock; i++) {
            const div = document.createElement('div');
            div.className = 'item';
            div.innerText = i;
            menuElem.appendChild(div);
        }

        const dropdownElem = tr.querySelector('.dropdown.ui')
        $(dropdownElem).dropdown('setting', 'onChange', () => {
            const quantity = $(dropdownElem).dropdown('get value');
            fetch(`/shop/api/updcart?idetail=${item.idetail}&quantity=${quantity}`)
                .then(res => res.json())
                .then(data => {
                    if(data.result === 1) {
                        loadList();
                    }
                })
                .catch(err => { console.error(err); });
        });

        tbodyElem.append(tr);
    });

    document.querySelector('#totalPriceB').innerText = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';
}

const loadList = () => {
    fetch('/shop/api/selcart')
        .then(res => res.json())
        .then(data => {
            makeList(data);
        }).catch(err => { console.error(err); });
}
loadList();


document.querySelector('#delBtn').addEventListener('click', () => {
    const productsArr = [];

    const productsElem = document.querySelectorAll('tr:not(:first-child)');
    productsElem.forEach(item => {
        const eachChkElem = item.querySelector('.ui.checkbox');
        if($(eachChkElem).checkbox('is checked')) {
            productsArr.push(eachChkElem.dataset.idetail);
        }
    });

    fetch('/shop/api/delcart', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productsArr)
    }).then(res => res.json())
        .then(data => {
            if(data.result > 0) {
                loadList();
            } else {
                makeErrorToast('상품 삭제에 실패했어요.');
            }
        }).catch(err => { console.error(err); });
});