const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ex6r6m",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env:{
    baseURL:"http://localhost:3000",
    apiURL:"http://localhost:5000/api"
  },
});
