const ratings = ["U", "PG", "12", "15", "18"];

const convertTime = (time) => {
  const converted = /^(\d?\d):(\d\d)$/.exec(time);
  if (converted === null) {
    return null;
  }
  const hours = parseInt(converted[1]);
  const mins = parseInt(converted[2]);
  return {
    hours: hours,
    mins: mins,
  };
};

const timeIsValid = (time) => {
  const converted = convertTime(time);
  if (converted.hours > 0 && converted.mins <= 60) {
    return true;
  }
  return false;
};

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
    this.name = name;
    this.rating = rating;
    this.duration = duration;
  }
}

class FilmList {
  #films;
  constructor() {
    this.#films = [];
  }

  getFilmByName(name) {
    for (let i = 0; i < this.#films.length; i++) {
      if (this.films[i].name === name) {
        const found = this.films[i];
        return found;
      }
    }
    return false;
  }

  addFilm(name, rating, duration) {
    if (this.getFilmByName(name)) {
      return "Film already exists";
    }
    if (!this.ratingIsValid(rating)) {
      return "Invalid rating";
    }
    if (!this.timeIsValid(duration)) {
      return "Invalid duration";
    }
    const newFilm = new Film(name, rating, duration);
    this.#films.push(newFilm);
    return true;
  }
}

module.exports = {
  ratings: ratings,
  convertTime: convertTime,
  timeIsValid: timeIsValid,
  ratingIsValid: ratingIsValid,
  Film: Film,
  FilmList: FilmList,
};
