<template>
  <div class="pay_cont" style="background-color: #fff">
    <div class="pay_content_cont">
      <div class="pay_text_cont">
        <div class="font_2rem font_blue font_bold">결제금액</div>
        <div class="font_2rem font_bold">을 입력해 주세요.</div>
      </div>
      <div class="pay_input_cont">
        <div class="pay_input_pay_cont">
          <input
            type="text"
            placeholder="결제금액 입력"
            class="font_1_6rem"
            :value="chargePrice"
            @input="changePrice($event)"
            oninput="value = value.replace(/^0+|\D+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')"
          />
          <span class="pay_input_pay_cont_won">원</span>
        </div>
        <div class="pay_input_charge_cont">
          <input
            type="text"
            placeholder="충전량"
            class="font_1_6rem"
            :value="chargeAmount"
            @input="changeChargeAmount($event)"
            oninput="value = `${value}  kW`"
            disabled
          />
          <span class="pay_input_pay_cont_kw">kW</span>
        </div>
        <div class="pay_confirm_btn_cont">
          <div
            class="pay_confirm_btn font_1_6rem font_bold"
            @click="payConfirm()"
          >
            결제 하기
          </div>
        </div>
      </div>
    </div>
    <div class="pay_btn_cont">
      <div class="pay_btn_button" @click="addPrice('1000')">1,000원</div>
      <div class="pay_btn_button" @click="addPrice('5000')">5,000원</div>
      <div class="pay_btn_button" @click="addPrice('10000')">10,000원</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "@/axios";

export default {
  components: {},
  setup() {
    const popup = ref(false);
    let chargePrice = ref();
    let chargeAmount = ref();
    let chargePricePerAmount = ref(300);
    let userId = sessionStorage.getItem("usdId");
    let userNo = sessionStorage.getItem("usdNo");
    let date = new Date();

    function pad(number, length) {
      var str = "" + number;
      while (str.length < length) {
        str = "0" + str;
      }
      return str;
    }
    var yyyy = date.getFullYear().toString();
    var MM = pad(date.getMonth() + 1, 2);
    var dd = pad(date.getDate(), 2);
    var hh = pad(date.getHours(), 2);
    var mm = pad(date.getMinutes(), 2);
    var ss = pad(date.getSeconds(), 2);

    let dateString = yyyy + MM + dd + hh + mm + ss;
    // popup
    const popupBtn = () => {
      popup.value ? (popup.value = false) : (popup.value = true);
    };
    // 금액 추가
    const addPrice = (price) => {
      price = parseInt(price);
      let isComma = chargePrice.value;
      if (isComma !== undefined && isComma.match(/[^0-9]/)) {
        // eslint-disable-next-line no-useless-escape
        chargePrice.value = isComma.replace(/\,/g, "");
      }
      let prevPrice = parseInt(chargePrice.value);
      if (!prevPrice) {
        prevPrice = 0;
      }
      if (!chargePrice.value) {
        chargePrice.value = 0;
      }
      let totalPrice = (prevPrice += price);
      totalPrice = String(totalPrice);
      chargePrice.value = totalPrice
        .replace(/^0+|\D+/g, "")
        .replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
      // 충전량
      if (totalPrice !== undefined && totalPrice.match(/[^0-9]/)) {
        // eslint-disable-next-line no-useless-escape
        totalPrice = totalPrice.replace(/\,/g, "");
      }
      totalPrice = parseInt(totalPrice);
      let sum = Math.round(
        ((totalPrice / chargePricePerAmount.value) * 100) / 100
      );
      chargeAmount.value = sum;
    };
    const changePrice = (e) => {
      chargePrice.value = e.target.value;
      // 충전량
      let input = e.target.value;
      if (input !== undefined && input.match(/[^0-9]/)) {
        // eslint-disable-next-line no-useless-escape
        input = input.replace(/\,/g, "");
      }
      input = parseInt(input);
      let sum = Math.round(((input / chargePricePerAmount.value) * 100) / 100);
      chargeAmount.value = sum;
      if (!chargeAmount.value) {
        chargeAmount.value = 0;
      }
    };
    const changeChargeAmount = (e) => {
      chargeAmount.value = e.target.value;
    };
    const payConfirm = async () => {
      console.log(chargePrice.value);
      // 공백 제거
      let chargePriceTrim = chargePrice.value.replace(/^\s+|\s+$/g, "");
      // 특수 문자 제거
      // eslint-disable-next-line no-useless-escape
      const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      let chargePriceForAxios = chargePriceTrim.replace(reg, "");
      console.log(chargePriceForAxios);
      try {
        const res = await axios.post("/app/userData/UserInfo", {
          pyudIsUsed: "N",
          pyudPayFee: chargePriceForAxios,
          pyudCharge: chargeAmount,
          pyudId: userId,
          usdNo: userNo,
          pyudQrData: dateString,
        });
        if (res.data) {
          console.log(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    return {
      popup,
      popupBtn,
      addPrice,
      chargePrice,
      chargeAmount,
      changePrice,
      changeChargeAmount,
      chargePricePerAmount,
      payConfirm,
    };
  },
};
</script>

<style scoped>
.pay_cont {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.pay_content_cont {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  min-height: 150px;
}
.pay_text_cont {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  padding: 0 5%;
}
.pay_input_cont {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  padding: 0 5%;
}
.pay_input_pay_cont {
  width: 100%;
  display: flex;
  font-size: 16px;
  position: relative;
}
.pay_input_charge_cont {
  width: 100%;
  display: flex;
  font-size: 16px;
  position: relative;
}
.pay_input_cont > .pay_input_pay_cont > input {
  width: 100%;
  border: 1px solid rgb(237 238 239);
  outline: none;
  margin: 2% 0;
  padding: 3% 15% 3% 3%;
  text-align: right;
}
.pay_input_cont > .pay_input_charge_cont > input {
  width: 100%;
  border: 1px solid rgb(237 238 239);
  outline: none;
  margin: 2% 0;
  padding: 3% 15% 3% 3%;
  text-align: right;
}
.pay_input_pay_cont_won {
  position: absolute;
  top: 30%;
  right: 5%;
}
.pay_input_pay_cont_kw {
  font-size: 16px;
  position: absolute;
  top: 30%;
  right: 3%;
}
.pay_btn_cont {
  width: 100%;
  /* height: 5%; */
  height: 75px;
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  bottom: 0;
  position: fixed;
}
.pay_btn_button {
  border: 1px solid rgba(201, 201, 201, 0.856);
  border-radius: 20px;
  width: 30%;
  height: 55%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}
.pay_confirm_btn_cont {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 23%;
  margin-top: 2%;
}
.pay_confirm_btn {
  width: 90%;
  height: 100%;
  background-color: rgb(2 100 253);
  color: #fff;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
}
</style>
