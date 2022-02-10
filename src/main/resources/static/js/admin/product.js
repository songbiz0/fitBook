// 상품등록
{
    const addBtn = document.querySelector('#add-detail-btn');
    const detailContainer = document.querySelector('#detail-container');
    const copyDetail = detailContainer.querySelector('#copy-detail');

    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('asd');
        detailContainer.appendChild(copyDetail);
    });
}