

const {
  responseCode, errorResponse, successResponse, returnPastNdaysDateList, returnPastNMonthYearDateList,
} = require('../utilities/helper');

class MainController {
  constructor(mainRepo) {
    this.mainRepo = mainRepo;
  }

  /**
   *
   * create controller
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
   create = async (req, res) => {
     try {
       const resource = await this.mainRepo.create(req.body);
       return successResponse(res, responseCode.CREATED, 'resource has been added.', resource);
     } catch (err) {
       console.log(err);
       return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);
     }
   }


  /**
   *
   *  update resource
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
  update = async (req, res) => {
    try {
      const id = req.body.id || req.params.id;
      const resource = await this.mainRepo.updateModel(id, req.body);
      return successResponse(res, responseCode.SUCCESS, 'resource has been updated.', resource);
    } catch (err) {
      
      console.log(err);
      return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);
    }
  }

 /**
 *
 * get filtered resources by given conditions
 * @static
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
 getAll = async (req, res) => {
   try {
     return successResponse(res, responseCode.SUCCESS, 'resources has been delivered.', await this.mainRepo.getPaginatedCollectionWithAssociations(req.query));
   } catch (err) {
     console.log(err);
     return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);
   }
 }

   /**
   *
   * get one resource controller
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
   getOne = async (req, res) => {
     try {
       const { id } = req.params;
       const resource = await this.mainRepo.getModelWithAssociations(id);
       if (!resource) return errorResponse(res, responseCode.BAD_REQUEST, 'resource does not exist.');

       return successResponse(res, responseCode.SUCCESS, 'resource has been delivered.', resource);
     } catch (err) {
       console.log(err);
       return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);
     }
   }

   /**
   *
   * delete resource controller
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
   delete = async (req, res) => {
     try {
       const { id } = req.params;
       const filterObj = { where: { id } };


       const resource = await this.mainRepo.getModelByCondition({ where: { id } });
       if (!resource) return errorResponse(res, responseCode.BAD_REQUEST, 'resource does not exist.');

      

       await this.mainRepo.deleteModelByCondition(filterObj);


       return errorResponse(res, responseCode.SUCCESS, 'resource has been soft-deleted.');
     } catch (err) {
       console.log(err);
       return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);
     }
   }

  
}
module.exports = MainController;
