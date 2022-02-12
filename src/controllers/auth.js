const { auth } = require("../services");
const { response } = require("../helpers");



const welcomeText = async (req, res) => {
    const data = await auth.welcomeText(req.form);
    return response(res, data);
  };



  const addGroupContact = async (req, res) => {
    const data = await auth.addGroupContact(req.form);
    return response(res, data);
  };

  const deleteGroupContact = async (req, res) => {
    const data = await auth.deleteGroupContact(req.form);
    return response(res, data);
  };

  const getGroupContactByAuthId = async (req, res) => {
    const data = await auth.getGroupContactByAuthId(req.form);
    return response(res, data);
  };

  const removeAContactFromGroup = async (req, res) => {
    const data = await auth.removeAContactFromGroup(req.form);
    return response(res, data);
  };


  const addProducts = async (req, res) => {
    const data = await auth.addProducts(req.form);
    return response(res, data);
  };

  const viewAllProducts = async (req, res) => {
    const data = await auth.viewAllProducts(req.form);
    return response(res, data);
  }; 
  
  const viewProductsByType = async (req, res) => {
    const data = await auth.viewProductsByType(req.form);
    return response(res, data);
  };
  
const likeProducts = async (req, res) => {
    const data = await auth.likeProducts(req.form);
    return response(res, data);
  };

  const rateProducts = async (req, res) => {
    const data = await auth.rateProducts(req.form);
    return response(res, data);
  };

  const deleteProducts = async (req, res) => {
    const data = await auth.deleteProducts(req.form);
    return response(res, data);
  };

 
  module.exports = {
    welcomeText,
  
    addGroupContact,
    deleteGroupContact,
    getGroupContactByAuthId,
    removeAContactFromGroup,

    addProducts,
    viewAllProducts,
    viewProductsByType,
    likeProducts,
    rateProducts,
    deleteProducts,
    
    
}