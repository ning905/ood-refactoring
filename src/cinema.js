const { Film } = require("./film");
const { Screen } = require("./screen");

const ratings = ["U", "PG", "12", "15", "18"];

const convertTime = (time) => {
  const converted = /^(\d?\d):(\d\d)$/.exec(time);
  return converted;
};

const getHours = (convertedTime) => {
  const hours = parseInt(converted[1]);
  return hours;
};

const getMins = (convertedTime) => {
  const mins = parseInt(converted[2]);
  return mins;
};

const timeIsValid = (time) => {
  const converted = convertTime(time);
  if (converted != null && converted.hours > 0 && converted.mins <= 60) {
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

class Cinema {
  //TODO: Large class
  #maxCapacity;
  #screens;
  #films;
  constructor() {
    this.#films = [];
    this.#screens = [];
    this.#maxCapacity = 100;
  }

  getScreens() {
    return this.#screens;
  }

  getFilms() {
    return this.#films;
  }

  getScreenByName(name) {
    const found = this.#screens.find((screen) => screen.getName() === name);
    if (found) {
      return found;
    }
    return false;
  }

  addScreen(name, capacity) {
    if (capacity <= this.#maxCapacity) {
      if (this.getScreenByName(name)) {
        return "Screen already exists";
      }
      const newScreen = new Screen(name, capacity);
      this.#screens.push(newScreen);
      return true;
    }
    return "Exceeded max capacity";
  }

  getFilmByName(name) {
    const found = this.#films.find((film) => film.getName() === name);
    if (found) {
      return found;
    }
    return false;
  }

  addFilm(name, rating, duration) {
    if (this.getFilmByName(name)) {
      return "Film already exists";
    }
    if (!ratingIsValid(rating)) {
      return "Invalid rating";
    }
    if (!timeIsValid(duration)) {
      return "Invalid duration";
    }
    const newFilm = new Film(name, rating, duration);
    this.#films.push(newFilm);
  }

  //Add a showing for a specific film to a screen at the provided start time
  addFilmToScreen(filmName, screenName, startTime) {
    const film = this.getFilmByName(filmName);
    if (!film) {
      return "Invalid film";
    }

    const screen = this.getScreenByName(screenName);
    if (!screen) {
      return "Invalid screen";
    }

    if (!timeIsValid(startTime)) {
      return "Invalid start time";
    }

    const intendedStartTime = convertTime(startTime);
    const duration = convertTime(film.duration);

    const intendedEndTime = {};
    intendedEndTime.hours = intendedStartTime.hours + duration.hours;
    intendedEndTime.minutes =
      intendedStartTime.mins + duration.mins + screen.getCleaningMins();

    if (intendedEndTime.minutes >= 60) {
      intendedEndTime.hours += Math.floor(intendedEndTime.minutes / 60);
      intendedEndTime.minutes = intendedEndTime.minutes % 60;
    }

    if (intendedEndTime.hours >= 24) {
      return "Invalid start time - film ends after midnight";
    }

    if (!screen.timeIsAvailable(intendedStartTime, intendedEndTime)) {
      return "Time unavailable";
    }

    screen.addShowing(film, intendedStartTime, intendedEndTime);
  }

  getAllShowings() {
    let allShowings = {};
    for (let i = 0; i < this.screens.length; i++) {
      const screen = this.screens[i];
      for (let j = 0; j < screen.showings.length; j++) {
        const showing = screen.showings[j];
        const filmName = showing.film.name;
        if (!allShowings[filmName]) {
          allShowings[filmName] = [];
        }
        allShowings[filmName].push(
          `${screen.name} ${filmName} (${showing.film.rating}) ${showing.startTime} - ${showing.endTime}`
        );
      }
    }

    return allShowings;
  }
}

module.exports = Cinema;

const cinema = new Cinema();
cinema.addScreen("Screen 1", 20);
console.log(cinema.addScreen("Screen 2", 25));
console.log(cinema.addScreen("Screen 1", 25));
console.log(cinema.getScreens());

const screen = new Screen("Screen 1", 25);
console.log(screen);
