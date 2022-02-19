// QnA List
{
    const qnaListConainer = document.querySelector('.qna-list');
    if(qnaListConainer) {
        const tbodyElem = qnaListConainer.querySelector('table tbody');
        const cntContainer = qnaListConainer.querySelector('#cnt-con');
        const paginationElem = qnaListConainer.querySelector('.pagination');
        const seqElemList = qnaListConainer.querySelectorAll('.fa-solid');
        const url = '/ajax/admin/qnaList?';
        let currentPage = 1;
        let startIdx = 0;
        let rowCnt = 2;
        let pageCnt = 2;
        let maxPage = 1;

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
                });
        }
        const setList = (data) => {
            tbodyElem.innerHTML = '';
            data.forEach(item => {
                const trElem = document.createElement('tr');
                trElem.innerHTML = `
                    <td>${item.iquestion}</td>
                    <td>${item.idetail}</td>
                    <td>${item.nm}/
                    <img class="w50 h50" src="/imgPath/products/detail/${item.idetail}/${item.img}"></td>
                    <td>${item.color}</td>
                    <td>${item.uid}</td>
                    <td>${item.rdt}</td>
                `;
                tbodyElem.appendChild(trElem);
                cntContainer.innerText = "( 총 : " + data[0].cnt + '개 )';
                maxPage = Math.ceil((data[0].cnt / rowCnt));
            });
        }
        const makePagingUrl = (param) => {
            makePage(maxPage);
            let resultUrl = url + 'startIdx=' + startIdx + '&rowCnt=' + rowCnt;
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

        seqElemList.forEach(item => {
            item.addEventListener('click', (e) => {
                const seq = e.target;
                let param = { type: seq.id, typeNo: 0 };
                if(seq.classList.contains('fa-angle-down')) {
                    seq.classList.replace('fa-angle-down', 'fa-angle-up');
                    param.typeNo = 1;
                } else {
                    seq.classList.replace('fa-angle-up', 'fa-angle-down');
                    param.typeNo = 2;
                }
                getList(makePagingUrl(param));
            });
        });

        getList(makePagingUrl());
    }
}