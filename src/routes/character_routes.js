import app from 'express'

// import asyncHandler from 'express-async-handler'

import CharacterController from '../controllers/character_controller'

const routes = app.Router()

routes.get('/:id', new CharacterController().index)

export default routes
