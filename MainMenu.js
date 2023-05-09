
let currentGame;
const games = document.querySelectorAll('.game');

games.forEach(game => {
   game.addEventListener('click', () => {
      const text = game.textContent.trim();
      console.log(text);
      localStorage.setItem('Game' , text);
      document.querySelectorAll('.game').forEach(e => e.remove());
      var title = document.querySelector("#title");
      title.textContent = text;
      window.location.href = "Engine.html";
   });
});