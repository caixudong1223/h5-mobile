const envConfig = {
  dev: {
    base: "https://test.hellozj.com",
  },
  test: {
    base: "https://test.hellozj.com",
  },
  prod: {
    base: "https://api.hellozj.com",
  },
};

export default envConfig[process.env.VUE_APP_URL];
