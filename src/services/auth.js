/* eslint-disable no-unreachable */
const { v4: uuid } = require("uuid");

const {
    Op: { and },

} = require("sequelize");

const { constants } = require("../configs");
const { ContactGroup } = require("../models")
const { Products } = require("../models")




  
/**
 * Display welcome text
 * @param {Object} params  no params.
 * @returns {Promise<Object>} Contains status, and returns message 
 */
const welcomeText = async () => {
    try {
        return {
            status: true,
            message: "welcome to contact service",
        };

    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: constants.SERVER_ERROR("WELCOME TEXT"),
        };
    }
}





/**
 * for creating group contact
 * @param {Object} params email, password, username, profileImageUrl.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */

 const addGroupContact = async (params) => {
    try {

        const { 
             authId,
             contact,
             contactName
            } = params;

        
        //check if  contact is already registered
        const ussrAccount = await ContactGroup.findOne({
            where: {
                [and]: [
                {authId:authId},
                {contactName:contactName},
                ] 
            },
        });

        if (ussrAccount) {

            const storedContact = ussrAccount.dataValues.contacts
            
            var newArray = storedContact.concat(contact);
           let uniqueChars = [...new Set(newArray)];


           const newContact = await ContactGroup.update({
                 contacts: uniqueChars
               },{
                where: {
                    [and]: [
                    {authId:authId},
                    {contactName:contactName},
                    ] 
                },
               })

               if(newContact){
               return {
                   status: true,
                   message: "contact updated successfully",
                   data:uniqueChars
               };
            
            }
            return {
                status: false,
                message: "Error adding contact",
                data:uniqueChars
            };

        }

    
          
         //add the contact
         const newContact = await ContactGroup.create({
            id: uuid(),
            authId: authId,
            contacts: contact,
            contactName:contactName
              })

              return {
                status: true,
                message: "contact added successfully",
                data:newContact
            };
        


    } catch (error) {
        return {
            status: false,
            message: constants.SERVER_ERROR("adding contact"),
        };
    }
}




/**
 * for deleting group
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */

 const deleteGroupContact = async (params) => {
    try {
        const { authId, contactName } = params

        //check if the user is already existing
        const user = await ContactGroup.findOne({
            where: {
                [and]: [
                {authId:authId},
                {contactName:contactName},
                ] 
            },
        })

        if (!user) {
            return {
                status: false,
                message: "contact does not exist"
            };
        }



        //go ahead and delete the account
        await ContactGroup.destroy({
            where: {
                [and]: [
                {authId:authId},
                {contactName:contactName},
                ] 
            },
        })

        return {
            status: true,
            message: "contact group deleted successfully"
        };
    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: constants.SERVER_ERROR("DELETING contact group"),
        };
    }
}


/**
 * for fetching all contact for a user
 * @param {Object} params  No params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */
 const getGroupContactByAuthId = async (params) => {
    try {

        const {  authId } = params;

       

        const allMessages = await ContactGroup.findAll({


            attributes: {
                exclude: [
                    "createdAt",
                    
                    
                ],
            },
            
            where: {
                authId: authId
            }
        });


        return {
            status: true,
            data: allMessages
        };
    } catch (e) {
        return {
            status: false,
            message: constants.SERVER_ERROR("ALL CONTACT"),
        };
    }
}



/**
 * for deleting group
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */

 const removeAContactFromGroup = async (params) => {
    try {
        const { authId, contactName,contact } = params

        //check if the user is already existing
        const user = await ContactGroup.findOne({
            where: {
                [and]: [
                {authId:authId},
                {contactName:contactName},
                ] 
            },
        })

        if (!user) {
            return {
                status: false,
                message: "contact does not exist"
            };
        }

        const storedContact = user.dataValues.contacts
        const index = storedContact.indexOf(contact);
        if (index > -1) {
            storedContact.splice(index, 1);
           }

        //go ahead and delete the account
        await ContactGroup.update({
            contacts: storedContact
          },{
            where: {
                [and]: [
                {authId:authId},
                {contactName:contactName},
                ] 
            },
          })

        return {
            status: true,
            message: "contact removed successfully"
        };
    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: constants.SERVER_ERROR("DELETING  A contact group"),
        };
    }
}




