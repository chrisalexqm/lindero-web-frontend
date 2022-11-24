module.exports = {
  content: ['./{pages,components,layouts,plugins}/**/*.{vue,js,ts}'],
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: 'light',
    themes: [
      {
        mytheme: {
          primary: '#f5870a',
          '--rounded-btn': '0.25rem'
        }
      }
    ]
  },
  theme: {
    colors: {
      'lindero-blue': '#1573ba',
      'lindero-blue-light': '#35bde8',
      'lindero-blue-darken': '#045c87',
      'lindero-gray': '#575756',
      'lindero-orange-700': '#C46C08',
      'lindero-orange': '#f5870a',
      'lindero-orange-500': '#F79F3B',
      'lindero-orange-100': '#FDE7CE',
      'lindero-white': '#ffffff',
      'lindero-gray-darken': '#3d3d3d',
      'lindero-gray-light': '#707070',
      'lindero-gray-4': '#F0F0F0',
      'lindero-body-1': '#fcfcfd',
      'lindero-body-2': '#F3F4F6',
      'lindero-dark-blue-cover': '#1F2937'
    },
    fontFamily: {
      teko: ['Teko', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('~/assets/images/home-ban-pt.png')",
        'after-sales': "url('~/assets/images/after-sales.jpg')",
        'metalworking-industry':
          "url('~/assets/images/metalworking-industry.jpg')",
        'ceramic-industry': "url('~/assets/images/ceramic-industry.jpg')",
        'plastic-industry': "url('~/assets/images/plastic-industry.jpg')",
        us: "url('~/assets/images/us.jpg')",
        contact: "url('~/assets/images/contact.jpg')",
        products: "url('~/assets/images/products.jpg')",
        blog: "url('~/assets/images/blog.jpg')",
        'video-poster': "url('~/assets/images/video-poster.jpg')"
      }
    }
  }
}
