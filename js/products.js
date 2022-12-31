const url = "https://vue3-course-api.hexschool.io/v2";
const path = "yuna1002";
const { createApp } = Vue;
const app = {
  data() {
    return {
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    checkAdmin() {
      axios
        .post(`${url}/api/user/check`)
        .then((res) => {
          //console.log(res.data);
          this.getData();
        })
        .catch((err) => {
          console.dir(err);
          window.location = "login.html";
        });
    },
    getData() {
      axios
        .get(`${url}/api/${path}/admin/products`)
        .then((res) => {
          this.products = res.data.products;
          //console.log(this.products);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  mounted() {
    // 當cookie有token時，取得token,放進headers裡
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)yunaToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    //console.log(token);
    axios.defaults.headers.common["Authorization"] = token;
    this.checkAdmin();
  },
};

createApp(app).mount("#app");
