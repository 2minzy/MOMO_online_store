## 🔍 Project Overview
대학생 코딩 연합 동아리 멋쟁이 사자처럼 스터디에서 진행한 프로젝트로, 
E-commerce형태의 웹 서비스를 구현해보는 스터디가 진행되어 시작하게 된 프로젝트입니다.

>✨ 아래 링크에서 프로젝트 데모 확인이 가능합니다.
[MOMO Demo](https://momostores.herokuapp.com/)

<br />

#### 사용기술
- HTML5 / CSS3
- JavaScript(ES6+)
- React
- Redux, Redux-thunk
- MongoDB, Mongoose
- Node.js
- Express
- SCSS(BEM 활용)
- Gsap

#### 구현기능사항
- 회원가입/로그인/로그아웃
- 프로덕트 페이지네이션
- 상품 검색
- 카테고리 검색
- 제품 상세 페이지
- 상품 리뷰
- 주문확인용 사용자 마이 페이지 , 프로필
- 주문 Checkout 프로세스 (shipping -> payment method -> order)
- 장바구니
- 페이팔/신용카드 결제기능
- Admin 유저, 제품, 주문 관리 페이지
- 반응형 웹

<hr />

### ✨ 랜딩페이지
![](https://images.velog.io/images/bbio3o/post/727a72bc-2843-438d-a03e-13f4d26f160a/%E1%84%8B%E1%85%A9%E1%84%87%E1%85%A5%E1%84%87%E1%85%B2%E1%84%87%E1%85%B2.gif)
<br />
**GSAP을 이용한 스크롤 애니메이션**, Landing page 내에서 view를 누르면 프로덕트 페이지(/shop)으로 이동합니다.

<br />

### ✨ Shop 제품리스트[카테고리 검색, 페이지네이션 함께 구현]
![](https://images.velog.io/images/bbio3o/post/e89f36d2-0c50-4f92-9f8d-bbef8e7ec150/shop.gif)
<br />
카테고리별로 상품 검색을 할 수 있는 **카테고리 필터 기능**과 **페이지네이션** 구현

<br />

### ✨ 회원가입 / 로그인 / 로그아웃 
![](https://images.velog.io/images/bbio3o/post/96cbba6d-68fb-4d51-a175-cc9d1a6c134c/%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB.gif)
<br />
로그인을 하면 랜딩페이지('/')로 이동하고 로그아웃을 하면 '/login'페이지로 리다이렉트 됩니다.<br />
jwt를 이용하여 토큰을 생성하고 비워주고(로그아웃), authMiddleware를 통해 토큰을 비교하는 방식으로 <br />
로그인 authorization을 구현하였으며, user가 admin인 확인해주는 미들웨어 또한 구현하였습니다.

<br />

### ✨ 제품 상세페이지 / 리뷰
![](https://images.velog.io/images/bbio3o/post/86f794b0-c3d7-4241-b17a-7bccd4c77fac/%E1%84%8C%E1%85%A6%E1%84%91%E1%85%AE%E1%86%B7%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%91%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%B5.gif)
<br />
제품 상세페이지에서 재고확인과 상품 리뷰를 남길 수 있으며, 장바구니에 담을 수 있는 기능을 구현하였습니다.

<br />

### ✨ 검색기능
![](https://images.velog.io/images/bbio3o/post/3b79b3d6-4fdc-4d1e-8517-ed011afd29af/%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8.gif)
<br />
navbar의 돋보기 아이콘을 클릭하면, 검색이 가능한 페이지로 이동되고**('/shop/search')**<br />
키워드를 입력하면 해당하는 아이템을 볼 수 있도록 구현하였습니다.

<br />

### ✨ 장바구니
![](https://images.velog.io/images/bbio3o/post/dab08876-2412-465d-917f-d80d4c38991b/%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%87%E1%85%A1%E1%84%80%E1%85%AE%E1%84%82%E1%85%B5.gif)
<br />
제품 상세페이지에서 마음에 드는 상품을 **장바구니에 추가**가 가능하며, **Cart 페이지에서 삭제와 수량 변경, 주문하기** 등의 기능이 가능합니다.

<br />

### ✨ 주문 프로세스
![](https://images.velog.io/images/bbio3o/post/cf553969-1c4c-480d-aa8c-1afe5325714e/%E1%84%8C%E1%85%AE%E1%84%86%E1%85%AE%E1%86%AB%E1%84%80%E1%85%AA%E1%84%8C%E1%85%A5%E1%86%BC.gif)
<br />
유저가 장바구니에서 주문하기를 누르면 **Checkout process** 페이지로 넘어가 배송지를 입력하고, 결제 방식을 선택, 주문 확인을 하면 결제 페이지로 이동하게 됩니다.

<br />

### ✨ 결제
![](https://images.velog.io/images/bbio3o/post/7a65cd0a-e02a-4094-9c9c-7fc494e43455/%E1%84%91%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%91%E1%85%A1%E1%86%AF%E1%84%80%E1%85%A7%E1%86%AF%E1%84%8C%E1%85%A6.gif)
<br />
**페이팔 결제 모듈**을 통해 페이팔이나 신용카드로 결제가 가능하도록 구현하였습니다.

<br />

### ✨ 마이페이지
![](https://images.velog.io/images/bbio3o/post/42d5f626-abdd-440b-a27f-64a7473852f4/%E1%84%86%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%91%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%B5.gif)
<br />
유저는 프로필에서 **유저 정보**와 **주문 정보**,  **배송 상태** 등이 확인 가능합니다.

<br />

### ✨ 관리자 페이지
![](https://images.velog.io/images/bbio3o/post/db2202d1-c8e9-443a-91ab-a7e133c5a3cf/%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%91%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%B5.gif)
<br />
Admin 페이지에서 admin 유저는 **전체 유저의 목록확인, 유저 정보 수정, 삭제가 가능**하며<br />
**전체 제품 확인, 등록, 삭제, 업데이트(수정)** 할 수 있도록 각각 **CRUD 기능을 구현**하였습니다.<br />
<br />
order 페이지 주문 목록 리스트가 확인 가능하며, 배송이 완료되면 admin유저는 **배송완료를 클릭하여 유저에게 배송이 완료되었음을 알립니다.**

<br />

### ✨ 반응형 웹
![](https://images.velog.io/images/bbio3o/post/94ff8d10-6948-477f-9c24-fde77d28e6ad/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-01-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.59.40.jpg)
<br />
데스크탑, 아이패드, 모바일 순으로 반응형 웹을 구현하였습니다.

<br />
