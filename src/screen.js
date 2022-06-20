locateTime = (time) => {
  new Date();
  d3.setMilliseconds(0);
  d3.setSeconds(0);
  d3.setMinutes(time.mins);
  d3.setHours(time.hours);
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

  timeIsAvailable(intendedStartTime, intendedEndTime) {
    intendedStartTime = locateTime(intendedStartTime);
    intendedEndTime = locateTime(intendedEndTime);

    for (let i = 0; i < this.#showings.length; i++) {
      const startTime = locateTime(this.#showings[i].startTime);
      const endTime = locateTime(this.#showings[i].endTime);

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
