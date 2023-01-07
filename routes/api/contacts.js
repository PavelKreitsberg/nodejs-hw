const express = require('express')

const router = express.Router()

const { validation, ctrlWrapper } = require('../../middlewares')

const { contactSchema } = require('../../schemas')

const { contacts: ctrl } = require('../../controllers')

const validationMiddleware = validation(contactSchema)

router.get('/', ctrlWrapper(ctrl.getAllContacts))

router.get('/:contactId', ctrlWrapper(ctrl.getContactById))

router.post('/', validationMiddleware, ctrlWrapper(ctrl.addNewContact))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContactById))

router.put('/:contactId', validationMiddleware, ctrlWrapper(ctrl.updateContactById))

module.exports = router

