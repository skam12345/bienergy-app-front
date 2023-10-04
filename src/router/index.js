import { createRouter, createWebHistory } from "vue-router";
// import Home from "../pages/index.vue";
import Notification from "../pages/notice/notification.vue";
import NoticeDetail from "../pages/notice/noticeDetail.vue";
import KakaoMap from "@/components/KakaoMap.vue";
import Charging from "../pages/charging/charging.vue";
import PaymentHistory from "../pages/payment/paymentHistory.vue";
import paymentDetail from "../pages/payment/paymentDetail.vue";
import Pay from "../pages/pay/pay.vue";
import User from "../pages/user/user.vue";
import Login from "../pages/login/login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: "/",
    //   name: "Home",
    //   component: Home,
    // },
    {
      path: "/notification",
      name: "Notification",
      component: Notification,
      meta: { topNav: true, bottomNav: true, pageTitle: "공지 사항" },
    },
    {
      path: "/noticeDetail",
      name: "NoticeDetail",
      component: NoticeDetail,
      meta: { topNav: true, bottomNav: true, pageTitle: "공지 사항" },
    },
    {
      path: "/",
      name: "Home",
      component: KakaoMap,
      meta: { bottomNav: true, pageTitle: "충전소" },
    },
    {
      path: "/charging",
      name: "Charging",
      component: Charging,
      meta: { topNav: true, bottomNav: true, pageTitle: "충전상태" },
    },
    {
      path: "/pay",
      name: "Pay",
      component: Pay,
      meta: { topNav: true, bottomNav: false, pageTitle: "결제하기" },
    },
    {
      path: "/paymentHistory",
      name: "PaymentHistory",
      component: PaymentHistory,
      meta: { topNav: true, pageTitle: "결제 내역" },
      // beforeEnter(to, from, next) {
      //   if (sessionStorage.getItem("isLogin") !== "true") {
      //     next({ name: "Login" });
      //   } else {
      //     next();
      //   }
      // },
    },
    {
      path: "/paymentDetail",
      name: "paymentDetail",
      component: paymentDetail,
      meta: { topNav: true, bottomNav: false, pageTitle: "" },
      // beforeEnter(to, from, next) {
      //   if (sessionStorage.getItem("isLogin") !== "true") {
      //     next({ name: "Login" });
      //   } else {
      //     next();
      //   }
      // },
    },
    {
      path: "/user",
      name: "User",
      component: User,
      meta: { topNav: true, bottomNav: true, pageTitle: "마이페이지" },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { topNav: true, bottomNav: true, pageTitle: "로그인" },
    },
  ],
});

export default router;
