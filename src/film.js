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
}

module.exports = {
  Film: Film,
};
