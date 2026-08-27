const { loadEnv, defineConfig, Modules } = require("@medusajs/framework/utils");

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: {
    company: {
      resolve: "./src/modules/company",
    },
    quote: {
      resolve: "./src/modules/quote",
    },
    approval: {
      resolve: "./src/modules/approval",
    },
    loyalty: {
      resolve: "./src/modules/loyalty",
    },
    [Modules.CACHE]: {
      resolve: "@medusajs/medusa/cache-inmemory",
    },
    [Modules.WORKFLOW_ENGINE]: {
      resolve: "@medusajs/medusa/workflow-engine-inmemory",
    },
    [Modules.STOCK_LOCATION]: {
      resolve: "@medusajs/medusa/stock-location",
    },
    [Modules.INVENTORY]: {
      resolve: "@medusajs/medusa/inventory",
    },
    [Modules.FULFILLMENT]: {
      resolve: "@medusajs/medusa/fulfillment",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/fulfillment-manual",
            id: "manual",
          },
        ],
      },
    },

    [Modules.PAYMENT]: {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "./src/modules/telebirr",
            id: "telebirr",
            options: {
              merchantAppId: process.env.TELEBIRR_APP_ID || "test",
            },
          },
        ],
      },
    },
  },
});
