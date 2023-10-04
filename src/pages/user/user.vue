<template>
  <div class="user_cont" v-if="userInfo">
    <div class="user_info_cont">
      <div class="user_info_text_cont">
        <div class="user_info_text_id font_bold font_2rem">
          {{ userInfo.usdId }}
        </div>
        <div class="user_info_text_email font_1_4rem">
          {{ userInfo.usdEmail }}
        </div>
      </div>
      <div class="user_info_pic"></div>
    </div>
    <div class="user_car_info_cont">
      <div class="user_car_info_number_cont">
        <div class="user_car_info_icon"></div>
        <div class="user_car_info_text">
          <div class="font_1_6rem">차량 설정</div>
          <div class="user_car_info_content font_1_4rem font_blue">
            {{ userInfo.usdCarType }}
          </div>
        </div>
        <div class="user_car_info_btn"></div>
      </div>
      <div class="user_car_info_border"></div>
      <div class="user_car_info_charging_cont">
        <div class="user_car_info_charger_icon"></div>
        <div class="user_car_info_text">
          <div class="font_1_6rem">최대 충전 량</div>
          <div class="user_car_info_content font_1_4rem font_blue">
            {{ userInfo.usdMaxCharge }}kW
          </div>
        </div>
        <div class="user_car_info_btn"></div>
      </div>
    </div>
    <div class="user_notice_cont">
      <div class="user_car_info_notice_cont">
        <div class="user_car_info_notice_icon"></div>
        <div class="user_car_info_text" @click="goUrl('/notification')">
          <div class="font_1_6rem">공지 사항</div>
        </div>
        <div class="user_car_info_btn"></div>
      </div>
    </div>
    <div class="user_log_out_cont font_1_4rem" @click="logOut()">로그 아웃</div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "@/axios";
import { useRouter } from "vue-router";
export default {
  components: {},
  setup() {
    const router = useRouter();
    let userInfo = ref();
    // 로그인 상태 확인
    const isLogin = () => {
      if (sessionStorage.getItem("isLogin") !== "true") {
        router.push({ path: "/login" });
      }
    };
    // 로그아웃
    const logOut = () => {
      const check = confirm("로그 아웃 하시겠습니까?");
      if (check) {
        // sessionStorage.removeItem("isLogin");
        sessionStorage.clear();
        router.push({ path: "/" });
      }
    };
    // 페이지 이동
    const goUrl = (path) => {
      router.push({ path: path });
    };
    // 유저 정보 불러오기
    const getUserInfo = async () => {
      console.log("유저 정보 불러오기");
      let usdNo = sessionStorage.getItem("usdNo");
      console.log(usdNo);
      try {
        const res = await axios.post("/app/userData/UserInfo", {
          usdNo: usdNo,
        });
        if (res.data) {
          userInfo.value = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    };

    isLogin();
    getUserInfo();
    return {
      logOut,
      goUrl,
      getUserInfo,
      userInfo,
    };
  },
};
</script>

<style scoped>
.user_cont {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.user_info_cont {
  width: 100%;
  height: 15%;
  background-color: #fff;
  margin-bottom: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
}
.user_info_pic {
  background-image: url(@/assets/icons/img_01.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 20%;
  height: 60%;
}
.user_info_text_cont {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.user_info_text_email {
  color: rgb(149 153 161);
}
.user_car_info_cont {
  width: 100%;
  height: 20%;
  background-color: #fff;
  margin-bottom: 5%;
  padding: 0 5%;
}
.user_car_info_number_cont {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user_car_info_charging_cont {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user_car_info_icon {
  height: 30%;
  width: 7%;
  background-image: url(@/assets/icons/car.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.user_car_info_charger_icon {
  height: 30%;
  width: 7%;
  background-image: url(@/assets/icons/charge.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.user_car_info_notice_icon {
  height: 30%;
  width: 7%;
  background-image: url(@/assets/icons/notice.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.user_car_info_text {
  width: 80%;
  height: 100%;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.user_car_info_btn {
  width: 5%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(@/assets/icons/arrow_btn.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.user_car_info_border {
  width: 96%;
  height: 1%;
  border: 1px solid rgb(243 243 247);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2%;
}
.user_notice_cont {
  width: 100%;
  height: 8%;
  background-color: #fff;
  margin-bottom: 3%;
  padding: 0 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user_car_info_notice_cont {
  width: 100%;
  height: 96%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user_log_out_cont {
  color: rgb(92 96 104);
  width: 100%;
  height: 10%;
  /* background-color: #fff; */
  padding: 0 7.5%;
}
</style>
