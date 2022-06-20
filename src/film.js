const convertTime = (time) => {
  const converted = /^(\d?\d):(\d\d)$/.exec(time);
  return converted;
};

const getHours = (converted) => {
  const hours = parseInt(converted[1]);
  return hours;
};

const getMins = (converted) => {
  const mins = parseInt(converted[2]);
  return mins;
};

const timeIsValid = (time) => {
  const converted = convertTime(time);
  if (
    converted != null &&
    getHours(converted) > 0 &&
    getMins(converted) <= 60
  ) {
    return true;
  }
  return false;
};

const ratings = ["U", "PG", "12", "15", "18"];

const ratingIsValid = (rating) => {
  if (ratings.includes(rating)) {
    return true;
  }
  return false;
};

class Film {
  #name;
  #rating;
  #duration;
  constructor(name, rating, duration) {
    this.#name = name;
    this.#rating = rating;
    this.#duration = duration;
  }

  getName() {
    return this.#name;
  }

  getRating() {
    return this.#rating;
  }

  getDuration() {
    return this.#duration;
  }
}

module.exports = {
  Film: Film,
  convertTime: convertTime,
  getHours: getHours,
  getMins: getMins,
  timeIsValid: timeIsValid,
  ratingIsValid: ratingIsValid,
  ratings: ratings,
};
