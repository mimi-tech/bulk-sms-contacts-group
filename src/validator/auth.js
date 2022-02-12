const Joi = require("joi");

module.exports = {
  
  
  addGroupContact: {
    authId: Joi.string().uuid().required(),
    contact: Joi.array().required(),
    contactName: Joi.string().uppercase({ force: true }).required()
  },

  deleteGroupContact: {
    authId: Joi.string().uuid().required(),
    contactName: Joi.string().uppercase({ force: true }).required()
  },

  
  getGroupContactByAuthId: {
    authId: Joi.string().uuid().required(),
    
  },
  removeAContactFromGroup: {
    authId: Joi.string().uuid().required(),
    contactName: Joi.string().uppercase({ force: true }).required(),
    contact: Joi.string().required()


  },


  
  addProducts: {
    productImageUrl: Joi.string().required(),
    productName: Joi.string().required(),
    productType: Joi.string().required().valid("Shoes","Clothes","Books","Phones").required(),
    productSize: Joi.string().required(),
    productStock: Joi.string().required(),
    productOwnerFirstName: Joi.string().required(),
    productOwnerLastName: Joi.string().required(),
    productOwnerId: Joi.string().required(),
    productPrice: Joi.number().required(),


  },
  viewProductsByType: {
    productType: Joi.string().required(),
    page: Joi.number().required()
  },

  viewAllProducts: {
    page: Joi.number().required()
  },
  

  likeProducts: {
    productId: Joi.string().uuid().required()
  },


  rateProducts: {
    productId: Joi.string().uuid().required(),
    rate: Joi.number().required()
  },


  deleteProducts: {
    productId: Joi.string().uuid().required(),
    productOwnerId: Joi.string().required()
  },
  
}