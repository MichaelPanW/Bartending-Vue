import { createApp } from "vue/dist/vue.esm-bundler.js";
import axios from "axios";
import "@/assets/scss/main.scss";
let wine_api = "/wine_source.json";
let content_api = "/wine_content.json";
const app = createApp({
  el: "#app",
  data: () => {
    return {
      search: "",
      postList: [],
      searchItem: [],
      contentList: [],
    };
  },
  computed: {
    filteredList() {
      return this.postList.filter((post) => {
        var checkSearch = true;
        this.searchItem.forEach((element) => {
          checkSearch = checkSearch & post.content.includes(element);
        });
        if (this.search) {
          checkSearch = checkSearch & post.text.includes(this.search);
        }
        return checkSearch;
      });
    },
  },
  mounted() {
    axios
      .get(wine_api)
      .then((response) => {
        this.postList = response.data;
        console.log(this.postList[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(content_api)
      .then((response) => {
        this.contentList = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    SendStraSearch() {
      if (this.contentList.includes(this.search)) {
        if (!this.searchItem.includes(this.search)) {
          this.searchItem.push(this.search);
          this.search = "";
        }
      }
    },
    removeSearchItem: function (index) {
      this.searchItem.splice(index, 1);
    },
    addSearchItem(text) {
      if (!this.searchItem.includes(text)) {
        this.searchItem.push(text);
      }
    },
  },
});
app.mount("#app");