/**
 * for adding products
 * @param {Object} params email, password, username, profileImageUrl.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */

 const addProducts = async (params) => {
    try {
console.log(new Date());
        const { 
             
            productImageUrl,
             productName,
             productType,
             productSize,
             productStock,
             productOwnerFirstName,
             productOwnerLastName,
             productOwnerId,
             productPrice

            } = params;

  //add the product
  const newProducts = await Products.create({
    productId: uuid(),
    productImageUrl: productImageUrl,
    productName: productName,
    productType:productType,
    productSize:productSize,
    productStock:productStock,
    productOwnerFirstName:productOwnerFirstName,
    productOwnerLastName:productOwnerLastName,
    productOwnerId:productOwnerId,
    dateAdded:new Date().toDateString(),
    productRate:1.0,
    productLike:0,
    productPrice:productPrice
      })

      return {
        status: true,
        message: "Product added successfully",
        data:newProducts
    };

} catch (e) {
    console.log(e);
    return {
        status: false,
        message: constants.SERVER_ERROR("Adding a product"),
    };
}
 }

/**
 * for fetching all products
 * @param {Object} params  No params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */
 const viewProductsByType = async (params) => {
    try {

        const { page, productType } = params;

        const pageCount = 15;

        const allProducts = await Products.findAll({

            where: {productType:productType},
            attributes: {
                exclude: [
                    "createdAt",
                   
                    
                ],
            },
            limit: pageCount,
            offset: pageCount * (page - 1),
        });


        return {
            status: true,
            data: allProducts
        };
    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: constants.SERVER_ERROR("ALL Products by type"),
        };
    }
}




/**
 * for fetching all products by type
 * @param {Object} params  No params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */
 const viewAllProducts = async (params) => {
    try {

        const { page } = params;

        const pageCount = 15;

        const allProducts = await Products.findAll({


            attributes: {
                exclude: [
                    "createdAt",
                   
                    
                ],
            },
            limit: pageCount,
            offset: pageCount * (page - 1),
        });


        return {
            status: true,
            data: allProducts
        };
    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: constants.SERVER_ERROR("ALL Products"),
        };
    }
}







/**
 * for liking products
 * @param {Object} params  No params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */
 const likeProducts = async (params) => {
    try {

        const { productId } = params;

       //check if the product is already existing
       const isProduct = await Products.findOne({
        where: {productId:productId },
    })

      if(!isProduct){
        return {
            status: false,
            message: "Sorry this product does not exist",
        };
      }
      let likeCount = isProduct.dataValues.productLike;
        await Products.update({
            productLike: likeCount + 1
          },{
            where: {productId:productId },
          })

        return {
            status: true,
            message: "like count updated successfully"
        };
    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: constants.SERVER_ERROR("ALL Products"),
        };
    }
}


/**
 * for rating products
 * @param {Object} params  No params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */
 const rateProducts = async (params) => {
    try {

        const { productId, rate } = params;

       //check if the product is already existing
       const isProduct = await Products.findOne({
        where: {productId:productId },
    })

      if(!isProduct){
        return {
            status: false,
            message: "Sorry this product does not exist",
        };
      }
      let rateCount = isProduct.dataValues.productRate * rate /2;
        await Products.update({
            productRate: rateCount
          },{
            where: {productId:productId },
          })

        return {
            status: true,
            message: "Rate count updated successfully"
        };
    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: constants.SERVER_ERROR("ALL Products"),
        };
    }
}


/**
 * for deleting product
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */

 const deleteProducts= async (params) => {
    try {
        const { productId, productOwnerId } = params

        //check if the user is already existing
        const user = await Products.findOne({
            where: {
                [and]: [
                {productId:productId},
                {productOwnerId:productOwnerId},
                ] 
            },
        })

        if (!user) {
            return {
                status: false,
                message: "Sorry this is not your product"
            };
        }



        //go ahead and delete the account
        await Products.destroy({
            where: {
                [and]: [
                    {productId:productId},
                    {productOwnerId:productOwnerId},
                ] 
            },
        })

        return {
            status: true,
            message: "product deleted successfully"
        };
    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: constants.SERVER_ERROR("DELETING contact group"),
        };
    }
}


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
    deleteProducts
   
}