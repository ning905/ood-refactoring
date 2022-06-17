const { FilmList, timeIsValid, convertTime } = require("./film");
const { ScreenList, locateTime } = require("./screen");

class Cinema {
  //TODO: Large class
  constructor() {
    this.films = new FilmList();
    this.screens = new ScreenList();
  }

  addScreen(screenName, capacity) {
    return this.screens.addScreen(screenName, capacity);
  }

  //Add a new film
  addFilm(name, rating, duration) {
    return this.films.addFilm(name, rating, duration);
  }
  //Add a showing for a specific film to a screen at the provided start time
  add(filmName, screenName, startTime) {
    const film = this.films.getFilmByName(filmName);
    if (!film) {
      return "Invalid film";
    }

    const screen = this.screens.getScreenByName(screenName);
    if (!screen) {
      return "Invalid screen";
    }

    if (!timeIsValid(startTime)) {
      return "Invalid start time";
    }

    const intendedStartTime = convertTime(startTime);
    const duration = convertTime(film.duration);
    if (duration === null) {
      return "Invalid duration";
    }

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

  allShowings() {
    let showings = {};
    for (let i = 0; i < this.screens.length; i++) {
      const screen = this.screens[i];
      for (let j = 0; j < screen.showings.length; j++) {
        const showing = screen.showings[j];
        if (!showings[showing.film.name]) {
          showings[showing.film.name] = [];
        }
        showings[showing.film.name].push(
          `${screen.name} ${showing.film.name} (${showing.film.rating}) ${showing.startTime} - ${showing.endTime}`
        );
      }
    }

    return showings;
  }

  getAllShowings() {}
}

module.exports = Cinema;
