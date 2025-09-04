import Image from "next/image";
import { FaTwitter } from "react-icons/fa6";
import { IoIosHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import FeedCard from "@/app/Components/feedCard/feedCard";
export default function Home() {
  interface SidebarButton{
    title:string,
    icon:React.ReactNode;
  }
  const sidebarButtton:SidebarButton[]=[
    {
      title:"Home",
      icon:<IoIosHome />
    },{
      title:"Explore",
      icon:<FaSearch />
    },{
      title:"Notifications",
      icon:<FaBell />
    },{
      title:"Messages",
      icon:<MdEmail />
    },{
      title:"Bookmarks",
      icon:<FaBookmark />
    },{
      title:"Profile",
      icon:<FaUserAlt />
    }
  ]
  return (
  <div>
    <div className="grid grid-cols-12 h-screen w-screen px-10">
      <div className="col-span-2  pt-8">
        <div className="text-2xl hover:bg-gray-500 h-fit w-fit transition rounded-full p-1 object-fit cursor-pointer">
           <FaTwitter />
        </div>
        <div>
          {sidebarButtton.map((button,index)=>(
            <div key={index} className="flex font-bold items-center mr-2 space-x-2 hover:bg-gray-500 transition rounded-2xl px-5 py-2 w-fit cursor-pointer mt-4">
              <div className="text-2xl">
                {button.icon}
              </div>
              <div className="text-xl font-bold">
                {button.title}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 mr-2">
          <button className=" font-bold text-2xl py-2 px-4 w-full  bg-blue-500 text-white rounded-2xl ">Tweet</button>
        </div>
      </div>
      <div className="col-span-6 border-r-2 border-l-2 border-slate-600">
        <FeedCard/>
      </div>
      <div className="col-span-3 "></div>
    </div>
  </div>
  );
}
