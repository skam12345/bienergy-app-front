<template>
  <div class="charging_cont">
    <div class="charging_image_cont"></div>
    <div class="charging_info_cont">
      <div v-if="charging" class="charging_info_text_cont">
        <div class="charging_info_text_detail_cont">
          <div class="infomation">
            <div>충전량</div>
            <div class="font_blue font_bold">0.00kWh</div>
          </div>
          <div class="infomation">
            <div>충전시간</div>
            <div class="font_blue font_bold">0분</div>
          </div>
          <div class="infomation">
            <div>충전속도</div>
            <div>급속 0.00kW</div>
          </div>
          <div class="infomation">
            <div>충전소</div>
            <div>아시아공원 공영주차장</div>
          </div>
          <div class="infomation">
            <div>충전기</div>
            <div>DC 콤보</div>
          </div>
        </div>
        <div class="border"></div>
        <div class="charging_price">
          <div class="charging_price_text">충전 금액</div>
          <div class="charging_price_num">0원</div>
        </div>
      </div>
      <div v-else class="charging_info_text_cont">
        <div class="charging_info_text_detail_cont">
          <div class="infomation">
            <div>충전량</div>
            <div class="font_blue font_bold">0.00kWh</div>
          </div>
          <div class="infomation">
            <div>충전시간</div>
            <div class="font_blue font_bold">0분</div>
          </div>
          <div class="infomation">
            <div>충전속도</div>
            <div>급속 0.00kW</div>
          </div>
          <div class="infomation">
            <div>충전소</div>
            <div>-</div>
          </div>
          <div class="infomation">
            <div>충전기</div>
            <div>-</div>
          </div>
        </div>
        <div class="border"></div>
        <div class="charging_price">
          <div class="charging_price_text">충전 금액</div>
          <div class="charging_price_num">0원</div>
        </div>
      </div>
    </div>
    <div class="charging_bottom_info">
      <div class="charging_bottom_info_text">
        충전기 종류와 통신 상태에 따라 충전량 갱신의 지연이<br />
        있을 수 있습니다. 충전중 충전종료를 원하실 경우 앱상의 <br />
        충전 종료 버튼을 눌러주세요.
      </div>
      <div v-if="charging" class="charging_bottom_info_btn">
        <div class="charging_bottom_info_btn_btn" @click="popupBtn()">
          충전 종료
        </div>
      </div>
      <div v-else class="charging_bottom_info_btn">
        <div class="charging_bottom_info_btn_btn">대기중입니다</div>
      </div>
    </div>
    <BottomPopup
      v-if="donePopup"
      @closePopup="popupBtn()"
      :contents="doneMessage"
    />
    <BottomPopup
      v-if="waitPopup"
      @closePopup="waitPopupBtn()"
      :contents="waitMessage"
    />
  </div>
</template>

<script>
import BottomPopup from "@/components/BottomPopup.vue";
// import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  components: {
    BottomPopup,
  },
  setup() {
    // const router = useRouter();
    const donePopup = ref(false);
    const waitPopup = ref(false);
    // 충전 중일때는 charging = true
    const charging = ref(true);
    const waitMessage = ref("충전 대기중 입니다.");
    const doneMessage = ref("충전이 완료 됐습니다.");
    const popupBtn = () => {
      donePopup.value ? (donePopup.value = false) : (donePopup.value = true);
    };
    const waitPopupBtn = () => {
      waitPopup.value ? (waitPopup.value = false) : (waitPopup.value = true);
    };
    // const isLogin = () => {
    //   if (sessionStorage.getItem("isLogin") !== "true") {
    //     router.push({ path: "/login" });
    //   }
    // };
    // isLogin();
    return {
      donePopup,
      popupBtn,
      waitPopupBtn,
      charging,
      waitPopup,
      waitMessage,
      doneMessage,
    };
  },
};
</script>

<style scoped>
.charging_cont {
  width: 100%;
  height: 90%;
}
.charging_image_cont {
  width: 100%;
  height: 47%;
  background-image: url(@/assets/image/charging_img.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.charging_info_cont {
  width: 100%;
  height: 33%;
  background-color: rgb(243 244 247);
}
.charging_info_text_cont {
  height: 100%;
  background-color: #fff;
  border: none;
  border-radius: 25px 25px 0 0;
  padding: 8% 5%;
}
.charging_info_text_detail_cont {
  height: 77%;
}
.infomation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 20%;
  font-size: 1.4rem;
}
.charging_price {
  height: 23%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}
.charging_price_text {
  font-size: 1.4rem;
  font-weight: bold;
}
.charging_price_num {
  font-size: 1.4rem;
  font-weight: bold;
}
.charging_bottom_info {
  width: 100%;
  height: 20%;
  background-color: rgb(243 244 247);
  margin-bottom: 10%;
}
.charging_bottom_info_text {
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  color: rgb(120 123 130);
  text-align: center;
}
.charging_bottom_info_btn {
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
}
.charging_bottom_info_btn_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  background-color: rgb(2 100 253);
  height: 60%;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-weight: 400;
  font-size: 1.6rem;
}
</style>
