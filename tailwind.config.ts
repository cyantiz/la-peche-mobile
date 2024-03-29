module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue',
    ],
    corePlugins: {
        preflight: false,
    },
    theme: {
        fontFamily: {
            sans: ['Whyte', 'Montserrat', 'Roboto', 'sans-serif'],
            serif: ['Playfair Display', 'serif'],
        },
        extend: {
            colors: {
                'bitter-sweet': '#FB7B64',
                'raisin-black': '#221D23',
                'cafe-noir': '#4F3824',
                'gold-metallic': '#DDB967',
                'green-apple': '#18A058',
                'almost-white': '#FEFEFE',
                cherry: '#CA1919',
                inactive: '#A8AAB9',
                ocean: '#63B9DB',
                'inactive-base': '#F8FAFB',
            },
            screens: {
                xs: '480px',
            },
            transitionDuration: {
                DEFAULT: '300ms',
            },
        },
    },
    plugins: [],
}
