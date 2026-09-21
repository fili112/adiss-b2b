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
  requiredEnvs.forEach(({ key, description }) => {
    if (!process.env[key]) {
      throw new Error(
        `Missing required environment variable: ${key}\n${description}`
      )
    }
  })

  if (!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL =
      "http://localhost:9000"
  }

  if (!process.env.NEXT_PUBLIC_DEFAULT_REGION) {
    process.env.NEXT_PUBLIC_DEFAULT_REGION = "et"
  }

  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:8000"
  }
}

module.exports = checkEnvVariables
