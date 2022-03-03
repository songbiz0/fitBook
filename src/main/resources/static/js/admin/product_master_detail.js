{
    const detailTableElem = document.querySelector('.product-master');
    const delBth = document.querySelector('#delBth')
    const detailset = document.querySelector('.button-list')
    const updBth = document.querySelector('#modBth');
    let params = (new URL(document.location)).searchParams;
    const iproduct = params.get('iproduct')
    const detailUrl = `/admin/product_master_detail?iproduct=${iproduct}`

    if(detailTableElem){
        delBth.addEventListener('click' , ()  => {
            const iproduct = detailset.dataset.iproduct;
            console.log('dddd');
            if(confirm(`${iproduct}번 상품 삭제`)){
                fetch(detailUrl , {
                    method : 'delete'
                })
                    .then(res => res.json())
                    .then(data => {
                        location = '/admin/product_master'
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }
        });

        updBth.addEventListener('click', () => {
            location.href = `/admin/product_master_mod?iproduct=${iproduct}`
        });
    }









}