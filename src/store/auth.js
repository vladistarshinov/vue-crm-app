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
    }
  }
}
