import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../components/ui/button";
import { DialogHeader } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { FaCaretDown, FaEye } from "react-icons/fa";
import { MdDelete, MdOutlineFileDownload } from "react-icons/md";
import { property, sales } from "../helpers/data";
import axios from 'axios';
//@ts-ignore
export const RecordCard = ({ name, sale_type, prop_type, recordAttachment, price_range, location , id }: {
  name: string;
  sale_type: string;
  prop_type: string;
  recordAttachment: string;
  price_range: {
    min: string;
    max: string;
  };
  location: {
    name: string;
    state: string;
    country: string;
  };
}) => {

  const handleDownload = async () => {
    const response = await fetch(recordAttachment);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    const fileExtension = recordAttachment.split('.').pop();
    link.setAttribute('download', `file.${fileExtension}`);

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  //@ts-ignore
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/property/deleteProperty/${id}`, {
        headers: {
          'Authorization': localStorage.getItem("token"),
        },
        withCredentials: true
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-300 w-72 h-40 rounded-md">
      <div className="bg-gray-100 h-20 rounded-t">
        <img src={recordAttachment} className='w-full h-full overflow-allow'></img>
      </div>
      <div className="bg-gray-300 h-20 flex flex-col justify-between px-1 ">
        <div className="font-semibold text-xl">
          {name}
        </div>
        <div className="flex flex-row justify-end mb-1 mr-1 gap-2">
          <Dialog>
            <DialogTrigger><FaEye size={25} opacity={0.75} /></DialogTrigger>
            <DialogContent className='h-[70vh] overflow-auto'>
              <DialogHeader>
                <DialogTitle>
                <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
                    Details
                  </h1>
                </DialogTitle>
                <div className='flex flex-col gap-2 font-semibold'>
                  <label>
                    Name
                    <Input disabled className="my-4 w-64 outline-2" value={name} />
                  </label>
                  <label>
                    Sale Type
                    <Input disabled className="my-4 w-64 outline-2" value={sale_type} />
                  </label>
                  <label>
                    Property Type
                    <Input disabled className="my-4 w-64 outline-2" value={prop_type} />
                  </label>
                  <label>
                    Price
                    <Input disabled className="my-4 w-64 outline-2" value={price_range.min} />
                    <Input disabled className="my-4 w-64 outline-2" value={price_range.max} />
                  </label>
                  <label>
                    Location
                    <Input disabled className="my-4 w-64 outline-2" value={location.name} />
                    <Input disabled className="my-4 w-64 outline-2" value={location.state} />
                    <Input disabled className="my-4 w-64 outline-2" value={location.country} />
                  </label>
                  <label>
                    Record Attachment
                    <div className='my-2 mx-2'>
                      <iframe src={recordAttachment} className='w-full h-full overflow-none'></iframe>
                    </div>
                  </label>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <MdOutlineFileDownload size={25} opacity={0.75} onClick={handleDownload} />
          <Dialog>
            <DialogTrigger><MdDelete size={25} opacity={0.75} /></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete this record?
                </DialogTitle>
              </DialogHeader>
              <Button onClick={() => handleDelete(id)}>Yes, delete</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};


interface PropertyDetails {
  sale_type: string;
  prop_type: string;
  name: string;
  image: File | null;
  price_range: {
    min: string;
    max: string;
  };
  location: {
    name: string;
    state: string;
    country: string;
  };
}

interface Property {
  _id: string;
  sale_type: string;
  prop_type: string;
  name: string;
  image: string;
  price_range: {
    min: string;
    max: string;
  };
  location: {
    name: string;
    state: string;
    country: string;
  };
}

const Properties = () => {
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>({
    sale_type: "",
    prop_type: "",
    name: "",
    image: null,
    price_range: {
      min: "",
      max: ""
    },
    location: {
      name: "",
      state: "",
      country: ""
    }
  });

  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const _id = localStorage.getItem("_id");

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/property/getPropertiesByUserId/${_id}`, {
          headers: {
            'Authorization': localStorage.getItem("token") || '',
          },
          withCredentials: true
        });

        console.log(response.data);
        setProperties(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [mainKey, subKey] = name.split('.');

    if (subKey) {
  
      setPropertyDetails(prevDetails => ({
        ...prevDetails,
        [mainKey]: {
              //@ts-ignore
          ...prevDetails[mainKey],
          [subKey]: value
        }
      }));
    } else {
      setPropertyDetails(prevDetails => ({
        ...prevDetails,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      user_id: localStorage.getItem("_id"),
      sale_type: propertyDetails.sale_type,
      prop_type: propertyDetails.prop_type,
      name: propertyDetails.name,
      image: propertyDetails.image,
      price_range: {
        min: propertyDetails.price_range.min,
        max: propertyDetails.price_range.max
      },
      location: {
        name: propertyDetails.location.name,
        state: propertyDetails.location.state,
        country: propertyDetails.location.country
      }
    };

    console.log(data);
    console.log(token);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/property/createProperty`, data, {
        headers: {
          'Authorization': token || '',
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-4 py-4 " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="flex flex-row justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Your Properties
        </h1>
        <div className="my-2 gap-2 flex flex-row">
          <div>
            <Dialog>
              <DialogTrigger>
                <Button>
                  + Create Record
                </Button>
              </DialogTrigger>
              <DialogContent className="font-semibold">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold">Create Record</DialogTitle>
                </DialogHeader>
                <label>
                  Record Name:
                  <Input name="name" value={propertyDetails.name} onChange={handleChange} />
                </label>
                <label>
                  Sale Type:
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row items-center gap-3 py-2"><FaCaretDown /> <div>{propertyDetails.sale_type || "Select Sale Type"}</div></DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {sales.map((prop, index) => (
                        <DropdownMenuItem key={index} onSelect={() => setPropertyDetails({ ...propertyDetails, sale_type: prop })}>
                          {prop}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </label>
                <label>
                  Property Type:
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row items-center gap-3 py-2"><FaCaretDown /> <div>{propertyDetails.prop_type || "Select Property Type"}</div></DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {property.map((prop, index) => (
                        <DropdownMenuItem key={index} onSelect={() => setPropertyDetails({ ...propertyDetails, prop_type: prop })}>
                          {prop}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </label>
                <label>
                  Price Range Min:
                  <Input name="price_range.min" value={propertyDetails.price_range.min} onChange={handleChange} />
                </label>
                <label>
                  Price Range Max:
                  <Input name="price_range.max" value={propertyDetails.price_range.max} onChange={handleChange} />
                </label>
                <label>
                  Location Name:
                  <Input name="location.name" value={propertyDetails.location.name} onChange={handleChange} />
                </label>
                <label>
                  Location State:
                  <Input name="location.state" value={propertyDetails.location.state} onChange={handleChange} />
                </label>
                <label>
                  Location Country:
                  <Input name="location.country" value={propertyDetails.location.country} onChange={handleChange} />
                </label>
                <label>
                  Attachments:
                  <Input type="file" className='w-full my-2' onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    if (file) {
                      setPropertyDetails({ ...propertyDetails, image: file });
                    }
                  }}
                  />
                </label>
                <Button onClick={handleSubmit}>
                  Submit
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      {properties.map((property) => (
        <RecordCard
          key={property._id}
          name={property.name}
          sale_type={property.sale_type}
          prop_type={property.prop_type}
          recordAttachment={property.image}
          price_range={property.price_range}
          location={property.location}
          //@ts-ignore
          id={property._id}
        />
      ))}
    </div>
  );
};

export default Properties;