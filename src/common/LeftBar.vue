<template>
  <div class="LeftBarPage">
    <div v-for="(item, index) in itemList" :key="index">
      <div :class="['item', { active: item.active }]" @click="itemClick(index)">
        <span>{{ item.text }}</span>
        <img
          v-if="item.subMenu.length && item.active"
          class="downArrow"
          src="../img/blueUp.png"
        />
        <img
          v-else-if="item.subMenu.length"
          class="downArrow"
          src="../img/down.png"
          alt
          srcset
        />
      </div>
      <ul v-if="item.active" class="menu_ui">
        <li
          v-for="(li, i) in item.subMenu"
          :key="i"
          :class="{ active: li.active }"
        >
          <router-link
            :to="{
              name: li.name,
              params: { ulName: item.name, liName: li.name }
            }"
            >{{ li.text }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import "./LeftBar.css";
export default {
  components: {},
  name: "LeftBar",
  data() {
    return {
      itemList: [
        {
          active: true,
          text: "用户管理",
          name: "index",
          subMenu: [
            {
              active: true,
              text: "注册用户",
              name: "index"
            }
          ]
        },
        {
          active: false,
          text: "系统设置",
          name: "system",
          subMenu: [
            {
              active: false,
              text: "系统设置",
              name: "system"
            }
          ]
        }
      ]
    };
  },
  props: {},
  computed: {
    ...mapGetters([
      //这里是getter 定义导出的数据
      "userInfo"
    ])
  },
  methods: {
    ...mapActions([
      //这里是 action 的具体方法名
      "getUserInfo"
    ]),
    itemClick: function(index) {
      this.itemList.forEach((element, i) => {
        if (i == index) {
          if (element.subMenu.length) {
            if (element.active) {
              element.active = false;
            } else {
              element.active = true;
            }
          } else {
            element.active = true;
            if (this.$route.name == element.name) {
              return;
            }
            this.$router.push({
              name: element.name,
              params: {
                ulName: element.name
              }
            });
          }
        } else {
          if (element.active) {
            element.active = false;
          }
        }
        if (element.subMenu.length) {
          element.subMenu.forEach(li => {
            if (li.name == this.$route.name) {
              li.active = true;
            } else if (li.active) {
              li.active = false;
            }
          });
        }
      });
    },
    getMarkDownInfo(params, path) {
      var that = this;
      //根据path展示左边栏位置
      if (!params.ulName) {
        params.ulName = path.split("/")[1];
        params.liName = path.split("/")[2];
      }
      //默认取第一项
      if (!params.ulName) {
        params.ulName = that.itemList[0].name;
        if (that.itemList[0].subMenu.length) {
          params.liName = that.itemList[0].subMenu[0].name;
        }
      }

      that.itemList.forEach(element => {
        if (element.name == params.ulName) {
          element.active = true;
          if (element.subMenu.length) {
            element.subMenu.forEach(li => {
              if (li.name == params.liName) {
                li.active = true;
              } else {
                if (li.active) {
                  li.active = false;
                }
              }
            });
          }
        } else {
          if (element.active) {
            element.active = false;
          }
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.getMarkDownInfo(to.params, to.path);
    }
  },
  created() {},
  mounted() {}
};
</script>
