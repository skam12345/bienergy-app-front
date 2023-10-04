<template>
  <div class="payhist_cont">
    <div class="payhist_top_menu">
      <div
        class="payhist_top_menu_used font_1_4rem font_gray"
        :class="{ used: used }"
        @click="menuBtn('used')"
      >
        사용
      </div>
      <div
        class="payhist_top_menu_used font_1_4rem font_gray"
        :class="{ used: used2 }"
        @click="menuBtn('noUsed')"
      >
        미사용
      </div>
    </div>
    <div v-if="used" class="payhist_content_cont">
      <div
        v-for="(tab, index) in usedDatas"
        :key="index"
        class="payhist_content"
      >
        <div class="payhist_content_status_date_cont font_1_rem font_gray">
          <!-- <div>{{ tab.pyudIsUse }}</div> -->
          <div>{{ tab.pyudIsUse === "Y" ? "사용" : "미사용" }} /</div>
          <div style="margin-left: 2%">결제일 : {{ tab.pyudPayDate }} /</div>
          <div style="margin-left: 2%">사용일 : {{ tab.pyudUseDate }}</div>
        </div>
        <div class="payhist_content_name font_1_4rem font_bold">
          {{ tab.pyudPlaceName }}
        </div>
        <div class="payhist_content_border_cont">
          <div class="payhist_content_border"></div>
        </div>
        <div class="payhist_content_charge_price font_1_4rem">
          <div class="payhist_content_charge_price_texts">
            <div>충전량&nbsp;&nbsp;</div>
            <div class="font_blue">{{ tab.pyudCharge }} kW</div>
          </div>
          <div class="font_bold">{{ tab.pyudPayFee }} 원</div>
        </div>
      </div>
    </div>
    <div v-else-if="used2" class="payhist_content_cont">
      <div
        v-for="(tab, index) in unUsedDatas"
        :key="index"
        class="payhist_content"
        @click="detail(tab)"
      >
        <div class="payhist_content_status_date_cont font_1_rem font_gray">
          <div>{{ tab.pyudIsUse === "Y" ? "사용" : "미사용" }} /</div>
          <div style="margin-left: 2%">결제일 : {{ tab.pyudPayDate }}</div>
        </div>
        <div class="payhist_content_name font_1_4rem font_bold">
          {{ tab.pyudPlaceName ? tab.pyudPlaceName : "-" }}
        </div>
        <div class="payhist_content_border_cont">
          <div class="payhist_content_border"></div>
        </div>
        <div class="payhist_content_charge_price font_1_4rem">
          <div class="payhist_content_charge_price_texts">
            <div>충전량&nbsp;&nbsp;</div>
            <div class="font_blue">{{ tab.pyudCharge }} kW</div>
          </div>
          <div class="font_bold">{{ tab.pyudPayFee }} 원</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "@/axios";

export default {
  name: "paymentHistory",
  setup() {
    const router = useRouter();

    const usedDatas = ref([]);
    const unUsedDatas = ref([]);

    const used = ref(false);
    const used2 = ref(true);
    // 사용 미사용 탭 기본은 미사용으로
    const menuBtn = (use) => {
      if (use === "used") {
        used.value = true;
        used2.value = false;
      } else if (use === "noUsed") {
        used.value = false;
        used2.value = true;
      }
    };
    // 상세페이지로 이동, 쿼리로 데이터 담아서 이동
    const detail = (data) => {
      console.log(data);
      router.push({ name: "paymentDetail", query: data });
    };
    // 로그인 여부 확인, 로그인 안되어 있을 시 로그인 페이지로 이동
    const isLogin = () => {
      if (sessionStorage.getItem("isLogin") !== "true") {
        router.push({ path: "/login" });
      }
    };
    const getPays = async () => {
      console.log("사용 결제 내역 불러오기");
      let usdNo = sessionStorage.getItem("usdNo");
      // 해당 사용자의 사용된 결제 내역 불러오기
      try {
        const res = await axios.post("/app/payment", {
          usdNo: usdNo,
          pyudIsUse: "Y",
        });
        if (res.data) {
          usedDatas.value = res.data;
          console.log(usedDatas.value);
        }
      } catch (err) {
        console.log(err);
      }
      // 해당 사용자의 미사용 결제 내역 불러오기
      try {
        const res = await axios.post("/app/payment", {
          usdNo: usdNo,
          pyudIsUse: "N",
        });
        if (res.data) {
          unUsedDatas.value = res.data;
          console.log(unUsedDatas.value);
        }
      } catch (err) {
        console.log(err);
      }
    };
    // 로그인 확인
    isLogin();
    // 결제내역 불러오기
    getPays();
    return {
      used,
      used2,
      usedDatas,
      unUsedDatas,
      menuBtn,
      detail,
      getPays,
    };
  },
};
</script>

<style scoped>
.payhist_cont {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(243 244 247);
}
.payhist_top_menu {
  width: 100%;
  background: #fff;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.payhist_top_menu_used {
  width: 45%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.used {
  color: black;
  font-weight: bold;
  border-bottom: 2px solid black;
}
.payhist_content_cont {
  width: 100%;
  height: 85%;
  padding: 2% 0;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.payhist_content_cont::-webkit-scrollbar {
  display: none;
}
.payhist_content {
  width: 94%;
  height: 20%;
  background-color: #fff;
  margin: 2% 3%;
  border: none;
  border-radius: 15px;
  padding: 5%;
}
.payhist_content_status_date_cont {
  display: flex;
  height: 20%;
  width: 100%;
}
.payhist_content_name {
  height: 30%;
  width: 100%;
  display: flex;
  align-items: center;
}
.payhist_content_border_cont {
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.payhist_content_border {
  width: 100%;
  border: 1px solid rgb(243 243 247);
}
.payhist_content_charge_price {
  height: 30%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.payhist_content_charge_price_texts {
  display: flex;
}
</style>
