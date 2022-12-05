import app from 'express'
/* import asyncHandler from 'express-async-handler' */

import CharacterController from '../controllers/character_controller'

const routes = app.Router()

routes.get('/:number', new CharacterController().index)

routes.post('/', new CharacterController().create)

routes.get('/', new CharacterController().show)

export default routes
