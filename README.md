<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/TaiZuon/chizzakura">
    <img src="https://i.imgur.com/xdWgAxc.png" alt="Logo">
  </a>

<h3 align="center">Chizzakura</h3>

  <p align="center">
    Website quản lý quán ăn, thực hiện bởi nhóm Shefu.
    <br />
    <br />
    <a href="http://fall2024c8g11.int3306.freeddns.org/"View Demo</a>
    ·
    <a href="https://github.com/TaiZuon/chizzakura/issues">Báo cáo lỗi</a>
    ·
    <a href="https://github.com/TaiZuon/chizzakura/issues">Đề xuất tính năng</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Mục lục</summary>
  <ol>
    <li>
      <a href="#introduction">Giới thiệu về dự án</a>
    </li>
    <li>
      <a href="#technology">Công nghệ sử dụng</a>
    </li>
    <li><a href="#installation">Hướng dẫn cài đặt trong local</a></li>
    <li><a href="#demo">Truy cập Demo</a></li>
    <li><a href="#features">Tính năng</a></li>
    <li><a href="#roadmap">Các cải tiến trong tương lai</a></li>
    <li><a href="#members">Các thành viên và đóng góp</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
<a name="introduction"></a>
## Giới thiệu về dự án

Đây là một website giúp việc quản lý nhà hàng và giao tiếp giữa nhân viên và khách hàng trở nên dễ dàng hơn. Dự án này là sản phẩm bài tập lớn của môn Phát triển ứng dụng Web (2425I_INT3306_8)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<a name="technology"></a>
## Công nghệ sử dụng

* [![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
* [![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
* [![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff)](#)
* [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](#)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a name="installation"></a>
## Hướng dẫn cài đặt trong local

Clone repository
```sh
git clone https://github.com/TaiZuon/chizzakura.git
cd chizzakura
```
Cài đặt và chạy Frontend
```sh
cd frontend
npm install
npm run start
```
Cài đặt và chạy Backend
Tạo một CSDL MySQL trên máy với tên `chizzakura`, chỉnh lại thông số như port, mật khẩu, username trong file .env cho phù hợp
```sh
cd backend
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run start
```

<a name="demo"></a>
## Truy cập demo

Demo của web có thể được truy cập qua đường link sau:

http://fall2024c8g11.int3306.freeddns.org/


<!-- USAGE EXAMPLES -->
<a name="features"></a>
## Tính năng

### 1. Khách hàng (Customer)

Khách hàng chính là đối tượng sử dụng chính của website, và họ có thể thực hiện các việc sau:
- Tạo tài khoản, đăng nhập
- Xem thực đơn
- Thêm các món vào giỏ hàng, gọi đơn hàng, sử dụng mã giảm giá
- Nhắn tin với nhân viên hỗ trợ
- Đánh giá món ăn đã đặt

### 2. Nhân viên (Employee)

Nhân viên sẽ là những người xử lý các hoạt động diễn ra trong quán, cụ thể bao gồm:

- Quản lý trạng thái các bàn trong quán
- Quản lý trạng thái của các món trong thực đơn
- Xử lý đơn hàng của khách
- Nhắn tin hỗ trợ khách hàng

### 3. Chủ quán (Owner)

Chủ quán là người có nhiều quyền hạn nhất, với các khả năng sau:

- Thêm, xoá, sửa các món, bàn, mã giảm giá của quán
- Tạo, chỉnh sửa các tài khoản của nhân viên

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
<a name="roadmap"></a>
## Các cải tiến trong tương lai

- [ ] Hoàn thiện tính năng đánh giá dịch vụ cho khách hàng
- [ ] Hoàn thiện tính năng báo cáo doanh thu cho chủ quán
- [ ] Tích hợp đặt món Online
- [ ] Cải thiện bảo mật của website


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
<a name="members"></a>
## Các thành viên và đóng góp

Nguyễn Thái Dương - 22026533
Quàng Thế Anh - 22026554
Lê Công Hoàng - 22026555
Trần Minh Tuấn - 22026557

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/TaiZuon/chizzakura/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/TaiZuon/chizzakura/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/TaiZuon/chizzakura/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/TaiZuon/chizzakura/issues
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
