const {
  Film,
  convertTime,
  getHours,
  getMins,
  timeIsValid,
  ratingIsValid,
} = require("./film");
const { Screen } = require("./screen");

class Cinema {
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
    const duration = convertTime(film.getDuration());

    const intendedEndTimeHours =
      getHours(intendedStartTime) + getHours(duration);
    const intendedEndTimeMinutes =
      getMins(intendedStartTime) + getMins(duration) + screen.getCleaningMins();
    if (intendedEndTimeMinutes >= 60) {
      intendedEndTimeHours += Math.floor(intendedEndTimeMinutes / 60);
      intendedEndTimeMinutes = intendedEndTimeMinutes % 60;
    }

    if (intendedEndTimeHours >= 24) {
      return "Invalid start time - film ends after midnight";
    }

    const intendedEndTime = intendedEndTimeHours + ":" + intendedEndTimeMinutes;
    if (!screen.timeIsAvailable(startTime, intendedEndTime)) {
      return "Time unavailable";
    }

    screen.addShowing(film, startTime, intendedEndTime);
  }

  getAllShowings() {
    let allShowings = {};
    for (let i = 0; i < this.#screens.length; i++) {
      const currentScreen = this.#screens[i];
      for (let j = 0; j < currentScreen.getShowings().length; j++) {
        const currentShowing = currentScreen.getShowings()[j];
        const filmName = currentShowing.getFilm().getName();
        if (!allShowings[filmName]) {
          allShowings[filmName] = [];
        }
        allShowings[filmName].push(
          `${currentScreen.getName()} ${filmName} (${currentShowing
            .getFilm()
            .getRating()}) ${currentShowing.getStartTime()} - ${currentShowing.getEndTime()}`
        );
      }
    }

    return allShowings;
  }
}

module.exports = Cinema;
