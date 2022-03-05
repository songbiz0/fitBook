// 회원 목록 ----------------------------------------------------------------------------------[start]
{
    const userListElem = document.querySelector('.user-list');
    if(userListElem) {
        const iuserTrElemArr = userListElem.querySelectorAll('.iuser-tr');
        const sortElem = userListElem.querySelector('#rdt-sort');
        iuserTrElemArr.forEach(item => {
            item.addEventListener('click', (e) => {
                const trData = e.target.closest('.iuser-tr');
                const iuser = trData.dataset.iuser;
                const url = `/admin/userinfo?iuser=${iuser}`;
                const option = 'with = 500, height = 500, top = 100, left = 200, location = no';
                const name = 'userinfo';
                window.open(url, name, option);
            });
        });

        sortElem.addEventListener('change', () => {
            const selectVal = userListElem.querySelector('#type').value;
            const searchVal = userListElem.querySelector('#search').value;
            const sortVal = sortElem.value;


        });
    }
}