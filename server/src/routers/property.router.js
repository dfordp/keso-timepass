import express from "express";

import {
  getAllProperties,
  getProperty,
  getPropertiesByUser,
  createNewProperty,
  deleteProperty,
  updateProperty
} from '../controllers/property.controller.js';
import { isLoggedIn, isOwner, upload } from "../middleware/index.js";

const router = express.Router();

router.route('/getProperties').get(isLoggedIn, getAllProperties);
router.route('/getProperty/:id').get(isLoggedIn, isOwner, getProperty);
router.route('/getPropertiesByUserId/:user_id').get(isLoggedIn, getPropertiesByUser);
router.route('/createProperty').post(isLoggedIn, upload.single('image') ,  createNewProperty);
router.route('/deleteProperty/:id').delete(isLoggedIn, isOwner, deleteProperty);
router.route('/updateProperty/:id').patch(isLoggedIn, isOwner, updateProperty);

export default router;