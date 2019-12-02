import { authService } from "@/services";

export const state = () => ({
  signingUp: false,
  signingIn: false,
  sendingSignIn: false,
  sendingSignUp: false,
  sendingSignOut: false,
  currentUser: null,
  signUpError: null,
  signOutError: null,
  signInError: null
});

export const getters = {
  signingUp: state => state.signingUp,
  signingIn: state => state.signingIn,
  sendingSignIn: state => state.sendingSignIn,
  sendingSignUp: state => state.sendingSignUp,
  sendingSignOut: state => state.sendingSignOut,
  currentUser: state => state.currentUser,
  signOutError: state => {
    if (state.signOutError) {
      return state.signOutError.error.message;
    }

    return "";
  },
  signUpError: state => {
    if (state.signUpError) {
      return state.signUpError.error.message;
    }

    return "";
  },
  signInError: state => {
    if (state.signInError) {
      return state.signInError.error.message;
    }

    return "";
  }
};

export const mutations = {
  setSigningUp: (state, val) => {
    state.signingUp = val;
  },
  setSigningIn: (state, val) => {
    state.signingIn = val;
  },
  setSendingSignUp: (state, val) => {
    state.sendingSignUp = val;
  },
  setCurrentUser: (state, user) => {
    state.currentUser = user;
  },
  setSignUpError: (state, error) => {
    state.signUpError = error;
  },
  setSendingSignOut: (state, val) => {
    state.sendingSignOut = val;
  },
  setSignOutError: (state, error) => {
    state.signOutError = error;
  },
  setSignInError: (state, error) => {
    state.signInError = error;
  },
  clearErrors: state => {
    state.signUpError = null;
    state.signInError = null;
    state.signOutError = null;
  }
};

export const makeActions = authService => {
  return {
    startSignUp: ({ commit }) => {
      commit("setSigningUp", true);
    },
    endSignUp: ({ commit }) => {
      commit("clearErrors");
      commit("setSigningUp", false);
    },
    startSignIn: ({ commit }) => {
      commit("setSigningIn", true);
    },
    endSignIn: ({ commit }) => {
      commit("clearErrors");
      commit("setSigningIn", false);
    },
    submitSignUp: async ({ commit }, { username, password }) => {
      // clear error if we have one
      commit("setSignUpError", null);

      // waiting for sign up response flag
      commit("setSendingSignUp", true);

      const signUpResponse = await authService.signUp({ username, password });

      // set error if present
      if (signUpResponse.error) {
        commit("setSignUpError", signUpResponse);
      } else {
        // otherwise set user and end sign up proccess
        commit("setCurrentUser", signUpResponse);
        commit("setSigningUp", false);
      }

      // no longer waiting for response
      commit("setSendingSignUp", false);
    },
    submitSignIn: async ({ commit }, { username, password }) => {
      // clear error if we have one
      commit("setSignInError", null);

      // waiting for sign up response flag
      commit("setSendingSignIn", true);

      const signInResponse = await authService.signIn({ username, password });

      // set error if present
      if (signInResponse.error) {
        commit("setSignInError", signInResponse);
      } else {
        // otherwise set user and end sign up proccess
        commit("setCurrentUser", signInResponse);
        commit("setSigningIn", false);
      }

      // no longer waiting for response
      commit("setSendingSignIn", false);
    },
    submitSignOut: async ({ commit, state }) => {
      if (!state.currentUser) {
        return;
      }

      commit("setSendingSignOut", true);

      const signOutResponse = await authService.signOut({
        accessToken: state.currentUser.accessToken
      });

      if (signOutResponse.error) {
        commit("setSignOutError", signOutResponse);
      } else {
        commit("setCurrentUser", null);
      }

      commit("setSendingSignOut", false);
    },
    checkAccess: async ({ commit }) => {
      const verifyResponse = await authService.verifyAccess();

      if (!verifyResponse.error) {
        commit("setCurrentUser", verifyResponse);
      }
    }
  };
};

export const actions = makeActions(authService);
