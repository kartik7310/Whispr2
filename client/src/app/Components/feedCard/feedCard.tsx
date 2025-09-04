import React from "react";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";
const feedCard: React.FC = () => {
  return (
    <div className="border-b-1 border-l-1 border-r-1 border-slate-600 p-4 hover:bg-slate-800 transition cursor-pointer">
      <div className="grid grid-cols-12">
        <div className="col-span-1">
          <Image
            src="https://avatars.githubusercontent.com/u/188732151?v=4"
            alt="User Avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className="col-span-11 m-1">
          <h4>kartik lathiyan</h4>
          <p>
            ChatGPT + laptop + internet connection + 60 minutes per day = $9500
            every month. I normally sell this guide for $81, but for the next 24
            hours, it’s yours 100% FREE. Like + comment 'AI' and I'll send you
            my ultimate guide for FREE. Must follow me to get DM. Free for 24
            hours.
          </p>
          <div className="flex justify-between mt-4 text-gray-500 w-[80%]">
            <div>
              <FaRegComment className="inline-block mr-2" />
              <span>123</span>
            </div>
            <div>
              <BiRepost  className="inline-block mr-2" />
              <span>123</span>
            </div>
            <div>
              <CiHeart  className="inline-block mr-2" />
              <span>123</span>
            </div>
            <div>
              <MdOutlineFileUpload className="inline-block mr-2" />
              <span>123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default feedCard;
