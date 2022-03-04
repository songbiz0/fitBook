// QnA List
{
    const qnaListConainer = document.querySelector('.qna-list');
    if(qnaListConainer) {
        const tbodyElem = qnaListConainer.querySelector('table tbody');
        const selectElem = qnaListConainer.querySelector('#select');
        const cntContainer = qnaListConainer.querySelector('#cnt-con');
        const paginationElem = qnaListConainer.querySelector('.pagination');
        const seqElemList = qnaListConainer.querySelectorAll('.fa-solid');
        const url = '/ajax/admin/qnaList?';
        let selectVal = selectElem.value;
        let param;
        let currentPage = 1;
        let startIdx = 0;
        let rowCnt = 3;
        let pageCnt = 3;
        let maxPage = 1;
        let typeNo = 0;
        let type;
        let seq;

        const getList = (url) => {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setList(data); // maxPage 갖고 오는거 여기에 있음
                    makePage(maxPage);
                })
                .catch(e => {
                    console.error(e);
                    isEmpty();
                });
        }
        const subString = (txt) => {
            let result = txt;
            if(result.length > 70) {
                result = result.substr(0, 70) + ' …';
            }
            return result;
        }
        const setList = (data) => {
            tbodyElem.innerHTML = '';
            cntContainer.innerText = ('(총 : ' + data[0].maxPage + '개)');
            try {
                maxPage = Math.ceil(data[0].maxPage / rowCnt);
            } catch (e) {
                maxPage = 0;
                console.log(e);
            }
            data.forEach(item => {
                const ctnt = subString(item.ctnt);
                console.log(item);
                const trElem = document.createElement('tr');
                trElem.classList.add('cspointer');
                trElem.addEventListener('click', () => {
                    const url = `/shop/detail?iproduct=${item.iproduct}`;
                    const name = 'detail';
                    const option = 'with = 500, height = 500, top = 100, left = 200, location = no';
                    window.open(url, name, option);
                });
                trElem.innerHTML = `
                    <td><img class="custom-img" src="/imgPath/products/detail/${item.idetail}/${item.img}/"></td>
                    <td>
                        <p>${item.productNm}</p>
                        <p>${item.product_code}</p>
                    </td>
                    <td class="min-w400 max-w400">${ctnt}</td>
                    <td>${item.nm}(${item.uid})</td>
                    <td>${item.rdt}</td>
                `;
                const tdElem = document.createElement('td');
                tdElem.innerText = item.cnt;
                trElem.appendChild(tdElem);
                tbodyElem.appendChild(trElem);

            });
        }
        const isEmpty = () => {
            tbodyElem.innerHTML = '';
            const trElem = document.createElement('tr');
            trElem.innerHTML = `
                <td colspan="6"><strong>질문이 없습니다</strong></td>
            `;
            tbodyElem.appendChild(trElem);
        }
        const makePagingUrl = (param) => {
            makePage(maxPage);
            let resultUrl = url + 'startIdx=' + startIdx + '&rowCnt=' + rowCnt +'&select=' + selectVal;
            if(param) {
                for(let i=0; i<Object.keys(param).length; i++) {
                    resultUrl = resultUrl + '&' + Object.keys(param)[i] + '=' + param[Object.keys(param)[i]];
                }
            }
            console.log(resultUrl);
            return resultUrl;
        }
        const makePage = (max) => {
            paginationElem.innerHTML = '';

            startIdx = (currentPage - 1) * rowCnt;
            const pop = Math.ceil(currentPage / pageCnt);
            const lastPage = pop * pageCnt;
            const startPage = lastPage - (pageCnt - 1);
            let status = 'disabled';

            const leftElem = document.createElement('a');
            if(currentPage === 1 || max === 0) { leftElem.classList.add(status); }
            leftElem.classList.add('item');
            leftElem.innerHTML = `<i class="angle left icon mr0"></i>`;
            leftElem.addEventListener('click', () => {
                currentPage = currentPage === 1 ? 1 : (currentPage - 1);
                getList(makePagingUrl());
            });
            paginationElem.appendChild(leftElem);

            for(let i=startPage; i<=(lastPage < max ? lastPage : max); i++) {
                if(max == 0) {
                    return;
                }
                const aElem = document.createElement('a');
                let status;
                aElem.innerText = i;
                if(currentPage === i) { status = 'active'; }
                aElem.classList.add('item');
                aElem.classList.add(status);
                paginationElem.appendChild(aElem);
                aElem.addEventListener('click', () => {
                    currentPage = i;
                    getList(makePagingUrl());
                });
            }

            const rightElem = document.createElement('a');
            if(currentPage === max || max === 0) { rightElem.classList.add(status); }
            rightElem.classList.add('item');
            rightElem.innerHTML = `<i class="angle right icon mr0"></i>`;
            rightElem.addEventListener('click', () => {
                currentPage = currentPage === max ? max : (currentPage + 1);
                getList(makePagingUrl());
            });
            paginationElem.appendChild(rightElem);
        }

        selectElem.addEventListener('change', () => {
            let param = {
                type : 'rdt',
                typeNo : 2
            }
            selectVal = selectElem.value;
            currentPage = 1;
            getList(makePagingUrl(param));
        });

        seqElemList.forEach(item => {
            item.addEventListener('click', (e) => {
                seq = e.target;
                param = { type: seq.id, typeNo: 0 };
                if(seq.classList.contains('fa-angle-down')) {
                    seq.classList.replace('fa-angle-down', 'fa-angle-up');
                    typeNo = 1;
                    param.typeNo = typeNo;
                } else {
                    seq.classList.replace('fa-angle-up', 'fa-angle-down');
                    typeNo = 2;
                    param.typeNo = typeNo;
                }
                getList(makePagingUrl(param));
            });
        });

        let initParam = {
            type : 'rdt',
            typeNo : 2
        }
        getList(makePagingUrl(initParam));
    }
}

// QnA Detail
{

}