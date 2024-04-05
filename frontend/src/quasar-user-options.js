
import './styles/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'
import {Notify} from "quasar";

// To be used on app.use(Quasar, { ... })
export default {
  config: {
      brand: {
          primary: '#056e83',
          secondary: '#f47967',
          accent: '#9C27B0',

          dark: '#1d1d1d',
          'dark-page': '#121212',

          positive: '#21BA45',
          negative: '#C10015',
          info: '#31CCEC',
          warning: '#F2C037',
      },
      notify: Notify.setDefaults({
        position: 'top',
        timeout: 2500,
        textColor: 'white',
        progress: true,
        actions: [{ icon: 'close', color: 'white' }]
      }),
  },
  plugins: {
      Notify,
  },
}