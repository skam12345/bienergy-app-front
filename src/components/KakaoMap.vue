<!-- eslint-disable no-undef -->
<template>
  <div style="width: 100%; height: 100%">
    <div
      style="
        position: fixed;
        z-index: 1002;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <input
        type="text"
        v-model="mapSearchText"
        class="form-control"
        placeholder="지역또는 충전소명으로 검색"
        @keypress.enter="() => {}"
        @input="changeKeyword"
        style="
          border: none;
          border-color: rgba(70, 136, 204, 0.5);
          border-style: groove;
          border-width: 0.2rem;
          font-size: 14px;
          padding: 2%;
          width: 90%;
          margin-top: 5%;
        "
      />
      <div
        style="
          position: absolute;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      ></div>
      <div v-if="mapSearchText !== ''" style="width: 90%; font-size: 16px">
        <div
          v-for="search in filteredSearchList"
          @focus="focusSetTimeout()"
          @click="setCenterSearch(search)"
          style="
            background-color: white;
            border-color: rgba(70, 136, 204, 0.5);
            border-style: groove;
            border-width: 0.2rem;
          "
          :key="search.pdaNo"
        >
          <div style="">
            {{ search.pdaName }}
          </div>
          <div style="">
            {{ search.pdaAddressRoad }}
          </div>
        </div>
      </div>
    </div>
    <div class="setMyPosition-cont">
      <div
        class="setMyPosition"
        @click="
          setCurrentPosition()
        "
      ></div>
    </div>

    <div
      id="map"
      style="
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        /* top: 3%; */
      "
    ></div>
    <div>
      <vue-bottom-sheet
        ref="myBottomSheet"
        max-width="100%"
        :overlay="false"
        :is-full-screen="true"
        :background-clickable="false"
      >
        <div id="bottomSheet" style="height: 55rem; bottom: 10%">
          <div class="bottom-sheet">
            <h3
              style="
                color: rgb(2, 100, 253);
                padding-bottom: 2%;
                font-size: 170%;
              "
            >
              충전가능
            </h3>
            <h1 style="font-size: 230%">제주 이마트 아만티호텔</h1>
            <div style="display: flex">
              <div class="coordinate"></div>
              <p style="display: flex; padding-left: 2%; font-size: 130%">
                서울시 마포구 월드컵북로 31 지하 2 층 주차장 <br />지번: 응암동
                89-1
              </p>
            </div>
            <div
              style="
                display: flex;
                border-style: solid;
                width: 95%;
                height: 7rem;
                border-radius: 1rem;
                border-color: rgb(235, 236, 240);
              "
            >
              <div class="charger-icon">
                <div class="charger-icon1"></div>
                <div>DC콤보</div>
              </div>
              <div class="charger-icon">
                <div class="charger-icon2-1"></div>
                <div>DC 차 데모</div>
              </div>
              <div class="charger-icon">
                <div class="charger-icon3-1"></div>
                <div>AC3상</div>
              </div>
              <div class="charger-icon">
                <div class="charger-icon4-1"></div>
                <div>완속</div>
              </div>
            </div>
          </div>
          <div
            style="
              background-color: rgb(235, 236, 240);
              width: 100%;
              height: 1rem;
              margin-top: 4%;
            "
          ></div>
          <div class="bottom-sheet">
            <h2 style="padding-top: 5%">충전기 정보</h2>
            <div
              style="
                background-color: rgb(235, 236, 240);
                width: 95%;
                height: 0.2rem;
                margin-top: 4%;
                padding-left: 5%;
              "
            ></div>
            <div style="display: flex; padding-top: 3%; text-align: center">
              <h5 style="width: 22%">상태</h5>
              <h5 style="width: 50%">종류</h5>
              <h5 style="width: 23%">이용시간</h5>
            </div>
            <div
              style="
                background-color: rgb(235, 236, 240);
                width: 95%;
                height: 0.2rem;
                margin-top: 2%;
                padding-left: 5%;
              "
            ></div>
            <div>
              <div
                style="
                  padding-top: 3%;
                  padding-bottom: 3%;
                  display: flex;
                  border-color: rgb(235, 236, 240);
                  border-bottom-style: solid;
                  width: 95%;
                  border-width: 0.2rem;
                  vertical-align: middle;
                  text-align: center;
                "
              >
                <div
                  style="
                    font-size: 1.7rem;
                    color: rgb(85, 166, 7);
                    font-weight: bold;
                    width: 24%;
                  "
                >
                  충전가능
                </div>
                <div style="display: flex; width: 52%; padding-left: 10%">
                  <div class="charger-icon2" style="width: 30px"></div>
                  <div style="font-size: 150%; padding-left: 3%">
                    DC 차 데모
                  </div>
                </div>
                <div
                  style="font-size: 150%; color: rgb(85, 166, 7); width: 23%"
                >
                  1시간전
                </div>
              </div>
            </div>
            <div>
              <div
                style="
                  padding-top: 3%;
                  padding-bottom: 3%;
                  display: flex;
                  border-color: rgb(235, 236, 240);
                  border-bottom-style: solid;
                  width: 95%;
                  border-width: 0.2rem;
                  vertical-align: middle;
                  text-align: center;
                "
              >
                <div
                  style="
                    font-size: 150%;
                    color: rgb(85, 166, 7);
                    font-weight: bold;
                    width: 24%;
                  "
                >
                  충전가능
                </div>
                <div style="display: flex; width: 52%; padding-left: 10%">
                  <div class="charger-icon4" style="width: 30px"></div>
                  <div style="font-size: 150%; padding-left: 3%">완속</div>
                </div>
                <div
                  style="font-size: 150%; color: rgb(85, 166, 7); width: 23%"
                >
                  2시간전
                </div>
              </div>
            </div>
            <div>
              <div
                style="
                  padding-top: 3%;
                  padding-bottom: 3%;
                  display: flex;
                  border-color: rgb(235, 236, 240);
                  border-bottom-style: solid;
                  width: 95%;
                  border-width: 0.2rem;
                  vertical-align: middle;
                  text-align: center;
                "
              >
                <div
                  style="
                    font-size: 150%;
                    color: rgb(85, 166, 7);
                    font-weight: bold;
                    width: 24%;
                  "
                >
                  충전중
                </div>
                <div style="display: flex; width: 52%; padding-left: 10%">
                  <div class="charger-icon1" style="width: 30px"></div>
                  <div style="font-size: 150%; padding-left: 3%">DC콤보</div>
                </div>
                <div
                  style="font-size: 150%; color: rgb(85, 166, 7); width: 23%"
                >
                  2시간전
                </div>
              </div>
            </div>
            <h2 style="padding-top: 10%; padding-bottom: 4%">충전 요금</h2>
            <div
              style="
                border-style: solid;
                width: 95%;
                height: auto;
                border-radius: 1rem;
                border-color: rgb(235, 236, 240);
              "
            >
              <div style="display: flex; padding-top: 3%; text-align: center">
                <h5 style="width: 50%; height: 10%">종류</h5>
                <h5 style="width: 50%; height: 10%">가격(kWh)</h5>
              </div>
              <div
                style="
                  padding-bottom: 3%;
                  display: flex;
                  border-color: rgb(235, 236, 240);
                  border-bottom-style: solid;
                  width: 100%;
                  border-width: 0.2rem;
                  vertical-align: middle;
                  text-align: center;
                "
              ></div>
              <div style="display: flex; padding-top: 3%; text-align: center">
                <h5 style="width: 50%; height: 10%">급속</h5>
                <h5 style="width: 50%; height: 10%">336원</h5>
              </div>
              <div style="display: flex; padding-top: 3%; text-align: center">
                <h5 style="width: 50%; height: 10%">완속</h5>
                <h5 style="width: 50%; height: 10%">246원</h5>
              </div>
            </div>
          </div>
          <div style="height: 30rem; background-color: rgb(243, 244, 247)">
            <div
              style="padding-left: 5%; font-size: 1.5rem; padding-bottom: 5%"
            >
              <h2 style="padding-top: 5%">충전소 정보</h2>
              <div style="padding-top: 3%; display: flex">
                <div class="station-icon"></div>
                <div>바이에너지</div>
              </div>
              <div style="padding-top: 1%; display: flex">
                <div class="time-icon"></div>
                <div style="padding-left: 1%">평일 09:00 ~ 18:00</div>
              </div>
              <div style="padding-top: 1%; display: flex">
                <div class="phone-icon"></div>
                <div style="padding-left: 2%">02-2568-7878</div>
              </div>
            </div>
            <div
              style="
                display: flex;
                justify-content: center;
                align-content: center;
                width: 100%;
                height: 30%;
              "
            >
              <div class="payment-btn" @click="goUrl('/pay')">결제하기</div>
            </div>
          </div>
        </div>
      </vue-bottom-sheet>
    </div>
  </div>
