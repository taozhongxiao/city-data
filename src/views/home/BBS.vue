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
      <div class="item1">
        <img src="../../assets/西安市.jpg" alt="" />
        <p>西安市</p>
        <span
          >西安的历史人文积淀极为深厚，是中国著名的文化及旅游名城。其是中国历史上第一个被称为京的城市，拥有着3100多年的建城史。</span
        >
      </div>
      <div class="item2">
        <img src="../../assets/杭州市.jpg" alt="" />
        <img src="../../assets/杭州市2.jpg" alt="" />
        <p>杭州市</p>
        <span
          >根据2012年7月上海交通大学发布的“2012年中国都市圈评价指数”，杭州圈在中国大陆是仅次于上海圈、广州圈、首都圈的第四大都市圈。2015年杭州经济总量位居中国大陆第十，并被《福布斯》多次评为中国大陆最佳商业城市。</span
        >
        <span
          >作为阿里巴巴、网易等互联网行业企业的总部所在，杭州对互联网行业人员等具有较强的人口吸引力，因此2010年代开始流行的新一线城市里面，杭州是主要的代表城市之一，自2014年以来的人口快速增长，引起了对当地住宅价格快速上涨、优质教育资源供不应求等多方面的担忧。</span
        >
      </div>
      <div class="item3">
        <div>
          <p>常州市</p>
          <span
            >水陆空交通条件良好，京沪高铁、苏南沿江铁路、沪宁城际铁路、盐泰锡宜城际铁路、京沪铁路、沪宁高速公路等穿境而过，并有常州港及常州奔牛国际机场，与上海、南京、杭州皆等距相邻，并与苏州、无锡构成苏锡常都市圈，有“江南明珠”之誉。</span
          >
        </div>
        <img src="../../assets/常州市.jpg" alt="" />
      </div>
      <div class="item4">
        <img src="../../assets/兰州市.jpg" alt="" />
        <p>兰州市</p>
        <span
          >兰州是中国陆域版图的几何中心，一带一路重要节点城市，中国重要的铁路枢纽，包兰、兰新、兰青、陇海、兰渝、成兰等铁路交汇于此。</span
        >
      </div>
      <div class="item5">
        <img src="../../assets/宜昌市.jpg" alt="" />
        <div>
          <p>宜昌市</p>
          <span
            >全市总面积21,230平方公里，人口413.59万，市人民政府驻西陵区。宜昌扼长江三峡东口，素有“三峡门户，川鄂咽喉”之称，是葛洲坝水电站和三峡水电站的所在地，被誉为世界水电之都，中国动力心脏，巴楚文化发源地。</span
          >
        </div>
      </div>
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
export default {}
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
  padding-top: 60px;
  width: 100%;
  max-width: 1311px;
  margin: 0 auto;
  display: grid;
  justify-content: space-between;
  grid-template-columns: 23.5% 23.5% 23.5% 23.5%;
  grid-template-rows: repeat(2, 320px);
  grid-auto-flow: row dense;
  grid-row-gap: 15px;
  img {
    width: 100%;
  }
  > div {
    transition: all 0.4s;
    padding: 15px;
    border-radius: 10px;
    background-color: #fafafb;
    p {
      margin-top: 9px;
      margin-bottom: 7px;
      font-size: 16px;
      font-weight: bold;
    }
    span {
      margin-top: 12px;
      font-size: 13px;
      color: #808080;
      display: block;
    }
  }
  .item2 {
    grid-row-start: 1;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-end: 3;
    img {
      width: 100%;
      margin-bottom: 15px;
    }
  }
  .item3 {
    grid-row-start: 1;
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row-end: 2;
    display: flex;
    justify-content: space-between;
    div {
    width: 35%;
    padding-right: 30px;
    }
    img {
      height: 100%;
      margin-bottom: 15px;
    }
  }
  .item5 {
    grid-row-start: 2;
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row-end: 3;
    display: flex;
    justify-content: space-between;
    div {
      padding-left: 20px;
    }
    img {
      height: 100%;
      margin-bottom: 15px;
    }
  }
  div:hover {
    box-shadow: 3px 3px 5px#eee;
  }
}
footer {
  height: 40px;
  margin: 0 4%;
  width: 92%;
  margin-top: 60px;
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
