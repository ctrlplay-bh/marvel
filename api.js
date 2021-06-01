// const publicKey = process.env.PUBLIC_KEY;
// const privateKey = process.env.PRIVATE_KEY;

const publicKey = '457a89471624ab9e44eecf6e41719642';
const privateKey = '92f5e1854b1a8e1b26024610378b85e959f7fa0a';

const baseURL = 'http://gateway.marvel.com/v1/public';

const imgChar = document.querySelector('.img-char');
const characterName = document.querySelector('.character-name');
const characterDescription = document.querySelector('.description');

const getCharacter = function (event, form) {
  event.preventDefault();
  const charName = form.charName.value;
  let ts = Date.now();

  let hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

  let queryString = `${baseURL}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${charName}`;

  fetch(queryString).then((response) => {
    response.json().then((jsonData) => {
      const name = jsonData.data.results[0].name;
      const description = jsonData.data.results[0].description;
      const imageUrl = jsonData.data.results[0].thumbnail.path;
      const imageExtension = jsonData.data.results[0].thumbnail.extension;

      const imgSrc = `${imageUrl}.${imageExtension}`;

      characterName.textContent = name;
      characterDescription.textContent = description;
      imgChar.src = imgSrc;
      imgChar.alt = name;
    });
  });
};
