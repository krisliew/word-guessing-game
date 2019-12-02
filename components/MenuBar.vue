<template>
<nav class="navbar navbar-expand-sm fixed-top justify-content-center">
  <ul class="navbar-nav">
    <li class="nav-item">
      <nuxt-link  v-if="activeSwap" to="/play" class="nav-link active">Play</nuxt-link>
      <nuxt-link  v-else to="/play" class="nav-link">Play</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link v-if="activeSwap == false" to="/faq" class="nav-link active">Instruction</nuxt-link>
      <nuxt-link v-else to="/faq" class="nav-link">Instruction</nuxt-link>
    </li>
  </ul>
        <!-- <div class="navbar-end"> **** test
          <div class="navbar-item">
            <div class="buttons">
              <button v-show="!currentUser"
                      class="button is-primary"
                      @click="startSignUp">
                <strong>Sign up</strong>
              </button>
              <button v-show="!currentUser"
                      class="button is-light"
                      @click="startSignIn">
                Sign in
              </button>
              <button v-show="currentUser"
                      class="button is-primary"
                      :class="{'is-loading': sendingSignOut}"
                      @click="submitSignOut">
                <strong>Sign Out</strong>
              </button>
            </div>
          </div>
        </div>  
      </div> **** test -->
      <!-- <AuthModal :active="authActive"
                 :loading="authLoading"
                 :error-message="authError"
                 :title="authText"
                 :submit-text="authText"
                 @cancel="cancelAuth"
                 @submit="submitAuth"
      /> -->
    </nav>
</template>

<script>
/* eslint-disable */
// import AuthModal from "@/components/AuthModal";
import { mapActions, mapGetters } from "vuex";

export default {
  data(){
    return{}
  },
  // created() {
  //   this.checkAccess();
  // },
  computed:{
    activeSwap(){
      if(this.$route.path == "/play"){
        return true
      }else if(this.$route.path == "/faq"){
        return false;
      }      
    }
  },
  mounted(){
    // console.log("MenuBar.vue => Current Route: " + this.$route.path);
    // if(this.$route.path == "/play"){
    //   this.activeSwap = true;
    // }else if(this.$route.path == "/faq"){
    //   this.activeSwap = false;
    // }
  },
  methods: {
    // ...mapActions("auth", [
    //   "startSignUp",
    //   "startSignIn",
    //   "endSignUp",
    //   "endSignIn",
    //   "submitSignUp",
    //   "submitSignIn",
    //   "submitSignOut",
    //   "checkAccess"
    // ]),
    // cancelAuth() {
    //   if (this.signingUp) {
    //     this.endSignUp();
    //   } else if (this.signingIn) {
    //     this.endSignIn();
    //   }
    // },
    // submitAuth(data) {
    //   if (this.signingUp) {
    //     this.submitSignUp(data);
    //   } else if (this.signingIn) {
    //     this.submitSignIn(data);
    //   }
    // }
  }
/* ,components: { AuthModal },
  computed: {
    ...mapGetters("auth", [
      "signingUp",
      "signingIn",
      "signUpError",
      "signInError",
      "sendingSignUp",
      "sendingSignIn",
      "sendingSignOut",
      "currentUser"
    ]),
    authActive() {
      return this.signingUp || this.signingIn;
    },
    authLoading() {
      return this.sendingSignUp || this.sendingSignIn;
    },
    authError() {
      return this.signUpError || this.signInError;
    },
    authText() {
      if (this.signingUp) {
        return "Sign Up";
      } else if (this.signingIn) {
        return "Sign In";
      }
      return "";
    }
   }
*/
};
</script>

<style scoped>
nav {
  background-color: #00d1b2;
}

nav li a{
  color:white;
  font-size: 20px;
  font-family: 'Comic Sans MS';
}

nav .active{
  text-decoration: underline;
}

nav li a:hover, nav li:hover{
  background-color:white;
  color:black;
}
</style>
