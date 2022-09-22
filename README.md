# # fitBook
노트북 쇼핑몰 프로젝트

※ 본 프로젝트는 코리아IT아카데미 웹 개발자 양성 과정(21.09.28 ~ 22.03.14) 마무리 팀 프로젝트입니다.

http://fitbook.shop/

※ 관리자 아이디 : admin / 비밀번호 : asd123

※ 테스트용 아이디 : songbiz / 비밀번호 : songbiz

<br>

# 목차
- [개발 환경](#개발-환경)
- [사용 기술](#사용-기술)
    * [백엔드](#백엔드)
    * [프론트엔드](#프론트엔드)
    * [기타 주요 라이브러리](#기타-주요-라이브러리)
- [E-R 다이어그램](#e-r-다이어그램)
- [프로젝트 목적](#프로젝트-목적)
    * [노트북 쇼핑몰 프로젝트를 기획한 이유?](#노트북-쇼핑몰-프로젝트를-기획한-이유?)
- [핵심 기능](#핵심-기능)
    * [기본적인 게시물 CRUD](#기본적인-crud)
    * [AJAX / Rest API](#ajax-/-rest-api)
    * [댓글과 대댓글 구현](#댓글과-대댓글-구현)
    * [Transaction](#transaction)
    * [Spring Scheduler](#spring-scheduler)
    * [노트북 추천 시스템](#노트북-추천-시스템)
- [역할 분담](#역할-분담)

<br>

## 개발 환경
- IntelliJ IDEA
- Postman
- GitHub
- HeidiSQL
- Visual Studio Code

<br>

## 사용 기술
### 백엔드
#### 주요 프레임워크 / 라이브러리
- Java 11
- Spring Boot 2.6.3
- Spring Security
- Mybatis

#### Build tool
- Maven

#### Database
- MariaDB

### 프론트엔드
- Javascript
- HTML/CSS
- Thymeleaf
- Fomantic-UI

#### 기타 주요 라이브러리
- Lombok
- SummerNote
- Chart.js

<br>

## E-R 다이어그램
![image](https://github.com/songbiz0/fitBook/blob/master/img/fitbook-1.png?raw=true)

<br>

## 프로젝트 목적

### 노트북 쇼핑몰 프로젝트를 기획한 이유? 

노트북은 대학생부터 직장인까지 필수품처럼 사용되는 전자기기이지만 평소에 컴퓨터에 큰 관심을 가지고 있지 않다면 자신에게 맞는 노트북이 무엇인지 판단하기가 어렵습니다.

실제로 저희 학원의 과정 중 노트북의 필요성을 느껴 새 노트북을 구매하는 학생들이 많았고, 저는 그 과정에서 어떤 노트북을 구매할지를 잘 몰라 고민하는 모습을 보았습니다.

그래서 가장 처음에 만들어보고 싶었던 기능은 사용자의 질문을 기반으로 사용자의 상황에 가장 어울리는 노트북을 추천해주는 페이지였습니다.

그리고 여기에 더해, 쇼핑몰 웹 사이트의 로직을 처음부터 구현해본다면 학원 과정 중 배운 내용들의 대부분을 직접 구현해볼 수 있는 좋은 기회라고 생각해 최종적으로 **사용자에게 어울리는 노트북을 추천해주는 쇼핑몰** 사이트를 프로젝트의 주제로 선정하게 되었습니다.

<br>

## 구현 기능

### 기본적인 CRUD

사용자 페이지의 배송지 등록/수정, 관리자 페이지의 상품과 부품의 등록/수정 등의 페이지에서 각각의 상황에 맞는 CRUD 로직을 구현하였습니다.

또한 사용자와 관리자가 같이 접근할 수 있는 공지사항 페이지는 글쓰기 기능의 경우 관리자 권한을 가지고 있는 경우에만 접근할 수 있도록 **시큐리티 설정**을 하였습니다.

![image](https://github.com/songbiz0/fitBook/blob/master/img/shipment.png?raw=true)
[사용자 페이지 배송지 등록]

<br>

### AJAX / Rest API

사용자와의 상호작용으로 인한 페이지 변환이 잦은 경우 자원의 효율적인 사용과 UX 개선을 위해 Rest API를 적극적으로 활용하였습니다.

[상품 담당 Rest Controller](https://github.com/songbiz0/fitBook/blob/master/src/main/java/com/fitbook/shop/ShopRestController.java#L1)

[AJAX 통신을 통해 화면을 그리는 주문 목록 페이지](https://github.com/songbiz0/fitBook/blob/230a0a25cbf5e7bedf10b66626ad2aa0aee06517/src/main/resources/static/js/mypage/list.js#L191)

<br>

### 댓글과 대댓글 구현

사용자의 상품 문의에 관리자가 답변을 달 수 있는 기능에서 댓글과 대댓글 기능을 구현하였습니다.

댓글 모델 내에 또 다른 댓글 리스트를 멤버 필드로 가질 수 있도록 모델 구조를 작성하여 대댓글의 개수와 관계없이 일정한 수의 댓글이 한 페이지에 표시될 수 있도록 하였습니다.

![image](https://github.com/songbiz0/fitBook/blob/master/img/comment.png?raw=true)
[상품 문의/댓글 페이지]

<br>

### Transaction

상품 주문 중 일어난 에러로 인하여 주문이 완료되지 않았음에도 장바구니에서 품목이 사라진다거나, 주문 테이블에는 레코드가 삽입되었지만 상세 주문 테이블에는 삽입되지 않는 등의 경우를 막기 위해 **Transaction** 기능을 사용하였습니다.

[트랜잭션을 활용한 주문 메소드](https://github.com/songbiz0/fitBook/blob/230a0a25cbf5e7bedf10b66626ad2aa0aee06517/src/main/java/com/fitbook/shop/ShopService.java#L267)

<br>

### Spring Scheduler

배송 완료 후 2주가 지나면 자동으로 주문 확정이 되며 적립금이 지급되는 시스템을 구현하기 위해서 **Spring Scheduler** 기능을 사용하였습니다.

![image](https://github.com/songbiz0/fitBook/blob/master/img/scheduler.png?raw=true)
[매일 자정마다 주문 상태 변경과 포인트 지급이 자동으로 진행되는 시스템]

<br>

### 노트북 추천 시스템

사이트에서 제공하는 질문에 대한 답변을 기반으로 개인마다 해당 노트북이 얼마나 어울리는지를 **적합도**로 환산해 제공하는 기능을 구현하였습니다.

![image](https://github.com/songbiz0/fitBook/blob/master/img/recommendation.png?raw=true)
[상품마다 표시되는 적합도]

<br>

## 역할 분담
김민재 (songbiz00@gmail.com) : 사용자 페이지 총괄, 스프링 시큐리티, DB 설계

유언수 (yueonsu@gmail.com) : 관리자 페이지 총괄, 파일 업로드, DB 설계

김동규 (sgrhrg@naver.com) : 관리자 페이지 상품 관련 페이지 담당

김규형 (gyuhyeong.kim@icloud.com) : 관리자 페이지 회원 관련 페이지 담당
