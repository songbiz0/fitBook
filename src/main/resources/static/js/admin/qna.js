// QnA List
{
    const qnaListConainer = document.querySelector('.qna-list');
    if(qnaListConainer) {
        const tbodyElem = qnaListConainer.querySelector('table tbody');
        const cntContainer = qnaListConainer.querySelector('#cnt-con');
        const url = '/ajax/admin/qnaList';
        const getList = () => {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setList(data);
                })
                .catch(e => {
                    console.error(e);
                });
        }
        const setList = (data) => {
            data.forEach(item => {
                const trElem = document.createElement('tr');
                trElem.innerHTML = `
                    <td>${item.iquestion}</td>
                    <td>${item.idetail}</td>
                    <td>${item.nm}/
                    <img class="w50 h50" src="/imgPath/products/detail/${item.idetail}/${item.img}"></td>
                    <td>${item.uid}</td>
                    <td>${item.rdt}</td>
                `;
                tbodyElem.appendChild(trElem);
                cntContainer.innerText = "( 총 : " + data[0].cnt + '개 )';
            });
        }
        getList();
    }
}