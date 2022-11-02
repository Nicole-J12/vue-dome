<template>
  <div class="index bc_fff">
    <div class="pf t0 zin99 w100x">
      <van-search
        v-model="keyword"
        placeholder="Search..."
        @search="onSearch"
      />
    </div>
    <div class="bt_f5f5f5 pl10 mt50">
      <div class="h40 lin40">Recommend</div>
      <div class="hot-app-box">
        <div
          class="hot-app-item"
          v-for="(item, index) in hotAppList"
          :key="index"
          @click="jump(item.id.attributes['im:id'])"
        >
          <van-image
            class="app-logo"
            width="100px"
            height="100px"
            radius="15px"
            fit="cover"
            :src="item['im:image'][2].label"
          />
          <p class="app-name">{{ item["im:name"].label }}</p>
          <p class="app-type">{{ item.category.attributes.label }}</p>
        </div>
      </div>
    </div>
    <div class="bt_f5f5f5 pl10 list-box">
      <div
        class="list-item bb_f5f5f5"
        v-for="(item, index) in list"
        :key="index"
        @click="jump(item.id.attributes['im:id'])"
      >
        <div class="w30">{{ index + 1 }}</div>
        <van-image
          class="app-logo"
          width="75px"
          height="75px"
          fit="cover"
          lazy-load
          :src="item['im:image'][1].label"
        />
        <div class="flex1 ml10">
          <p class="app-name">{{ item["im:name"].label }}</p>
          <p class="app-type">{{ item.category.attributes.label }}</p>
        </div>
      </div>
      <div class="mh100v txt_c pt30" v-if="list.length == 0 && initData">
        暂无数据~
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      keyword: "",
      hotAppList: [], //熱門推薦列表
      list: [], //下載量最多列表,
      initList: [], //原始数组
      initData: false,
    };
  },
  watch: {
    keyword: {
      handler: function (newValue, oldValue) {
        if (!newValue) {
          this.list = JSON.parse(JSON.stringify(this.initList));
        }
      },
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      //请求热门推荐
      this.Axios.get(`/hk/rss/topgrossingapplications/limit=10/json`)
        .then((res) => {
          this.hotAppList = res.feed.entry;
        })
        .catch((err) => {});
      //请求下载量最多列表
      this.Axios.get(`/hk/rss/topfreeapplications/limit=100/json`)
        .then((res) => {
          this.list = res.feed.entry;
          this.initList = res.feed.entry;
          this.initData = true;
        })
        .catch((err) => {});
    },
    onSearch(val) {
      if (val) {
        let list = this.list.filter((item) => {
          return (
            item["im:name"].label.indexOf(val) != -1 ||
            item["title"].label.indexOf(val) != -1 ||
            item["summary"].label.indexOf(val) != -1
          );
        });
        this.list = list;
      } else {
        this.list = JSON.parse(JSON.stringify(this.initList));
      }
    },
    jump(id) {
      this.$router.push(`/detail?id=${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  .van-search {
    height: 1.3333rem;
    width: 100%;
    .van-search__content {
      border-radius: 15px;
    }
  }
}
.hot-app-box {
  width: 100%;
  display: flex;
  overflow-x: scroll;
  justify-content: space-enenly;
  .hot-app-item {
    display: inline-block;
    text-align: center;
    width: 100px;
    min-width: 100px;
    transition: transform 0.2;
    .app-name,
    .app-type {
      width: 80px;
      margin: 0 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .app-name {
      height: 28px;
      line-height: 28px;
    }
    .app-type {
      margin-bottom: 10px;
      color: #9a9a9a;
    }
  }
}
.list-item:nth-child(odd) {
  /deep/ .van-image__img {
    border-radius: 50%;
    border: 1px solid #f5f5f5;
  }
}
.list-item:nth-child(even) {
  /deep/ .van-image__img {
    border-radius: 10px;
    border: 1px solid #f5f5f5;
  }
}
.list-item {
  display: flex;
  align-items: center;
  padding: 10px;
  height: 90px;
  .app-name,
  .app-type {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 20px;
  }
  .app-type {
    color: #9a9a9a;
  }
}
</style>
