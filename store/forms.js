import _ from 'lodash'

export const state = () => ({
  register: {
    password: '',
    email: ''
  },
  login: {
    password: '',
    email: ''
  },
  search: {
    sport: '',
    city: '',
    date: ''
  },
  annonce: {
    city: '',
    date: '',
    sport: '',
    users: []
  }
})

export const mutations = {
  updateField (state, { form, field, value }) {
    state[form][field] = value
  },
  reset (state, { form }) {
    state[form] = _.mapValues(state[form], '')
  },
  addUser (state, user) {
    state.annonce.users.push(user)
  }
}

export const actions = {

}
