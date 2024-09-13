import { useState } from 'react';
import {InputDisabled} from "../components/ui/inputdisabled"
import { Input } from "../components/ui/input";
import { Button } from '../components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {

  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const [name, setName] = useState('');

  

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try{
      event.preventDefault();
      console.log({
        email,
        name
      });
      const data = {
        email,
        name,
      }
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const token = res.data.token;
      const _id = res.data.newUser._id;
      localStorage.setItem("token",token);
      localStorage.setItem("_id",_id); 
      navigate('/records')
    }
    catch(e){
      console.log(e);   
    }
    
  };
  
  return (
    <div className="bg-gray-200 w-screen h-screen">
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center min-h-screen">
          <div className="bg-white w-full h-11/12 rounded-md px-5 my-3 mx-auto">
              <h1 className="scroll-m-20 text-2xl font-bold tracking-tight flex flex-row justify-start my-5 mx-1">
                  Onboarding
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div className="font-semibold">
                  Email
                  <InputDisabled value={email} className="my-2"/>
                </div>
                <div className="font-semibold">
                  Name
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder='John Doe' className="my-2"/>
                </div>
              </div>
              <div className='flex flex-row justify-center my-8'>
                <Button onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding;