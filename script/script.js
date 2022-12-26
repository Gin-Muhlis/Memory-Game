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

  // !logika pengambilan data user
  const userGame = new user();
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
        } else {
          alert('Silahkan isi data diri terlebih dahulu');
        }
      } else if (element.classList.contains('start-again')) {
        document.querySelector('.finish-section').classList.remove('visible');
      }
    })
  })

}