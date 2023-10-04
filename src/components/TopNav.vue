<template>
  <div v-if="showNav" class="top_nav_cont" :class="{ bgGray: bgGray }">
    <div
      @click="goBack()"
      class="top_nav_back_btn"
      :class="{ colorWhite: bgGray }"
    ></div>
    <div class="top_nav_title">{{ pageTitle }}</div>
    <div class="top_nav_icon"></div>
  </div>
</template>

<script>
// import { onMounted, ref, onBeforeMount, onUpdated, computed, reactive, watch } from "vue";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    let showNav = ref("");
    let pageTitle = ref("");
    let bgGray = ref(false);

    watch(
      () => route.name,
      () => {
        const topNav = route.meta.topNav;
        const routeName = route.name;
        pageTitle.value = route.meta.pageTitle;
        // topNav 노출 여부
        if (!topNav) {
          showNav.value = false;
        } else {
          showNav.value = true;
        }
        // 결제내역 상세 일때 topNav 색상 변경
        if (routeName === "paymentDetail") {
          bgGray.value = true;
        } else {
          bgGray.value = false;
        }
        return { route };
      }
    );

    const goBack = () => {
      router.go(-1);
    };
    return {
      showNav,
      goBack,
      pageTitle,
      bgGray,
    };
  },
};
</script>

<style scoped>
.bgGray {
  background-color: rgb(51, 56, 68) !important;
}
.colorWhite {
  background-image: url(@/assets/icons/arrow_btn.png) !important;
  transform: scaleX(-1);
}
.top_nav_cont {
  width: 100%;
  /* height: 5vh; */
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #fff;
}
.top_nav_back_btn {
  width: 10%;
  height: 75%;
  background-image: url(@/assets/icons/back.png);
  background-repeat: no-repeat;
  background-size: 1.2rem;
  background-position: center;
}
.top_nav_title {
  width: 75%;
  text-align: center;
  /* padding-right: 10%; */
  font-size: 1.6rem;
}
.top_nav_icon {
  width: 15%;
  height: 100%;
  background-image: url(@/assets/icons/bienergy.png);
  background-repeat: no-repeat;
  background-size: 4rem;
  background-position: center;
}
</style>
