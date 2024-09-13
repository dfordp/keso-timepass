
import profilePic from "../../assets/images.png"

const TopBar = () => {

  return (
    <div className="bg-white w-[1430px] h-[80px] shadow-sm px-4">
     <div className="flex flex-row justify-end my-3 gap-4">
        <div>
          <img src={profilePic} className="w-10 h-10 rounded-full"/>
        </div>
     </div>
    </div>
  )
}

export default TopBar
