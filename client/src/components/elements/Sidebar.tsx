import { IoFileTrayFullOutline , IoLinkOutline, IoLogOutOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', icon: IoFileTrayFullOutline, path: '/' },
    { name: 'Properties', icon: IoLinkOutline , path: '/properties' },
    { name:'Logout' , icon : IoLogOutOutline ,path : '/logout'}
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    window.location.reload();
    navigate('/auth')
  }

  return (
    <div className='shadow-lg h-screen bg-white'>
     <div className='flex flex-row justify-center pt-3  font-bold'>
        Xenon
      </div>
      <div className="pt-6 px-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            item.name !== 'Logout' ? (
              <Link key={item.name} to={item.path} className="flex flex-col items-center my-6 text-sm font-semibold text-gray-500 hover:text-gray-700">
                <a><IconComponent className="my-1" size={26}/></a>
                <h2>{item.name}</h2>
              </Link>
            ) : (
              <div key={item.name} className="flex flex-col items-center my-6 text-sm font-semibold text-gray-500 hover:text-gray-700" onClick={handleLogout}>
                <a><IconComponent className="my-1" size={26}/></a>
                <h2>{item.name}</h2>
              </div>
            )
          );
        })}
      </div>
    </div>
  )
}

export default Sidebar;