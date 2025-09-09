"use client";

import Image from "next/image";
import { FaTwitter, FaSearch, FaBell, FaBookmark, FaUserAlt } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import FeedCard from "@/app/Components/feedCard/feedCard";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "../../client/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";

// Backend response type
interface BackendAuthResponse {
  token: string;
  name: string;
  email: string;
  profile: string;
  createdAt: string;
  updatedAt: string;
}

interface SidebarButton {
  title: string;
  icon: React.ReactNode;
}

export default function Home() {
  const sidebarButtton: SidebarButton[] = [
    { title: "Home", icon: <IoIosHome /> },
    { title: "Explore", icon: <FaSearch /> },
    { title: "Notifications", icon: <FaBell /> },
    { title: "Messages", icon: <MdEmail /> },
    { title: "Bookmarks", icon: <FaBookmark /> },
    { title: "Profile", icon: <FaUserAlt /> },
  ];

  const handleGoogleLogin = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Google token not found");

      try {
        const { verifyGoogleToken } = await graphqlClient.request<{
          verifyGoogleToken: BackendAuthResponse;
        }>(verifyUserGoogleTokenQuery, { token: googleToken });
        
        toast.success("Verification success");
        console.log("verification success", verifyGoogleToken);

      if(verifyGoogleToken){
        window.localStorage.setItem("whisper2",verifyGoogleToken)
      }
      } catch (err:any) {
        toast.error("Google verification failed");
        console.error(err.message);
      }
    },
    []
  );

  return (
    <div className="grid grid-cols-12 h-screen w-screen px-10">
      {/* Sidebar */}
      <div className="col-span-2 pt-8">
        <div className="text-2xl hover:bg-gray-500 h-fit w-fit transition rounded-full p-1 cursor-pointer">
          <FaTwitter />
        </div>
        <div>
          {sidebarButtton.map((button, index) => (
            <div
              key={index}
              className="flex font-bold items-center mr-2 space-x-2 hover:bg-gray-500 transition rounded-2xl px-5 py-2 w-fit cursor-pointer mt-4"
            >
              <div className="text-2xl">{button.icon}</div>
              <div className="text-xl font-bold">{button.title}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 mr-2">
          <button className="font-bold text-2xl py-2 px-4 w-full bg-blue-500 text-white rounded-2xl">
            Tweet
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="col-span-6 border-r-2 border-l-2 border-slate-600 h-screen overflow-y-scroll scrollbar-hide">
        {Array.from({ length: 9 }).map((_, i) => (
          <FeedCard key={i} />
        ))}
      </div>

      {/* Right Sidebar */}
      <div className="col-span-3 flex flex-col items-center justify-start pt-8">
        <GoogleLogin onSuccess={handleGoogleLogin} useOneTap />
      </div>
    </div>
  );
}
