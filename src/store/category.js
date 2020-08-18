import { firebase } from '@firebase/app'

export default {
  actions: {
    async createCategory ({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUserId')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
        return { title, limit, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory ({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUserId')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategories ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUserId')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
        // EQUALS through 'Object.keys().(map()'
        /*  const articles = []
        Object.keys(categories).forEach(key => {
          articles.push({
            title: categories[key].title,
            limit: categories[key].limit,
            id: key
          })
        })
        return articles */
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById ({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUserId')
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
        return { ...category, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
