import { firebase } from '@firebase/app'

export default {
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      // eslint-disable-next-line no-useless-catch
      try {
        // async method and return promise => put 'await' + login () is async
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        throw e
      }
    },
    async logout () {
      await firebase.auth().signOut()
    },
    async register ({ dispatch }, { email, password, name }) {
      // eslint-disable-next-line no-useless-catch
      try {
        // async method and return promise => put 'await' + login () is async
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUserId')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    getUserId () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  }
}
