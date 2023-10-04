<template>
  <div class="popup_cont">
    <div class="popup_contents_cont">
      <div class="popup_contents_img_cont">
        <div class="popup_contents_img"></div>
      </div>
      <div class="popup_contents_text">{{ message }}</div>
      <div class="popup_contents_btn_cont">
        <div class="popup_contents_btn" @click="close()">확인</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    contents: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const message = ref(props.contents);
    const close = () => {
      emit("closePopup");
    };
    return {
      close,
      message,
    };
  },
};
</script>

<style scoped>
.popup_cont {
  width: 100%;
  height: 100%;
  background-color: #000000b8;
  position: absolute;
  top: 0;
}
.popup_contents_cont {
  background-color: #fff;
  height: 35%;
  width: 100%;
  bottom: 30%;
  position: absolute;
  border: none;
  border-radius: 20px;
}
.popup_contents_img_cont {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  padding-top: 10%;
}
.popup_contents_img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  background-image: url(../assets/icons/img_01.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.popup_contents_text {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 20%;
  font-size: 1.6rem;
  font-weight: bold;
}
.popup_contents_btn_cont {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 30%;
}
.popup_contents_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  background-color: rgb(2 100 253);
  height: 50%;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-weight: 400;
  font-size: 1.6rem;
}
</style>
