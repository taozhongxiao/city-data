/* eslint-disable */
<template>
  <div class="home_container">
    <header>
      <router-link to="/">
        <img src="../../assets/city-data.png" />
      </router-link>
      <div class="headersection">
        <router-link to="/city"><span>城市对比</span></router-link>
        <router-link to="/province"><span>省份对比</span></router-link>
        <router-link to="/bbs"><span>论坛</span></router-link>
        <span></span>
        <div class="mainMenuSearch">
          <input type="text" placeholder="搜索" />
          <i class="el-icon-search" style="font-size: 18px"></i>
        </div>
        <span></span>
        <router-link to="/people" class="people"
          ><span>个人中心</span></router-link
        >
      </div>
    </header>
    <section>
      <p>稍安勿躁。</p><br>
      <p>注册功能正在开发中。</p>
    </section>
    <footer>
      <a
        href="https://github.com/taozhongxiao"
        title="github"
        target="_blank"
        class="iconfont"
        >&#xe6f6;</a
      >
      <a class="identity" href="http://beian.miit.gov.cn/" target="_blank"
        >鄂ICP备2021002553号</a
      >
      <p>Hosted by <b>taozhongxiao</b></p>
    </footer>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.home_container {
  margin: 0;
  padding: 0;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
header {
  border-bottom: 1px solid #e1e2e1;
  height: 80px;
  display: flex;
  justify-content: space-between;
  > a {
    width: 20%;
  }
  img {
    float: left;
    height: 25px;
    padding-left: 30px;
    margin-top: 27px;
  }
  .headersection {
    height: 80px;
    float: left;
    width: 80%;
    padding-right: 30px;
    display: flex;
    justify-content: space-between;
    .mainMenuSearch {
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        border: 0;
        border-bottom: 1px solid #e1e2e1;
        width: 200px;
        height: 20px;
      }
      input:focus {
        outline: none;
      }
      i {
        vertical-align: center;
      }
    }
    a {
      text-decoration: none;
      span {
        line-height: 80px;
        // padding-left: 70px;
        font-size: 14px;
        color: #808080;
      }
    }
  }
}
section {
  max-width: 1311px;
  width: 100%;
  margin: 0 auto;
  height: 440px;
  padding-top: 60px;
  p {
    font-size: 80px;
    font-weight: bold;
    margin-bottom: 30px;
    margin-top: 0;
  }
}
footer {
  height: 40px;
  margin: 0 4%;
  width: 92%;
  margin-top: 75px;
  border-top: 1px solid #e1e2e1;
  line-height: 40px;
  > p {
    line-height: 55px;
    display: block;
    float: right;
    margin: 0;
    font-size: 14px;
  }
  a {
    display: block;
    font-size: 16px;
    float: left;
    font-weight: bold;
    margin: 0 25px 0 0;
    line-height: 55px;
    color: #000000;
    text-decoration: none;
  }
  .identity {
    position: absolute;
    left: 50%;
    font-weight: normal;
    transform: translateX(-50%);
    font-size: 14px;
  }
  > a:hover {
    color: #808080;
  }
}
</style>
