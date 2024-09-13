import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { DialogHeader } from "../components/ui/dialog";
import { Input } from "../components/ui/input";

interface PriceRange {
  min: string;
  max: string;
}

interface Location {
  name: string;
  state: string;
  country: string;
}

interface Property {
  _id: string;
  name: string;
  sale_type: string;
  prop_type: string;
  image: string;
  price_range: PriceRange;
  location: Location;
}

interface RecordCardProps {
  name: string;
  sale_type: string;
  prop_type: string;
  recordAttachment: string;
  price_range: PriceRange;
  location: Location;
}

export const RecordCard = ({ name, sale_type, prop_type, recordAttachment, price_range, location }: RecordCardProps) => {
  return (
    <div className="bg-gray-300 w-72 h-40 rounded-md">
      <div className="bg-gray-100 h-20 rounded-t">
        <img src={recordAttachment} className='w-full h-full overflow-allow' alt="Property" />
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
                      <iframe src={recordAttachment} className='w-full h-full overflow-none' title="Record Attachment"></iframe>
                    </div>
                  </label>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Property[]>(`${import.meta.env.VITE_BACKEND_URL}/api/property/getProperties`, {
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

  return (
    <div className="px-4 py-4 " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="flex flex-row justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Home
        </h1>
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
        />
      ))}
    </div>
  );
}

export default Home;