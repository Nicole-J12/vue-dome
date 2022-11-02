<template>
  <div class="loading_box" :class="{ showBox: loading, hideBox: !loading }">
    <div class="loading" :class="{ show: loading, hide: !loading }">
      <van-loading class="dib lhw" color="white" />
      <div class="fs12 pt8">加载中...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {};
  },
  //定义引入的组件
  components: {},
  //计算属性
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  //变量监听
  watch: {
    loading(val) {
      if (val) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
  },
  //页面加载前执行
  created() {},
  //页面加载后执行
  mounted() {},
  //离开页面时执行
  destroyed() {},
  //自定义方法
  methods: {},
};
</script>

<style lang="less" scoped>
.loading_box {
  top: 0;
  left: 0;
  position: fixed;
  height: 100%;
  width: 100%;
}

.showBox {
  z-index: 9999;
}

.hideBox {
  z-index: -999;
}

.loading {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100px;
  width: 120px;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  border-radius: 8px;
  margin: 0 auto;
  padding: 20px;
  color: white;
  transition: 500ms;
}

.hide {
  opacity: 0;
}

.show {
  opacity: 1;
  -webkit-transition-delay: 1.5s;
  -moz-transition-delay: 1.5s;
  -ms-transition-delay: 1.5s;
  -o-transition-delay: 1.5s;
  transition-delay: 1.5s;
}

.lhw {
  height: 35px;
  width: 35px;
}
</style>
