<template>
  <section class="container">
    <div class="subContainer">
      <h2 class="title">
        Word Guessing Game Instruction 
      </h2>
      <p>Word Guessing Game is a classic <u>free to play</u> game made for anyone whom like to challenge and
        improve their English vocabulary.</p>
      <br/>
      <h4><u>Instruction:</u></h4> 
      <ol>
        <li> Click "Start Game" button to start the game.</li>
        <li>Guess the word by inputing your guess word and click the button "Guess".</li>
        <li>You may use the hint button provided.</li>
        <li>Restart game button is available below with a new word to guess.</li>
        <li>Enjoy!</li>        
      </ol>
    </div>
    <br /><br />
    <div id="btnPlayGame">
      <nuxt-link to="/play" class="button is-primary is-large">Play Game</nuxt-link>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
#btnPlayGame{
  width:100%;
  text-align:center;  
}
#btnPlayGame a{
  text-decoration: none;
}
.container{
  width:960px;
  font-family:'Comic Sans MS';
  padding-top:30px;
  padding-bottom:20px;
}
.subContainer p{
  text-indent:1cm;
}
.subContainer h4{
  padding-bottom:20px;
}
.title{
  text-align:center;  
}
</style>
