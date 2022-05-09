import button_start from "./imgs/button_start.png";
import button_clear from "./imgs/button_clear.png";
import button_item from "./imgs/button_item.png";

const audioRunGame = require("./sounds/sound.wav");
const audioClick = require("./sounds/click.wav");
const audioCoin = require("./sounds/coin.wav");

const images = {
  button_start,
  button_clear,
  button_item,
};

const audio = {
  audioRunGame,
  audioClick,
  audioCoin,
};

const media = {
  images,
  audio,
};

export default media;
