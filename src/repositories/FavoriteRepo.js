const model = require('../models/Favorites');

const BaseRepository = require('./BaseRepo');

module.exports = class FavoriteRepository extends BaseRepository {
  constructor() {
    super();
    this.model = model;
  }

 
};
