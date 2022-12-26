class user {
  constructor() {
    this.username = null;
    this.gender = null;
    this.genderIcon = null;
    this.avatar = null;
  }

  setUsername() {
    const username = document.querySelector('#username');

    if (username.value.length !== 0) {
      this.username = username.value;
    } else {
      this.username = null;
    }

  }

  setGender() {
    const genders = Array.from(document.getElementsByClassName('gender'));

    genders.forEach(gender => {
      gender.addEventListener('click', () => {
        if (gender.classList.contains('male')) {
          document.querySelector('.female-field').classList.remove('active');
          document.querySelector('.male-field').classList.add('active');
          this.genderIcon = 'fa-solid fa-mars male';
          this.gender = 'Male';
        } else if (gender.classList.contains('female')) {
          document.querySelector('.male-field').classList.remove('active');
          document.querySelector('.female-field').classList.add('active');
          this.genderIcon = 'fa-solid fa-venus female';
          this.gender = 'Female';
        }
      })
    })
  }

  setAvatar() {
    const avatarField = document.querySelector('.avatar-field');
    const avatars = Array.from(document.getElementsByClassName('avatar-image'));

    avatarField.addEventListener('click', e => {
      avatars.forEach(avatar => {
        avatar.className = 'avatar-image';
      })
  
      if (e.target.classList.contains('avatar-image')) {
        e.target.classList.add('active');
        this.avatar = e.target.src;
      }
    })
  }

  getUsername() {
    return this.username;
  }

  getGender() {
    return this.gender;
  }

  getGenderIcon() {
    return this.genderIcon;
  }

  getAvatar() {
    return this.avatar;
  }
}

class audioController {
  constructor() {
    this.bgMusic = new Audio('../assets/audio/christmas.mp3');
    this.flipSound = new Audio('../assets/audio/flip.wav');
    this.matchSound = new Audio('../assets/audio/match.wav');
    this.victorySound = new Audio('../assets/audio/victory.wav');
    this.bgMusic.volume = 0.5;
    this.bgMusic.loop = true;
  }

  startMusic() {
    this.bgMusic.play();
  }

  stopMusic() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  }

  flip() {
    this.flipSound.play();
  }

  match() {
    this.matchSound.play();
  }

  victory() {
    this.stopMusic()
    this.victorySound.play();
  }
}

class gameSystem {
  constructor(card) {
    this.cardsArray = card;
    this.timer = 0;
    this.second = 0;
    this.minute = 0;
    this.hour = 0;
    this.hourText = document.getElementById('hour');
    this.minuteText = document.getElementById('minute');
    this.secondText = document.getElementById('second');
    this.flipsText = document.getElementById('flips');
    this.audio = new audioController();
  }

  startGame() {
    this.matchedCards = [];
    this.cardToCheck = null;
    this.totalClicks = 0;
    this.busy = true;

    setTimeout(() => {
      this.audio.startMusic();
      this.shuffleCards(this.cardsArray);
      this.counter = this.startCounter();
      this.busy = false
    }, 500)

    this.hideCards();
  }

  startCounter() {
    return setInterval(() => {
      this.timer++;
      this.second++;
      this.secondText.innerText = `0${this.second}`;

      if (this.second > 9) {
        this.secondText.innerText = this.second;
      }

      if (this.second > 59) {
        this.second = 0;
        this.minute++;
        this.minuteText.innerText = `0${this.minute}`;
      }

      if (this.minute > 9) {
        this.minuteText.innerText = this.minute;
      }

      if (this.minute > 59) {
        this.minute = 0;
        this.hour++;
        this.hourText.innerText = `0${this.hour}`;
      }

      if (this.hour > 9) {
        this.hourText.innerText = `0${this.hour}`;
      }
    }, 1000)
  }

  canFlipCards(card) {
    return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck; 
  }

  flipCards(card) {
    if (this.canFlipCards(card)) {
      this.audio.flip();
      card.classList.add('visible');
      this.totalClicks++;
      this.flipsText.innerText = this.totalClicks;

      if (this.cardToCheck) 
        this.checkForMatch(card);
      else 
        this.cardToCheck = card; 
    }
       
  }

  shuffleCards(cardsArray) {
    for (let i = cardsArray.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      cardsArray[i].style.order = randomIndex;
      cardsArray[randomIndex].style.order = i;
    }
  }

  hideCards() {
    this.cardsArray.forEach(card => {
      card.classList.remove('visible');
      card.classList.remove('matched');
    })
  }

  getTypeCard(card) {
    return card.getElementsByClassName('card-value')[0].src;
  }

  checkForMatch(card) {
    if (this.getTypeCard(card) === this.getTypeCard(this.cardToCheck)) 
      this.cardMatch(card, this.cardToCheck);
    else 
      this.cardMisMatch(card, this.cardToCheck);

    this.cardToCheck = null;
  }

  cardMatch(card1, card2) {
    this.audio.match();
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    card1.classList.add('matched');
    card2.classList.add('matched');

    if (this.matchedCards.length === this.cardsArray.length) {
      this.victory();
    }
  }

  cardMisMatch(card1, card2) {
    this.busy = true;

    setTimeout(() => {
      card1.classList.remove('visible');
      card2.classList.remove('visible');
      this.busy = false;
    }, 1000)
  }

  victory() {
    clearInterval(this.counter)
    this.audio.victory();
    document.querySelector('.game-container').classList.remove('visible');
    document.querySelector('.finish-section').classList.add('visible');
    document.querySelector('.finish-victory').classList.add('visible');
  }

}

// !mengecek ketika browser sedang loading
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  // !menghilangkan pop up selamat datang dan memunculkan sign up section
  document.querySelector('.enter-button').addEventListener('click', () => {
    document.querySelector('.welcome-section').classList.remove('visible');
    document.querySelector('.sign-up-section').classList.add('visible');
  })

  const userGame = new user();
  const cards = Array.from(document.getElementsByClassName('card'));
  const game = new gameSystem(cards);

  userGame.setGender();
  userGame.setAvatar();

  
  // !menambahkan event pada button start game untuk memulai game
  const buttonsStartGame = Array.from(document.getElementsByClassName('start'));
  buttonsStartGame.forEach(element => {
    element.addEventListener('click', () => {
      if (element.classList.contains('start-game')) {
        userGame.setUsername();
        if (userGame.getUsername() && userGame.getGender() && userGame.getGenderIcon() && userGame.getAvatar()) {
          document.querySelector('.sign-up-section').classList.remove('visible');
          document.querySelector('.game-container').classList.add('visible');
          game.startGame();
        } else {
          alert('Silahkan isi data diri terlebih dahulu');
        }
      } else if (element.classList.contains('start-again')) {
        document.querySelector('.finish-section').classList.remove('visible');
        document.querySelector('.finish-victory').classList.remove('visible');
        document.querySelector('.game-container').classList.add('visible');
        game.startGame();
      }
    })
  })

  // !menjalankan logika dari memory game
  cards.forEach(card => {
    card.addEventListener('click', () => {
      game.flipCards(card);
    })
  })
}