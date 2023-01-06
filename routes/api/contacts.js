const express = require('express')

const router = express.Router()

const { listContacts, getContactById, addContact, removeContact, updateContact } = require("../../models/contacts")


const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try {
    const data = await listContacts();
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: data
    }    
  })
    
  } catch (error) {
    next(error);   
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId
    const lookingContact = await getContactById(id)
    if (!lookingContact) {
      const error = new Error(`Item with \`${id}\` id not exist`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: lookingContact
      }
    })    
  } catch (error) {
    next(error); 
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = { ...req.body, id: String(Math.round(Math.random() * 1000)) }
    await addContact(newContact);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: newContact
      }
    })    
  } catch (error) {
    next(error)
    
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await removeContact(id);
    if (!result) {
      res.status(404).json({
        status: "Not Found",
        code: 404,
        message: `Contact with ${id} not found`
      })
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: `Contact ${result.name} deleted`
    })
    
  } catch (error) {
    next(error)    
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await updateContact(id, req.body);
    if (!result) {
      res.status(404).json({
        status: "Not Found",
        code: 404,
        message: "Not found"
      })
      return;
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })

    
  } catch (error) {
    next(error) 
  }
})

module.exports = router

