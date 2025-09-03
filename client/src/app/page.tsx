import Image from "next/image";

export default function Home() {
  return (
  <div>
    <div className="grid grid-cols-12 h-screen w-screen">
      <div className="col-span-3 "></div>
      <div className="col-span-6 border-r-2 border-l-2 border-gray-200"></div>
      <div className="col-span-3 "></div>
    </div>
  </div>
  );
}
