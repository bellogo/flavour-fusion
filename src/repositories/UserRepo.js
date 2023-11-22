const UserModel = require('../models/user');

const BaseRepository = require('./BaseRepo');

module.exports = class UserRepository extends BaseRepository {
  constructor() {
    super();
    this.model = UserModel;
  }

 
};
