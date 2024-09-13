import { getProperties, getPropertyById, getPropertiesByUserId, createProperty, deletePropertyById, updatePropertyById } from '../mongodb/models/property.js';

export const getAllProperties = async (req, res) => {
  try {
    const properties = await getProperties();
    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const getProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    return res.json(property);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getPropertiesByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const properties = await getPropertiesByUserId(user_id);

    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: 'Properties not found' });
    }

    return res.json(properties);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createNewProperty = async (req, res) => {
  try {
    const values = req.body;
    console.log('Creating property with values:', values);
    const newProperty = await createProperty(values);
    return res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error creating property:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProperty = await deletePropertyById(id);

    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    return res.json(deletedProperty);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const values = req.body;

    if (!id) {
      return res.sendStatus(400);
    }

    const updatedProperty = await updatePropertyById(id, values);

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    return res.status(200).json(updatedProperty);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};