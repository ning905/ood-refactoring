const { getMins, getHours, convertTime } = require("./film");

locateTime = (time) => {
  const thisTime = new Date();
  thisTime.setMilliseconds(0);
  thisTime.setSeconds(0);
  thisTime.setMinutes(getMins(time));
  thisTime.setHours(getHours(time));
  return thisTime;
};

class Showing {
  #film;
  #startTime;
  #endTime;
  constructor(film, startTime, endTime) {
    this.#film = film;
    this.#startTime = startTime;
    this.#endTime = endTime;
  }

  getFilm() {
    return this.#film;
  }

  getStartTime() {
    return this.#startTime;
  }

  getEndTime() {
    return this.#endTime;
  }
}

class Screen {
  #name;
  #capacity;
  #showings;
  constructor(name, capacity) {
    this.#name = name;
    this.#capacity = capacity;
    this.#showings = [];
  }

  getName() {
    return this.#name;
  }

  getCapacity() {
    return this.#capacity;
  }

  getShowings() {
    return this.#showings;
  }

  getCleaningMins() {
    return 20;
  }

  addShowing(film, startTime, endTime) {
    const showing = new Showing(film, startTime, endTime);
    this.#showings.push(showing);
  }

  timeIsAvailable(intendedStart, intendedEnd) {
    const intendedStartTime = locateTime(convertTime(intendedStart));
    const intendedEndTime = locateTime(convertTime(intendedEnd));

    for (let i = 0; i < this.#showings.length; i++) {
      const startTime = locateTime(
        convertTime(this.#showings[i].getStartTime())
      );
      const endTime = locateTime(convertTime(this.#showings[i].getEndTime()));

      if (
        (startTime < intendedStartTime && intendedStartTime < endTime) ||
        (startTime < intendedEndTime && intendedEndTime < endTime) ||
        (intendedStartTime < startTime && intendedEndTime > endTime)
      ) {
        return false;
      }
    }
    return true;
  }
}

module.exports = {
  locateTime: locateTime,
  Showing: Showing,
  Screen: Screen,
};
