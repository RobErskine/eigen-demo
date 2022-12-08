// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    pages: true,
    app: {
        head: {
            script: [
                {
                    src: 'https://staging.eigendev.com/MiraPayCapture/MerchantSDK.php'
                }
            ]
        }
    },
    modules: [
        'nuxt-headlessui',
        '@nuxtjs/tailwindcss'
    ],
    headlessui: {
        prefix: 'Headless'
    }
})
