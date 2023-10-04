<template>
  <div class="footer_cont" v-if="showNav">
    <div class="footer_btn_cont" @click="goUrl('/')">
      <div
        class="footer_btn_image footer_btn_main_image1"
        :class="{ footer_btn_main_image1_use: currntPage === 'Home' }"
      ></div>
      <div class="footer_btn_name1">충전소</div>
    </div>
    <div class="footer_btn_cont" @click="goUrl('/notification')">
      <div
        class="footer_btn_image footer_btn_main_image2"
        :class="{ footer_btn_main_image2_use: currntPage === 'Notification' }"
      ></div>
      <div class="footer_btn_name">공지사항</div>
    </div>
    <div class="footer_btn_cont" @click="goUrl('/charging')">
      <div
        class="footer_btn_image footer_btn_main_image3"
        :class="{ footer_btn_main_image3_use: currntPage === 'Charging' }"
      ></div>
      <div class="footer_btn_name">충전상태</div>
    </div>
    <div class="footer_btn_cont" @click="goUrl('/paymentHistory')">
      <div
        class="footer_btn_image footer_btn_main_image4"
        :class="{ footer_btn_main_image4_use: currntPage === 'PaymentHistory' }"
      ></div>
      <div class="footer_btn_name">결제내역</div>
    </div>
    <div class="footer_btn_cont" @click="goUrl('/user')">
      <div
        class="footer_btn_image footer_btn_main_image5"
        :class="{ footer_btn_main_image5_use: currntPage === 'User' }"
      ></div>
      <div class="footer_btn_name">마이페이지</div>
    </div>
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
    let showNav = ref(true);
    let currntPage = ref("");

    watch(
      () => route.name,
      () => {
        const bottomNav = route.meta.bottomNav;
        if (bottomNav === false) {
          showNav.value = false;
        } else {
          showNav.value = true;
        }
        switch (route.name) {
          case "Home":
            currntPage.value = "Home";
            break;
          case "Notification":
            currntPage.value = "Notification";
            break;
          case "Charging":
            currntPage.value = "Charging";
            break;
          case "PaymentHistory":
            currntPage.value = "PaymentHistory";
            break;
          case "User":
            currntPage.value = "User";
            break;
        }
        return { route };
      }
    );
    // let size = ref(document.getElementById("app").clientHeight);
    // console.log(size.value);
    // watch(
    //   () => size.value,
    //   () => {
    //     console.log("1212121212");
    //     if (size.value < 500) {
    //       document.getElementsByClassName("footer_cont").style.display = "none";
    //     } else {
    //       document.getElementsByClassName("footer_cont").style.display = "flex";
    //     }
    //   }
    // );
    const goUrl = (path) => {
      let needAuth = false;
      if (
        path === "/charging" ||
        path === "/paymentHistory" ||
        path === "/user"
      ) {
        needAuth = true;
      }
      if (sessionStorage.getItem("isLogin") !== "true" && needAuth === true) {
        router.push({ path: "/login" });
        sessionStorage.setItem("where", path);
      } else {
        router.push(path);
      }
    };

    return {
      showNav,
      goUrl,
      currntPage,
      // size,
    };
  },
};
</script>

<style scoped>
.footer_cont {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  width: 100%;
  /* padding-bottom: 5%; */
  border: none;
  border-radius: 25px 25px 0 0;
  background-color: #fff;
  z-index: 100000;
  box-shadow: 0px 0px 10px 2px #00000050;
}
.footer_btn_cont {
  display: flex;
  width: 20%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80%;
  padding-bottom: 2%;
}
.footer_btn_name {
  font-size: 1.3rem;
  /* padding-right: 3%; */
}
.footer_btn_name1 {
  font-size: 1.3rem;
  padding-right: 5%;
}
.footer_btn_image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 50%;
  background-image: url(../assets/icons/menu_01.png);
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
}
.footer_btn_main_image1 {
  background-image: url(../assets/icons/menu_01.png);
}
.footer_btn_main_image2 {
  background-image: url(../assets/icons/menu_02.png);
}
.footer_btn_main_image3 {
  background-image: url(../assets/icons/menu_03.png);
}
.footer_btn_main_image4 {
  background-image: url(../assets/icons/menu_04.png);
}
.footer_btn_main_image5 {
  background-image: url(../assets/icons/menu_05.png);
}
.footer_btn_main_image1_use {
  background-image: url(../assets/icons/menu_01_1.png);
}
.footer_btn_main_image2_use {
  background-image: url(../assets/icons/menu_02_1.png);
}
.footer_btn_main_image3_use {
  background-image: url(../assets/icons/menu_03_1.png);
}
.footer_btn_main_image4_use {
  background-image: url(../assets/icons/menu_04_1.png);
}
.footer_btn_main_image5_use {
  background-image: url(../assets/icons/menu_05_1.png);
}
</style>
