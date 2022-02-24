Github 주소 :
https://github.com/songbiz0/fitBook

관리자페이지에서 상세페이지 만들 때 이거 복사해서:
                                <th:block layout:fragment="content">
                                    여기에 작성하면 됩니다잇~
                                </th:block>


쿼리문 변경:
t_admin 삭제
t_user role varchar(10) not null default 'ROLE_USER' 추가
t_address post(int) -> post(varchar)
t_product_master : rdt(datetime) -> rdt(date)
t_product_master : weight, size -> float

2022-02-21
t_order : pre_order_status (order_status 랑 동일, NULL 허용)
t_notice : alert table t_notice add title varchar(30) not null;
