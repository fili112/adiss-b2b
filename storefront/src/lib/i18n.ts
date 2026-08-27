export type Locale = "en" | "am"

const dictionaries = {
  en: {
    welcome: "Welcome to our B2B Portal",
    search: "Search products...",
    cart: "Cart",
    login: "Log in",
    checkout: "Checkout",
    quotes: "My Quotes",
    orders: "My Orders",
  },
  am: {
    welcome: "እንኳን ወደ B2B ፖርታላችን በደህና መጡ",
    search: "ምርቶችን ይፈልጉ...",
    cart: "ጋሪ",
    login: "ግባ",
    checkout: "ክፈል",
    quotes: "የእኔ ጥቅሶች",
    orders: "የእኔ ትዕዛዞች",
  },
}

export const getDictionary = (locale: Locale) => dictionaries[locale] || dictionaries.en
