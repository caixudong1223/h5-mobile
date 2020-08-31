<template>
  <div class="user-info">
    <div class="content">
      <div class="user-title">
        <van-icon name="arrow-left" @click="$router.go(-1)" />
        {{ title }}
      </div>
      <van-field
        v-model="userObject.name"
        :readonly="type == 1 || type == 2"
        placeholder="请输入真实姓名"
        maxlength="10"
        label="姓名"
      />

      <div class="van-cell">
        <div class="van-cell__title van-field__label">性别</div>
        <van-radio-group
          v-model="userObject.sex"
          direction="horizontal"
          :disabled="type == 1 || type == 2"
        >
          <van-radio :name="1" icon-size="14px">男</van-radio>
          <van-radio :name="2" icon-size="14px">女</van-radio>
        </van-radio-group>
      </div>

      <!-- <van-field
        v-model="userObject.name"
        placeholder="请输入出生日期"
        label="出生日期"
      /> -->
      <van-cell
        :class="userObject.birth ? '' : 'disable'"
        class="birth"
        :value="
          userObject && userObject.birth.length > 0
            ? userObject.birth
            : '请输入出生日期'
        "
        :is-link="type == 3 || !type"
        @click="showBirth"
      >
        <template #title>
          <div class="van-cell__title van-field__label" style="flex:inherit">
            出生日期
          </div>
        </template>
      </van-cell>
      <van-field
        v-model="userObject.idCard"
        :readonly="type == 1 || type == 2"
        placeholder="请输入身份证号"
        maxlength="18"
        label="身份证号"
      />
      <van-field
        v-model="userObject.company"
        :readonly="type == 1 || type == 2"
        placeholder="请输入公司全名"
        maxlength="20"
        label="公司名称"
      />
      <van-cell
        class="birth"
        :class="userObject.gameAreaName ? '' : 'disable'"
        :value="
          userObject.gameAreaName ? userObject.gameAreaName : '请选择分赛区'
        "
        :is-link="type == 3 || !type"
        @click="showGame"
      >
        <template #title>
          <div class="van-cell__title van-field__label" style="flex:inherit">
            分赛区
          </div>
        </template>
      </van-cell>

      <div class="custom-item">
        <div class="custom-content">
          <div class="custom-title van-hairline--bottom">
            <div style="color:#666666;">参赛项目</div>
            <div style="color:#999999;">可多选最多2项</div>
          </div>
          <div class="custom-choice">
            <span
              :class="
                userObject.events && userObject.events.indexOf('金牌店长') != -1
                  ? 'focused'
                  : ''
              "
              @click="addTxt('金牌店长')"
              >金牌店长</span
            >
            <span
              :class="
                userObject.events.indexOf('销售顾问') != -1 ? 'focused' : ''
              "
              @click="addTxt('销售顾问')"
              >销售顾问</span
            >
            <span
              :class="
                userObject.events.indexOf('家装设计') != -1 ? 'focused' : ''
              "
              @click="addTxt('家装设计')"
              >家装设计</span
            >
            <span
              :class="
                userObject.events.indexOf('制冷与空调') != -1 ? 'focused' : ''
              "
              @click="addTxt('制冷与空调')"
              >制冷与空调</span
            >
            <span
              :class="
                userObject.events.indexOf('锅炉与制暖') != -1 ? 'focused' : ''
              "
              @click="addTxt('锅炉与制暖')"
              >锅炉与制暖</span
            >
            <span
              :class="
                userObject.events.indexOf('智慧家庭工程师') != -1
                  ? 'focused'
                  : ''
              "
              @click="addTxt('智慧家庭工程师')"
              >智慧家庭工程师</span
            >
          </div>
        </div>
      </div>
      <van-cell
        class="birth"
        :class="userObject.workAddrName ? '' : 'disable'"
        @click="showWork"
        :value="
          userObject.workAddrName ? userObject.workAddrName : '请选择工作地址'
        "
        :is-link="type == 3 || !type"
      >
        <template #title>
          <div class="van-cell__title van-field__label" style="flex:inherit">
            工作地址
          </div>
        </template>
      </van-cell>
    </div>

    <div class="button-box" v-if="!type || type == 3">
      <van-button color="#3B7AFF" block round @click="saveGamePersonnel"
        >确定提交</van-button
      >
    </div>

    <van-popup v-model="birthShow" position="bottom">
      <van-datetime-picker
        v-model="time"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="confirmBirth"
        @cancel="cancelBirth"
        type="date"
        title="选择年月日"
      />
    </van-popup>
    <van-popup v-model="gameShow" position="bottom">
      <!--<div class="shop-title">选择分赛区</div>
       <div class="shop-input">
        <van-field
          v-model="gameValue"
          right-icon="search"
          @click-right-icon.stop="filterGameList"
          placeholder="请输入分赛区名称"
        />
      </div> 
      
      <div class="list-box">
        <div v-for="(item, index) in gameList" :key="index">
          <van-cell
            @click="chooseGame(item)"
            class="van-hairline--bottom"
            :value="(index + 1) + '、' +item.areaName"
            size="large"
          />
        </div>
      </div>-->
      <van-picker
        ref="picker"
        show-toolbar
        title="选择分赛区"
        :columns="gameList"
        :value-key="'areaName'"
        @cancel="gameShow = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-popup
      v-model="workAddrShow"
      position="bottom"
      :style="{ height: '400px' }"
    >
      <div class="shop-title">选择工作地址</div>
      <div class="address-box">
        <div class="custom-choice">
          <span
            v-for="(item, index) in addressList"
            :key="index"
            :class="
              choosed.areaId && choosed.areaId == item.areaId ? 'focused' : ''
            "
            @click="choosed = item"
            >{{ item.areaName }}</span
          >
        </div>
      </div>

      <div class="button-box">
        <van-button color="#3B7AFF" block @click="confirmAdd">确定</van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  name: "UserInfo",
  inject: ["reload"],
  data() {
    return {
      userObject: {
        id: "",
        name: "",
        mobile: "",
        sex: 0,
        birth: "",
        idCard: "",
        company: "",
        gameAreaId: "",
        gameAreaName: "",
        events: [],
        workAddrId: 1,
        workAddrName: "",
      },
      title: " 填写报名信息",
      birthShow: false,
      minDate: new Date(1910, 0, 1),
      maxDate: new Date(),
      time: new Date(),
      gameShow: false,
      gameValue: "",
      gameList: [],
      workAddrShow: false,
      addressList: [],
      choosed: {},
      type: "",
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.title =
      this.type == 1 || this.type == 2
        ? "查看报名信息"
        : this.type == 3
        ? "编辑报名信息"
        : " 填写报名信息";
    this.$set(this.userObject, "mobile", this.$route.query.mobile);
    if (this.type) {
      this.queryGamePersonnel();
    }
    this.getActivityArea();
    this.queryCityAreaInfoList();
  },
  methods: {
    getActivityArea() {
      this.$api.getActivityArea().then((res) => {
        if (res.rescode === 2000 && res.data.length) {
          this.gameList = res.data;
        }
      });
    },
    queryCityAreaInfoList() {
      let fd = new FormData();
      fd.append("upperAreaId", 320000);
      this.$api.queryCityAreaInfoList(fd).then(({ data }) => {
        this.addressList = data;
      });
    },
    addTxt(val) {
      if (this.type != 1 && this.type != 2) {
        if (
          this.userObject.events &&
          this.userObject.events.indexOf(val) == -1
        ) {
          if (this.userObject.events.length < 2) {
            this.userObject.events.push(val);
          }
        } else {
          this.userObject.events.splice(this.userObject.events.indexOf(val), 1);
        }
      }
    },
    onConfirm(value) {
      this.$set(this.userObject, "gameAreaName", value.areaName);
      this.$set(this.userObject, "gameAreaId", value.id);
      this.gameShow = false;
    },
    showBirth() {
      if (this.type != 1 && this.type != 2) {
        this.birthShow = true;
      }
    },
    showGame() {
      if (this.type != 1 && this.type != 2) {
        this.gameShow = true;
        this.$nextTick(() => {
          if(this.userObject.gameAreaId) {
            this.$refs.picker.setColumnValue(0, this.userObject.gameAreaName)
          }
        })
      }
    },
    showWork() {
      if (this.type != 1 && this.type != 2) {
        this.workAddrShow = true;
      }
    },
    queryGamePersonnel() {
      this.$api.queryGamePersonnel().then((res) => {
        if (res.rescode == 2000) {
          this.userObject = res.data;
          this.choosed.areaId = res.data.workAddrId;
          this.choosed.areaName = res.data.workAddrName;
          this.$set(this.userObject, "events", res.data.events.split(","));
        } else {
          Toast(res.message || "");
        }
      });
    },
    filterGameList() {
      this.gameList = this.gameList.filter(
        (item) => item.indexOf(this.gameValue) != -1
      );
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    confirmBirth(val) {
      console.log(val);
      var date = new Date(val);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var time = YY + MM + DD;
      this.$set(this.userObject, "birth", time);
      console.log(this.userObject.birth);
      this.birthShow = false;
    },
    cancelBirth() {
      this.birthShow = false;
    },
    chooseGame(item) {
      this.$set(this.userObject, "gameAreaName", item.areaName);
      this.$set(this.userObject, "gameAreaId", item.areaId);
      this.gameShow = false;
    },
    getGeme() {},
    confirmAdd() {
      this.$set(this.userObject, "workAddrName", this.choosed.areaName);
      this.$set(this.userObject, "workAddrId", this.choosed.areaId);
      this.workAddrShow = false;
    },
    saveGamePersonnel() {
      if (!this.userObject.name) {
        this.$toast("请输入姓名");
        return false;
      }
      if (!this.userObject.sex) {
        this.$toast("请选择性别");
        return false;
      }
      if (!this.userObject.birth) {
        this.$toast("请选择出生日期");
        return false;
      }
      var idTest = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if (!idTest.test(this.userObject.idCard)) {
        this.$toast("请输入正确的身份证号码");
        return false;
      }
      if (!this.userObject.company) {
        this.$toast("请输入公司名称");
        return false;
      }
      if (!this.userObject.gameAreaName) {
        this.$toast("请选择分赛区");
        return false;
      }
      if (!this.userObject.events || this.userObject.events.length == 0) {
        this.$toast("请选择参赛项目");
        return false;
      }

      if (!this.userObject.workAddrName) {
        this.$toast("请选择工作地址");
        return false;
      }
      let params = { ...this.userObject };
      params.events = params.events.join(",");
      this.$api.saveGamePersonnel(params).then((res) => {
        if (res.rescode == 2000) {
          this.$router.push(`/result`);
        } else {
          Toast(res.message || "");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.user-title {
  background: #ffffff;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(38, 38, 38, 1);
  text-align: center;
  position: relative;
}
.user-title i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.user-info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f4f4f4;
}
.content {
  padding-bottom: 80px;
  background: #f4f4f4;
}

.custom-item {
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  margin: 10px auto;
  padding: 0 20px;
}
.custom-title {
  display: flex;
  justify-content: space-between;
  height: 44px;
  line-height: 44px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 0px 0px rgba(244, 244, 244, 1);
  font-family: PingFangSC-Medium, PingFang SC;
  font-size: 14px;
  font-weight: 500;
}

.custom-choice span {
  font-size: 12px;
  font-weight: 400;
  color: #666666;
}
.custom-choice {
  margin-top: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.custom-choice span {
  text-align: center;
  height: 32px;
  line-height: 32px;
  background: #f8f8f8;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;
  color: #666666;
  font-size: 12px;
}
.custom-choice .focused {
  color: #07aeff;
  background: rgba(7, 174, 255, 0.1);
}
.custom-choice span {
  margin-right: 7px;
}
>>> .van-cell {
  margin: 10px 0;
  padding: 15px 15px;
}
.birth >>> .van-cell__title {
  flex: inherit;
}
.birth >>> .van-cell__value {
  flex: auto;
  text-align: left;
}
>>> .van-cell:after {
  border: none !important;
}
.button-box {
  position: fixed;
  bottom: 0;
  padding: 10px 26px;
  right: 0;
  left: 0;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
}
.disable >>> .van-cell__value span {
  color: #c8c9cc;
}

.shop-title {
  height: 50px;
  line-height: 50px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 0px 0px #cecece36;
  border-radius: 12px 12px 0px 0px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
}
.shop-input {
  margin: 5px 10px;
  position: fixed;
  right: 0;
  left: 0;
}
.shop-input .van-cell,
.van-popup .van-cell {
  padding: 8px 0;
  margin: 0;
}
.shop-input .van-cell {
  background: #f4f4f4;
  padding: 8px;
}
.list-box {
  height: 350px;
  padding: 0 15px 0;
  overflow-y: scroll;
  // margin-top: 50px;
}
.list-box .van-cell {
  border-bottom: 1px solid #e8e8e85e;
}
.van-popup .button-box {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 0;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
}
.address-box {
  padding: 15px;
}
.van-cell__value {
  color: #333333;
}
</style>
