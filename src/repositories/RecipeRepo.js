const RecipeModel = require('../models/recipe');

const BaseRepository = require('./BaseRepo');

module.exports = class RecipeRepository extends BaseRepository {
  constructor() {
    super();
    this.model = RecipeModel;
  }

 
};
