"use client";
import { FaImage } from "react-icons/fa6";
import Image from "next/image";
import {
  FaTwitter,
  FaSearch,
  FaBell,
  FaBookmark,
  FaUserAlt,
} from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import FeedCard from "@/app/Components/feedCard/feedCard";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "../../client/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";

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

  const { user } = useCurrentUser();
  const [text, setText] = useState("");

  const handleGoogleLogin = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Google token not found");

      try {
        const { verifyGoogleToken } = await graphqlClient.request<{
          verifyGoogleToken: string;
        }>(verifyUserGoogleTokenQuery, { token: googleToken });

        toast.success("Verification success");
        console.log("verification success", verifyGoogleToken);

        if (verifyGoogleToken) {
          window.localStorage.setItem("whisper2", verifyGoogleToken);
        }
      } catch (err: any) {
        toast.error("Google verification failed");
        console.error(err.message);
      }
    },
    []
  );

  const handlePost = () => {
    if (!text.trim()) return;
    console.log("New post:", text);
    toast.success("Posted!");
    setText("");
  };

  const handleFile = useCallback(()=>{
    const input = document.createElement("input")
    input.setAttribute("type","file")
    input.setAttribute("accept","image/*")
    input.click()
  })
  return (
    <div className="grid grid-cols-12 h-screen w-screen px-4 md:px-10 text-white">
      {/* Sidebar */}
      <aside className="col-span-2 pt-6 hidden md:block">
        <div className="text-2xl hover:bg-gray-700 h-fit w-fit transition rounded-full p-2 cursor-pointer">
          <FaTwitter className="text-blue-400" />
        </div>
        <div className="mt-6 space-y-2">
          {sidebarButtton.map((button, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 hover:bg-gray-700 transition rounded-full px-5 py-2 cursor-pointer"
            >
              <div className="text-2xl">{button.icon}</div>
              <div className="text-xl font-semibold">{button.title}</div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button className="w-full bg-blue-500 text-white py-2 text-xl rounded-full hover:bg-blue-600 transition">
            Post
          </button>
        </div>

        {user && (
          <div className="mt-6 flex items-center gap-3 bg-gray-800 p-2 rounded-full">
            <Image
              src={user?.profileImageURL || "/default-avatar.png"}
              alt="profile"
              width={32}
              height={32}
              className="rounded-full"
            />
            <h5 className="font-medium">
              {user?.firstName} {user?.lastName}
            </h5>
          </div>
        )}
      </aside>

      {/* Feed */}
      <main className="col-span-12 md:col-span-6 border-x border-slate-700 h-screen overflow-y-scroll scrollbar-hide">
        <div className="border-b border-slate-700 p-4 flex gap-3">
          <Image
            src={user?.profileImageURL || "/default-avatar.png"}
            alt="User Avatar"
            width={28}
            height={28}
            className="rounded-full"
          />
          <div className="flex-1 border-b m-1" >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What’s happening?"
              className="w-full bg-transparent border-none outline-none resize-none text-lg text-white"
            />
            
            <div className="flex justify-between">
              <div className="m-2">
                <button>
                <FaImage onClick={handleFile} />
                </button>
              </div>
              <button
                onClick={handlePost}
                className="bg-blue-500 text-white px-5 py-1 rounded-full hover:bg-blue-600 transition m-2"
              >
                Post
              </button>
            </div>
          </div>
        </div>

        {Array.from({ length: 5 }).map((_, i) => (
          <FeedCard key={i} />
        ))}
      </main>

      {/* Right Sidebar */}
      <aside className="hidden md:flex col-span-4 flex-col items-center pt-6">
        {!user && (
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold mb-4">Sign in with Google</h3>
            <GoogleLogin onSuccess={handleGoogleLogin} useOneTap />
          </div>
        )}
      </aside>
    </div>
  );
}
