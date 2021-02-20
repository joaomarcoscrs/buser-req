import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import moment from 'moment'
 
moment.locale('pt-br')

Vue.use(Vue2Filters)

Vue.filter('json', value => {
  if (!value) return
  return JSON.stringify(value, null, 2)
})

Vue.filter('timeago', value => {
  return moment(value).fromNow()
})

Vue.filter('filtro_card', (cards_de_um_status, key, value) => {
  if (key === '' || key === null || key === undefined || value === '' || value === null || value === undefined){
    return cards_de_um_status
  }
  return cards_de_um_status.filter(c => c[key] === value)
})