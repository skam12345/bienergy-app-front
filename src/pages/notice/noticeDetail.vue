<template>
  <div class="notices">
    <div class="notice">
      <div class="notice-title">{{ noticeData.nbTitle }}</div>
      <div class="notice-date">{{ noticeData.nbRegDate }}</div>
    </div>
    <div class="notice-content" v-html="noticeData.nbContent"></div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "NoticeDetail",
  setup() {
    const route = useRoute();
    let noticeData = ref();
    noticeData = route.query;
    console.log(noticeData);
    return {
      noticeData,
    };
  },
};
</script>

<style scoped>
.notices {
  padding-left: 1.7rem;
  padding-right: 1.7rem;
  width: 100%;
  height: 92%;
  background: white;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  font-family: "../src/assets/font/NotoSansCJKkr-Regular.otf";
}
.notices::-webkit-scrollbar {
  display: none;
}
.notice {
  border-bottom: 0.13rem solid #f3f3f7;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.notice-title {
  font-size: 1.97rem;
  line-height: 33pt;
  text-align: left;
  letter-spacing: -0.79pt;
  font-family: "../src/assets/font/NotoSansCJKkr-Bold.otf";
  font-weight: bold;
}
.notice-date {
  font-size: 1.3rem;
  letter-spacing: 33pt;
  letter-spacing: -0.65pt;
  color: #868a93;
}
.notice-content {
  font-size: 1.4rem;
  font-family: "../src/assets/font/NotoSansCJKkr-Regular.otf";
  line-height: 26.7pt;
  letter-spacing: -0.56pt;
  text-align: left;
}
</style>
