<template>
  <div id="app">
    <!-- 加载中组件 -->
    <loading></loading>
    <transition name="van-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
import loading from "@/components/loading";
export default {
  name: "App",
  data() {
    return {};
  },
  //定义引入的组件
  components: {
    loading,
  },
  //计算属性
  computed: {},
  //变量监听
  watch: {},

  //页面加载前执行
  created() {},
  //页面加载后执行
  mounted() {},
  //自定义方法
  methods: {},
};
</script>
<style lang="less">
@import "../utils/public.css";
#app {
  font-size: 14px;
  width: 100%;
  height: auto;
}
</style>
