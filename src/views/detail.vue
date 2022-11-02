<template>
  <div class="details bc_fff" v-if="Object.keys(data).length > 0">
    <div class="header flex pa10">
      <div class="">
        <van-image
          class="app-logo"
          width="100px"
          height="100px"
          radius="15px"
          fit="cover"
          :src="data.artworkUrl100"
        />
      </div>
      <div class="ml10">
        <p class="h40">{{ data.trackCensoredName }}</p>
        <p class="h40 text">{{ data.releaseNotes }}</p>
      </div>
    </div>
    <van-grid :column-num="3">
      <van-grid-item>
        <div class="txt_c">
          <p>评分</p>
          <p>{{ data.averageUserRating.toFixed(1) }}</p>
        </div>
      </van-grid-item>
      <van-grid-item>
        <div class="txt_c">
          <p>年龄</p>
          <p>{{ data.trackContentRating }}</p>
        </div>
      </van-grid-item>
      <van-grid-item>
        <div class="txt_c">
          <p>版本</p>
          <p>{{ data.version }}</p>
        </div>
      </van-grid-item>
    </van-grid>
    <div class="mh100v pt30">
      {{ data.description }}
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      id: "",
      data: {},
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.Axios.get(`/hk/lookup?id=${this.id}`)
      .then((res) => {
        this.data = res.results ? res.results[0] : {};
      })
      .catch((err) => {});
  },
};
</script>

<style lang="less" scoped>
.text {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 20px;
}
</style>