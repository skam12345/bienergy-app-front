<template>
  <div class="notices">
    <div
      v-for="(notice, index) in notices"
      :key="index"
      class="notice"
      @click="detail(notice.nbNo)"
    >
      <div class="notice-title" v-if="notice">
        {{ notice.nbTitle }}
      </div>
      <div class="notice-date" v-if="notice">
        {{ notice.nbRegDate }}
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "@/axios";

export default {
  name: "notification",
  setup() {
    const router = useRouter();
    const notices = ref([]);

    const getNotices = async () => {
      console.log("공지 사항 불러오기");
      try {
        const res = await axios.post("/app/notice");
        console.log(res.data);
        if (res.data) {
          notices.value = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    };

    const detail = async (data) => {
      console.log(data);
      try {
        const res = await axios.post("/app/noticeDetail", {
          nbNo: data,
        });
        if (res.data) {
          notices.value = res.data;
          console.log("공지 사항 불러오기");
          console.log(notices.value);
        }
      } catch (err) {
        console.log(err);
      } finally {
        router.push({ name: "NoticeDetail", query: notices.value });
      }
    };
    onMounted(() => {
      getNotices();
    });
    return {
      detail,
      getNotices,
      notices,
    };
  },
};
</script>

<style scoped>
.notices {
  padding-left: 1.7rem;
  padding-right: 1.7rem;
  width: 100%;
  background: white;
  overflow: scroll;
  font-family: "../src/assets/font/NotoSansCJKkr-Regular.otf";
  height: 100%;
  padding-bottom: 20%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-top: 1px solid rgb(229 228 228);
}
.notices::-webkit-scrollbar {
  display: none;
}
.notice {
  border-bottom: 0.13rem solid #f3f3f7;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.notice-title {
  font-size: 1.6rem;
  line-height: 33pt;
  text-align: left;
  letter-spacing: -0.65pt;
}
.notice-date {
  font-size: 1.3rem;
  letter-spacing: 33pt;
  letter-spacing: -0.65pt;
  color: #868a93;
}
</style>
