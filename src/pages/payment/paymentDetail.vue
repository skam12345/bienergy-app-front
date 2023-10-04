<template>
  <div class="payDetail_cont">
    <div class="payDetail_qr_cont">
      <QrcodeVue
        :value="qr_data.qr"
        :size="qr_options.size"
        :background="qr_options.background"
        :foreground="qr_options.foreground"
      />
    </div>
    <div class="payDetail_data_cont">
      <div class="payDetail_data_date_charge font_1_4rem">
        <div class="payDetail_data_date">
          <div>결제 일자</div>
          <div>{{ qr_data.pyudPayDate }}</div>
        </div>
        <div class="payDetail_data_charge">
          <div>충전량</div>
          <div class="font_blue font_bold">{{ qr_data.pyudCharge }} kW</div>
        </div>
      </div>
      <div class="payDetail_border_cont">
        <div class="payDetail_border"></div>
      </div>
      <div class="payDetail_data_price font_1_4rem font_bold">
        <div>충전 금액</div>
        <div>{{ qr_data.pyudPayFee }} 원</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import QrcodeVue from "qrcode.vue";

export default {
  components: {
    QrcodeVue,
  },
  name: "paymentDetail",
  setup() {
    const route = useRoute();
    let qr_data = ref("");
    let qr_options = ref({
      size: 200,
      background: "rgb(51, 56, 68)",
      foreground: "#fff",
    });
    let test = ref("");
    qr_data = route.query;
    return {
      qr_data,
      qr_options,
      test,
    };
  },
};
</script>

<style scoped>
.payDetail_cont {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(51, 56, 68);
}
.payDetail_qr_cont {
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.payDetail_data_cont {
  width: 100%;
  height: 25%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border: none;
  border-radius: 20px 20px 0 0;
  padding: 5%;
}
.payDetail_data_date_charge {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
}
.payDetail_data_date {
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.payDetail_data_charge {
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.payDetail_data_price {
  width: 100%;
  height: 40%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 5%;
}
.payDetail_border_cont {
  height: 5%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.payDetail_border {
  width: 100%;
  border: 1px solid rgb(243 243 247);
}
</style>
