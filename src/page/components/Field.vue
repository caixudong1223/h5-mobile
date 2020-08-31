<template>
  <div class="field van-hairline--bottom">
    <!-- 左侧 -->
    <div class="field-label">
      {{ label }}
    </div>
    <!-- input框 -->
    <div class="field-input">
      <input
        :type="defaultType"
        v-model="defaultValue"
        :placeholder="placeholder"
        @focus="isFocus = true"
        @change="updateValue($event.target.value)"
        @blur="changeBlur()"
        @mousedown="handleMousedown($event)"
        @click="fieldClick($event)"
      />
    </div>
    <!-- 右侧操作 -->
    <div class="field-operate">
      <!--<img
        v-if="showClear"
        @click.stop="updateValue('')"
        class="field-operate-icon"
        src="../../assets/img/clear.png"
        alt=""
      />-->

      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Field",
  data() {
    return {
      defaultValue: this.value,
      showClear: false,
      isFocus: false,
      defaultType: this.type
    };
  },
  props: {
    fieldClass: {
      // true默认为input类型
      type: Boolean,
      default: true
    },
    isPassword: {
      //是否是密码输入框
      type: Boolean,
      default: false
    },
    keyname: {
      type: String,
      default: ""
    },
    showHide: {
      type: Boolean,
      default: true
    },
    clear: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  methods: {
    updateValue(value) {
      this.defaultValue = value;
      this.$emit("update-val", {
        value,
        key: this.keyname
      });
    },
    handleMousedown(e) {
      if (!this.fieldClass) {
        e.preventDefault();
      }
    },
    changeBlur() {
      //键盘回弹问题
      let u = navigator.userAgent,
        app = navigator.appVersion;
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isIOS) {
        setTimeout(() => {
          const scrollHeight =
            document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 20);
      }
      this.isFocus = false;
    },
    fieldClick(e) {
      console.log(e);
      e.preventDefault();
      this.$emit("field-click");
    },
    switchInputType() {
      if (this.defaultType === "text") {
        this.defaultType = "password";
      } else {
        this.defaultType = "text";
      }
      this.$emit('func',this.defaultType)
    }
  },
  watch: {
    value(newVal) {
      this.defaultValue = newVal;
    },
    fieldClass(newVal) {
      this.fieldClass = newVal
    },
    defaultValue(newVal, oldVal) {
      this.showClear = this.clear && this.defaultValue.length > 0;
    },
    isFocus(newVal) {
      if (!newVal) {
        this.showClear = newVal;
      } else {
        this.showClear = this.clear && this.defaultValue.length > 0;
      }
    },
    type(val) {
      this.defaultType = val;
    }
  }
};
</script>

<style lang="scss">
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: rgba(206, 206, 206, 1);
  /* placeholder字体大小  */
  font-size: 14px;
  // font-weight: bold;
}
.field {
  display: flex;
  height: 54px;
  line-height: 54px;
  background: #fff;
  margin: 10px auto;
  box-shadow: 0px 0px 0px 0px rgba(232, 232, 232, 1);
  
  &-label {
    font-size: 14px;
    width: 70px;
    color: #000;
  }

  &-input {
    flex: 1;

    input {
      outline: none;
      background: #0000;
      font-size: 14px;
      // caret-color: #0000;
      width: 100%;
      padding: 15px 0;
      height: 14px;
      line-height: 14px;
      border: none;
    }
  }

  &-operate {
    &-icon {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
