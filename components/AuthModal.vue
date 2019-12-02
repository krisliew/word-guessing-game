<template>
<div class="modal" :class="{'is-active': active}">
  <div class="modal-background" @click="cancel()"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ title }}</p>
      <button class="delete" :disabled="loading" aria-label="close" @click="cancel()"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input v-model="username" class="input" type="text" placeholder="Username">
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input v-model="password" class="input" type="password" placeholder="Password">
        </div>
      </div>
      <article v-if="errorMessage" class="message is-danger">
        <div class="message-body">
          {{ errorMessage }}
        </div>
      </article>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" :class="{'is-loading': loading}" @click="submit()">{{ submitText }}</button>
      <button class="button" :disabled="loading" @click="cancel()">{{ cancelText }}</button>
    </footer>
  </div>
</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    submitText: {
      type: String,
      required: true
    },
    cancelText: {
      type: String,
      default: "Cancel"
    },
    active: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: null
    }
  },
  data: () => {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    submit() {
      this.$emit("submit", {
        username: this.username,
        password: this.password
      });
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style scoped>
</style>
