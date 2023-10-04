<template>
  <div class="login_cont" style="background-color: #fff">
    <div class="login_content_cont">
      <div class="login_text_cont">
        <div class="font_2rem font_blue font_bold">로그인</div>
        <div class="font_2rem font_bold">을 해 주세요.</div>
      </div>
      <div class="login_input_cont">
        <label for="id" class="login_input_label">아이디</label>
        <input
          type="text"
          placeholder="아이디를 입력 해 주세요"
          class="font_1_6rem"
          id="id"
          :value="userId"
          @input="changeId($event)"
        />
        <label for="password" class="login_input_label">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력 해 주세요"
          class="font_1_6rem"
          id="password"
          :value="userPw"
          @input="changePw($event)"
          @keydown.enter="login()"
        />
        <div class="login_btn_cont">
          <!-- <div class="login_join_cont font_1_2rem">
            <div>처음 방문 하신 분은 &nbsp;</div>
            <div class="font_bold font_blue">회원 가입</div>
            <div>을 해주세요</div>
          </div> -->
          <div class="login_btn_button font_1_6rem" @click="login()">
            로그인
          </div>
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
  components: {},
  setup() {
    const router = useRouter();
    const userId = ref("");
    const userPw = ref("");
    const changeId = (e) => {
      userId.value = e.target.value;
    };
    const changePw = (e) => {
      userPw.value = e.target.value;
    };
    const login = async () => {
      try {
        const res = await axios.post("/app/userData/login", {
          usdId: userId.value,
          usdPwd: userPw.value,
        });
        console.log(res.data);
        const resData = res.data;
        if (resData.result === "success") {
          console.log("로그인 성공");
          console.log(res.data);
          sessionStorage.setItem("isLogin", true);
          sessionStorage.setItem("usdNo", resData.usdNo);
          sessionStorage.setItem("usdId", resData.usdId);
          let where = sessionStorage.getItem("where");
          router.push(where);
          sessionStorage.removeItem("where");
        }
      } catch (err) {
        console.log(err);
        alert("로그인 실패, 아이디와 비밀번호를 확인 해 주세요.");
      }
    };
    return {
      userId,
      userPw,
      changeId,
      changePw,
      login,
      useRouter,
    };
  },
};
</script>

<style scoped>
.login_cont {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.login_content_cont {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  min-height: 150px;
}
.login_text_cont {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  padding: 0 5%;
}
.login_input_cont {
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  padding: 0 5%;
}
.login_input_cont > input {
  border: 1px solid rgb(237 238 239);
  outline: none;
  margin: 2% 0;
  padding: 3%;
}
.login_btn_cont {
  width: 100%;
  height: 40%;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login_btn_button {
  width: 100%;
  height: 40%;
  min-height: 40px;
  background-color: rgb(2, 100, 253);
  color: #fff;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login_join_cont {
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login_input_label {
  padding: 0 1%;
}
</style>
