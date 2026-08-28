const c = require("ansi-colors")

const requiredEnvs = [
  {
    key: "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY",
    // TODO: we need a good doc to point this to
    description:
      "Learn how to create a publishable key: https://docs.medusajs.com/v2/resources/storefront-development/publishable-api-keys",
  },
]

function checkEnvVariables() {
  if (!process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) {
    process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY =
      "pk_0ba41e361db7a06c4487b2d4f3514131461230a992014264787cbafada3cc411"
  }

  if (!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL =
      "https://addis-b2b.onrender.com"
  }

  if (!process.env.NEXT_PUBLIC_DEFAULT_REGION) {
    process.env.NEXT_PUBLIC_DEFAULT_REGION = "et"
  }

  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    process.env.NEXT_PUBLIC_BASE_URL = "https://addis-b2b.vercel.app"
  }
}

module.exports = checkEnvVariables
