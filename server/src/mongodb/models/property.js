import mongoose from "mongoose";


const propertySchema = new mongoose.Schema({
    user_id : {type : String , required : true},
    sale_type : {type : String , required : true},
    prop_type  : {type : String , required : true},
    name : {type : String , required : true},
    image : {type : String , required : true},
    price_range : {
      min : {
        type : String,
        requried : true,
      },
      max : {
        type : String,
        requried : true,
      },
    },
    location : {
      name : {
        type : String,
        requried : true,
      },
      state : {
        type : String,
        requried : true,
      },
      country : {
        type : String,
        requried : true,
      }
    },
},{timestamps : true});


const property = mongoose.model("Property",propertySchema);

export default property;

// Property Actions
export const getProperties = () => Property.find();
export const getPropertyById = (id) => Property.findById(id);
export const getPropertiesByUserId = (user_id) => Property.find({ user_id });
export const createProperty = (values) => {
  console.log('Creating property with values:', values);
  return new Property(values).save()
    .then((property) => property.toObject())
    .catch((error) => {
      console.error('Error creating property:', error);
      throw error;
    });
};
export const deletePropertyById = (id) => Property.findOneAndDelete({ _id: id });
export const updatePropertyById = (id, values) => Property.findByIdAndUpdate(id, values);