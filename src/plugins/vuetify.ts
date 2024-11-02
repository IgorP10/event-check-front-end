import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { COLORS } from '@/styles/colors'

import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          background: COLORS.GRAY_700,
          surface: COLORS.GRAY_600,
          primary: COLORS.GREEN_500,
          secondary: COLORS.GRAY_400,
          error: COLORS.RED,
          warning: COLORS.RED_DARK,
          info: COLORS.GRAY_300,
          success: COLORS.GREEN_700,
        }
      },
    },
  }
})
