import express from "express";

import {
  getAllProperties,
  getProperty,
  getPropertiesByUserId,
  createProperty,
  deleteProperty,
  updateProperty
} from '../controllers/property.controller.js';
import { isLoggedIn, isOwner } from "../middleware/index.js";

const router = express.Router();

router.route('/getProperties').get(isLoggedIn, getAllProperties);
router.route('/getProperty/:id').get(isLoggedIn, isOwner, getProperty);
router.route('/getPropertiesByUserId/:user_id').get(isLoggedIn, getPropertiesByUserId);
router.route('/createProperty').post(isLoggedIn, createProperty);
router.route('/deleteProperty/:id').delete(isLoggedIn, isOwner, deleteProperty);
router.route('/updateProperty/:id').patch(isLoggedIn, isOwner, updateProperty);

export default router;