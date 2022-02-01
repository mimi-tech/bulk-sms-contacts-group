const Joi = require("joi");

module.exports = {
  
  
  addGroupContact: {
    authId: Joi.string().uuid().required(),
    contact: Joi.array().required(),
    contactName: Joi.string().uppercase({ force: true }).required()
  },

  deleteGroupContact: {
    authId: Joi.string().uuid().required(),
    contactName: Joi.string().required()
  },

  
  getGroupContactByAuthId: {
    authId: Joi.string().uuid().required(),
    
  },
  removeAContactFromGroup: {
    authId: Joi.string().uuid().required(),
    contactName: Joi.string().uppercase({ force: true }).required(),
    contact: Joi.string().required()


  },


  

  
  
}