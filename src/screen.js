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
  #maxCapacity;
  #showings;
  #cleaningMins;
  constructor(name, capacity) {
    this.#name = name;
    this.#capacity = capacity;
    this.#maxCapacity = 100;
    this.#showings = [];
    this.#cleaningMins = 20;
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
    return this.#cleaningMins;
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

class ScreenList {
  #screens;
  constructor() {
    this.#screens = [];
  }

  getScreens() {
    return this.#screens;
  }

  getScreenByName(name) {
    const found = this.#screens.find((screen) => screen.name === name);
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
      this.#screens.push(new Screen(name, capacity));
      return true;
    }
    return "Exceeded max capacity";
  }
}

module.exports = {
  locateTime: locateTime,
  Showing: Showing,
  Screen: Screen,
  ScreenList: ScreenList,
};