</template>

<script>
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import { useRouter } from "vue-router";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { onMounted, ref, computed} from "vue";
import axios from "@/axios";
import {useStore} from "vuex";

export default {
  components: {
    VueBottomSheet,
  },
  setup() {
    const store = useStore()
    const places = computed(() => store.state.places.places)
    const setPlaces = (places) => {
      store.dispatch('places/setPlaces', places)
    }
    const myBottomSheet = ref(null)
    let distance
    const router = useRouter()
    const goUrl = (path) => {
      router.push({ path: path })
    };
    let map;
    let mapSearchText = ref("")
    let positions = [];
    let placeList = ref()
    let locPosition
    const getPlaceList = async () => {
      try {
        const res = await axios.post("/app/places")
        setPlaces(res.data)
        //placeList.value = res.data
        // placeList.value = store.state.places.places.places
        // placeList.value = store.state.places.places
        console.log(res.data)
        console.log(store.state.places.places)
        console.log(placeList.value)
      } catch (err) {
        console.log("데이터를 못가져왔습니다.")
      }
    };
    getPlaceList()

    // 현재 내위치 좌표
    const getCurrentPosition =  () => {
      if( localStorage.getItem('currentLat') === null || localStorage.getItem('currentLat') === 'undefined')  {
        if (!navigator.geolocation) {
          setAlert("위치 정보를 찾을 수 없습니다.1");
        } else {
          navigator.geolocation.getCurrentPosition(
            getPositionValue,
            geolocationError
          );
        }
      }
    }

    const focusSetTimeout = () => {};

    const getPositionValue = (val) => {
      localStorage.setItem('currentLat', val.coords.latitude)
      localStorage.setItem('currentLng', val.coords.longitude)
    };

    const geolocationError = () => {
      setAlert("위치 정보를 찾을 수 없습니다.2");
    };

    const setAlert = (text) => {
      alert(text);
    };


    // 바텀시트 오픈
    const open = () => {
      myBottomSheet.value.open();
    };

    // 나와의 거리계산 함수
    const getDistanceFromLatLonInKm = (lat1, lng1, lat2, lng2) => {
      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }

      let R = 6371; // Radius of the earth in km
      let dLat = deg2rad(lat2 - lat1); // deg2rad below
      let dLon = deg2rad(lng2 - lng1);
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c; // Distance in km
      return d;
    };

    // let searchList = ref([])
    const filteredSearchList = computed(() => {
      let searchAddressRoadList
      let searchNameList
      let filteredList
      if (mapSearchText.value) {
        // 충전소 주소로 검색한 리스트
        searchAddressRoadList = store.state.places.places.filter((search) => {
          if (search.pdaAddressRoad !== null) {
            return search.pdaAddressRoad.includes(mapSearchText.value)
          }
        });
        // 충전소 이름으로 검색한 리스트
        searchNameList = store.state.places.places.filter((search) => {
          return search.pdaName.includes(mapSearchText.value)
        })
        filteredList = [...searchAddressRoadList, ...searchNameList]
        filteredList = filteredList.filter((filter, index) => {
          return filteredList.indexOf(filter) === index
        })
        console.log(filteredList)
      }
      return filteredList;
    });

    // 지도 중심좌표 이동시키기
    const setCenterSearch = (search) => {
      console.log("클릭셋센터");
      console.log(search);
      const moveLatLon = new window.kakao.maps.LatLng(
        search.pdaLatitude - 0.002,
        search.pdaLongitude
      );
      map.panTo(moveLatLon);
      mapSearchText.value = "";
      open();
      distance = getDistanceFromLatLonInKm(
        localStorage.getItem('currentLat'),
        localStorage.getItem('currentLng'),
        search.pdaLatitude,
        search.pdaLongitude
      );
      console.log(distance);
    };
    const setCenterMarker = (lat, lng) => {
      const moveLatLon = new window.kakao.maps.LatLng(lat - 0.002, lng);
      map.panTo(moveLatLon);
      mapSearchText.value = "";
    };
    const setCurrentPosition = () => {
      getCurrentPosition()
      let lat = Number(localStorage.getItem('currentLat'))
      let Lng = Number(localStorage.getItem('currentLng'))
      const moveLatLon = new window.kakao.maps.LatLng(lat , Lng)
      map.panTo(moveLatLon)
      mapSearchText.value = ""
    }

    onMounted(() => {
      getCurrentPosition()
      // 카카오 객체가 있고, 카카오 맵그릴 준비가 되어 있다면 맵 실행
      if(localStorage.getItem('currentLat') === null || localStorage.getItem('currentLat') === 'undefined') {
        setTimeout(() => {
          if (window.kakao && window.kakao.maps) {
            console.log('카카오 객체있음')
            loadMap()
          } else {
            console.log('카카오 객체없음')
            loadScript()
          }
        }, 4000)
      } else {
        if (window.kakao && window.kakao.maps) {
          console.log(window.kakao)
          console.log('카카오 객체있음')
          loadMap()
        } else {
          console.log(window.kakao)
          console.log('카카오 객체없음')
          loadScript()
        }
      }
    });

    // 한글 키보드 입력
    const changeKeyword = (e) => {
      mapSearchText.value = e.target.value;
      console.log(focus);
    };

    const loadScript = () => {
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=646e3428d939076d50f033635d46cea4&autoload=false";
      script.onload = () => window.kakao.maps.load(loadMap);
      document.head.appendChild(script);
    };

    // 맵 출력하기
    const loadMap = () => {
      const container = document.getElementById("map");
      const options = {
        // center: new window.kakao.maps.LatLng(37.5551903, 126.9168825),
        // 현재 나의 위치로 할라면 아랫것
        center: new window.kakao.maps.LatLng(localStorage.getItem('currentLat'), localStorage.getItem('currentLng')),
        level: 3,
      };
      // 여기다가 마커, 커스텀 오버레이 정보

      for(let i = 0; i < store.state.places.places.length; i++) {
        let position = {};
        position.id = store.state.places.places[i].pdaNo
        position.title = store.state.places.places[i].pdaName
        position.latlng = new window.kakao.maps.LatLng(store.state.places.places[i].pdaLatitude, store.state.places.places[i].pdaLongitude)
        positions.push(position)
      }
      let customOverlay;

      map = new window.kakao.maps.Map(container, options);
      loadCustomOverlay(positions, customOverlay);
      loadMaker(positions, map);
      // loadZoomControl();
    };

    // 커스텀 오버레이
    const loadCustomOverlay = (positions, customOverlay) => {
      for (let i = 0; i < positions.length; i++) {
        // eslint-disable-next-line no-unused-vars, no-undef
        customOverlay = new kakao.maps.CustomOverlay({
          map: map,
          clickable: true, // 커스텀 오버레이 클릭 시 지도에 이벤트를 전파하지 않도록 설정한다
          // content: `
          //            <div>
          //               <div id = "${positions[i].id}" class = "ovr"
          //                   style="padding:0 5px;background:#fff; display: none;">${positions[i].id}${positions[i].title}
          //
          //               </div>
          //           </div>`,
          position: positions[i].latlng, // 커스텀 오버레이를 표시할 좌표
          xAnchor: 0.5, // 컨텐츠의 x 위치
          yAnchor: 0, // 컨텐츠의 y 위치
        });
      }
      // 커스텀 오버레이를 지도에 표시합니다
      //customOverlay.setMap(map);
    };

    // 지도 우측 확대 축소 컨트롤러
    const loadZoomControl = () => {
      // 지도에 확대 축소 컨트롤을 생성한다
      // eslint-disable-next-line no-undef
      const zoomControl = new kakao.maps.ZoomControl();

      // 지도의 우측에 확대 축소 컨트롤을 추가한다
      // eslint-disable-next-line no-undef
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    };

    // 지정한 위치에 마커 불러오기
    const loadMaker = (positions, map) => {
      console.log('뒤로가기하면 오냐?')
      // 마커 이미지의 주소
      const markerImageUrl =
          "https://t1.daumcdn.net/localimg/localimages/07/2012/img/marker_p.png",
        // eslint-disable-next-line no-undef
        markerImageSize = new kakao.maps.Size(40, 42), // 마커 이미지의 크기
        markerImageOptions = {
          // eslint-disable-next-line no-undef
          offset: new kakao.maps.Point(20, 42), // 마커 좌표에 일치시킬 이미지 안의 좌표
        };

      // 마커 이미지를 생성한다
      // eslint-disable-next-line no-undef
      let markerImage = new kakao.maps.MarkerImage(
        markerImageUrl,
        markerImageSize,
        markerImageOptions
      );

      console.log(positions)

      for (let i = 0; i < positions.length; i++) {
        console.log('뒤로가기하면 오냐?')
        const marker = new window.kakao.maps.Marker({
          position: positions[i].latlng, // 마커의 좌표
          image: markerImage, // 마커의 이미지
          map: map, // 마커를 표시할 지도 객체
          title: positions[i].id.toString(), // 마커의 아이디
        });

        window.kakao.maps.event.addListener(marker, "click", () => {
          open();
          map.setLevel(3);
          distance = getDistanceFromLatLonInKm(
            localStorage.getItem('currentLat'),
            localStorage.getItem('currentLng'),
            marker.getPosition().Ma,
            marker.getPosition().La
          );
          console.log(distance);
          setCenterMarker(marker.getPosition().Ma, marker.getPosition().La);
          // 지도 레벨을 4로 설정한다
        });

        marker.setMap(map);
      }
    };

    return {
      map: null,
      mapSearchText,
      filteredSearchList,
      changeKeyword,
      setCenterSearch,
      open,
      myBottomSheet,
      focusSetTimeout,
      goUrl,
      setCurrentPosition
    };
  },
};
</script>
<style scoped>
.setMyPosition-cont {
  width: 45px;
  height: 45px;
  z-index: 1002;
  position: absolute;
  bottom: 15%;
  background-color: white;
  left: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 0px 10px 3px #00000050;
}
.setMyPosition {
  background-image: url("@/assets/icons/Position.png");
  position: absolute;
  z-index: 1003;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* top: 34%;
  left: 91%; */
}
.bottom-sheet {
  padding-left: 5%;
  padding-bottom: 5%;
}
.coordinate {
  background-image: url("@/assets/icons/map.png");
  width: 3%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon {
  padding-top: 3%;
  width: 24%;
  align-items: center;
  text-align: center;
}
.charger-icon1 {
  background-image: url(@/assets/icons/charge_01.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon2 {
  background-image: url(@/assets/icons/charge_02.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon3 {
  background-image: url(@/assets/icons/charge_03.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon4 {
  background-image: url(@/assets/icons/charge_04.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon1-1 {
  background-image: url(@/assets/icons/charge_01_1.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon2-1 {
  background-image: url(@/assets/icons/charge_02_1.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon3-1 {
  background-image: url(@/assets/icons/charge_03_1.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.charger-icon4-1 {
  background-image: url(@/assets/icons/charge_04_1.png);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.phone-icon {
  background-image: url(@/assets/icons/phone.png);
  height: 20px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  vertical-align: middle;
}
.time-icon {
  background-image: url(@/assets/icons/time.png);
  height: 20px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  vertical-align: middle;
  padding-left: 9%;
}
.station-icon {
  background-image: url(@/assets/icons/station.png);
  height: 20px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  vertical-align: middle;
  padding-left: 10%;
}
.payment-btn {
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
