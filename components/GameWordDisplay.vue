<template>
  <section class="word-display">
    <span
      v-for="(c, index) of splitWord"
      :key="c + index"
      :class="{ character: isCharacter(c) }"
      v-html="htmlForCharacter(c)"
    ></span>
  </section>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
export default {
  name: "GameWordDisplay",
  computed: {
    ...mapGetters("game", ["currentGame"]),
    splitWord() {
      return this.currentGame ? this.currentGame.word.split("") : [];
    }
  },
  methods: {
    isCharacter(c) {
      return c !== " ";
    },
    htmlForCharacter(c) {
      if (c === " " || c === "_") {
        return "&nbsp;";
      }

      return c;
    }
  }
};
</script>

<style scoped>
.word-display {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.word-display > span {
  font-size: 3rem;
  width: 1em;
  margin: 0 0.1em;
}

.character {
  border-bottom: 2px solid black;
  text-align: center;
}
</style>
