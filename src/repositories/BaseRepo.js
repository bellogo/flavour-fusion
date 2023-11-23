
module.exports = class BaseRepository {

  constructor(model) {
    model;
  }
    
    /**
     *
     * @param data
     */
    create = async (data)=> await this.model.create(data);

    
    // /**
    //  *
    //  * @param data
    //  */
    // createMany = async (data: any): Promise<any> => await this.model.insertMany(data);

    /**
     *
     * @param id
     */
    getModelById = async (id) => await this.model.findOne({_id: id}).exec();

    /**
     *
     * @param filterObj
     */
    getModelByCondition = async (filterObj = {}) => await this.model.findOne(filterObj).exec();

/**
     *
     * @param page
     * @param limit
     * @param filterObj
     */
getCollection = async (filterObj = {})=> {
    return {
        records: await this.model.find(filterObj)
    };
}

    /**
     *
     * @param page
     * @param limit
     * @param filterObj
     */
    getCollectionwWithPagination = async (limit = 10, page = 1, filterObj = {})=> {
        return {
            records: await this.model.find(filterObj)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 })
                .lean(),

            pagination: {
                total_records: await this.model.find(filterObj).countDocuments(),
                current_page: page,
                records_per_page: limit
            }
        };
    }

    // /**
    //  *
    //  * @param limit
    //  * @param pageVal
    //  * @param filterObj
    //  * @param populate
    //  */
    // getCollectionWithPopulation = async (limit: number = 10, pageVal: number = 1, filterObj = {}, populate: string): Promise<any> => await this.model.find(filterObj)
    //     .skip((pageVal - 1) * limit)
    //     .limit(limit)
    //     .sort({ createdAt: -1 })
    //     .populate(populate)
    //     .exec();

    // /**
    //  * This returns with pagination attributes
    //  * @param limit
    //  * @param pageVal
    //  * @param filterObj
    //  * @param populate
    //  * @param arrayPointer
    //  */
    // getCollectionWithPopulationAndPaginationDetails = async (limit: number = 10, pageVal: number = 1, filterObj = {}, populate: string, arrayPointer: string): Promise<any> =>
    // {
    //     let data = await this.model.find(filterObj)
    //         .sort({ createdAt: -1 })
    //         .skip((pageVal - 1) * limit)
    //         .limit(limit)
    //         .populate(populate)
    //         .exec();

    //     let total_data = await this.model.find(filterObj).exec();

    //     return {
    //         [arrayPointer]:    data,
    //         total_records:    total_data.length,
    //         current_page:     pageVal,
    //         records_per_page: limit
    //     };
    // }

    // /**
    //  *
    //  * @param conditions
    //  * @param fields
    //  */
    // getLatest = async (conditions =  {},  fields =  {}): Promise<any> => await this.model.findOne(conditions, fields, { sort: { 'created_at' : -1 } }).exec()

    /**
     *
     * @param id
     * @param data
     * @param returnUpdatedData
     */
    updateModel = async (id, data, returnUpdatedData = true) => await this.model.findByIdAndUpdate({ _id: id }, data, { new: returnUpdatedData });

 
    // /**
    //  * Save a new admin record by passing a key-pair object
    //  * @returns {Promise<void>}
    //  */
    // saveRecord = async (objBody: any) =>
    // {
    //     //instantiate a new admin object
    //     const record = new this.model(objBody);
    //     //save the record
    //     await record.save();

    //     //Append the role model
    //     return record;
    // }


    /**
     * Delete a record
     * @param id
     * @returns {Promise<Query<Document | null, Document>>}
     */
    async deleteModel(id)
    {
        return this.model.findByIdAndDelete(id);
    };

    /**
     * Delete all records
     * @returns {Promise<Query<Document | null, Document>>}
     */
     async deleteCollection()
     {
         return this.model.deleteMany({});
     };

    /**
     *
     * @param query
     * @param data
     * @param returnUpdatedData
     */
    updateModelWithQuery = async (query, data, returnUpdatedData = true)=>
    {
        return await this.model.findOneAndUpdate(query, data, { new: returnUpdatedData });
    }

    /**
     * This sets the value of an array of object element back to array
     * @param whereObject
     * @param argumentsObject
     * @returns {Promise<void>}
     */
    updateAllRecords = async (whereObject, argumentsObject) =>
    {
        await this.model.updateMany(
            whereObject,
            { $set: argumentsObject }
        );
    }

    // /**
    //  * This is used to update any key:value of a given array of object
    //  * @param whereObject
    //  * @param arrayReference
    //  * @param object
    //  * @returns {Promise<void>}
    //  */
    // updateArrayOfObjectsWhereExists = async (whereObject: object, arrayReference: string, object: any) =>
    // {
    //     let updatedObj = {};

    //     //loop through the object to convert to key:value pair
    //     for (let property in object)
    //     {
    //         const key = `${arrayReference}.$.${property}`;
    //         updatedObj = {...updatedObj, ...{[key]: object[property]}};
    //     }

    //     await this.model.updateOne( whereObject, { $set: updatedObj } );
    // }

    // /**
    //  * This sets the value of an array of object element back to array
    //  * @param whereObject
    //  * @param arrayReference
    //  * @returns {Promise<void>}
    //  */
    // resetArrayOfObjects = async (whereObject: object, arrayReference: string) =>
    // {
    //     await this.model.updateOne(
    //         whereObject,
    //         {
    //             $set: {
    //                 [arrayReference]: []
    //             }
    //         }
    //     );
    // }

    // /**
    //  * This adds an object to already existing array
    //  * @param whereQueryObject
    //  * @param arrayKey
    //  * @param newObj
    //  * @returns {Promise<boolean>}
    //  */
    // addObjectToExistingArrayOfObjects = async (whereQueryObject: object, arrayKey: string, newObj: object) =>
    // {
    //     await this.model.updateOne(
    //         whereQueryObject,
    //         {
    //             $push: {
    //                 [arrayKey]: newObj
    //             }
    //         }
    //     );

    //     return true;
    // }

    // /**
    //  * This adds an object to already existing array
    //  * @param whereQueryObject
    //  * @param insertArrayKey
    //  * @param insertArrayValue
    //  * @param updateArrayKey
    //  * @param updateArrayValue
    //  * @returns {Promise<void>}
    //  */
    // addMultipleObjectToExistingArrayOfObjects = async (whereQueryObject: object, insertArrayKey: string, insertArrayValue: any,
    //                                                     updateArrayKey: string, updateArrayValue: any) =>
    // {
    //     await this.model.updateOne(
    //         whereQueryObject,
    //         {
    //             $push: {
    //                 [insertArrayKey]: insertArrayValue
    //             },
    //             $set: {
    //                 [updateArrayKey]: updateArrayValue
    //             }
    //         }
    //     );
    // }
}
