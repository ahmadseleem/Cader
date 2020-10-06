/**
** Environment: names storage.
**/
class Environment {
  /**
   * Creates an environment with a given record.
   */
  constructor(record = {}) {
    this.record = record;
  }

  /**
   * Creates a variable with the given name and value.
   */
  define(name, value) {
    this.record[name] = value;
    return value;
  }

  /**
   * Lookup for a variable in the given environment.
   */
  lookup(name) {
    if (!this.record.hasOwnProperty(name)) {
      throw new ReferenceError(`Variable "${name}" is not defined.`);
    }
    return this.record[name];
  }
}

module.exports = Environment;