import React, { useState } from "react";
import RoundedBtn from "../../components/Common/RoundedBtn";
import { MdPeopleAlt } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { BiFilter } from "react-icons/bi";
import { pp } from "../../assets/whatsapp";
import ChatsCustom from "./ChatsCustom";

function LeftMenuCustom() {
  const [filter, setFilter] = useState(false);

  return (
    // LeftMenu container
    <div className="flex flex-col border-r border-neutral-700 w-100 h-screen">
      {/* Profile nav */}
      <div className="flex justify-between items-center bg-[#202d33] h-[60px] p-3">
        <h3 style={{color:"white"}}>Manifest management</h3>
        {/* Profile picture */}
        {/* <img src={pp} alt="profile_picture" className="rounded-full w-[40px]" /> */}

        {/* Profile nav buttons */}
        {/* <div className="flex justify-between w-[175px]">
          <RoundedBtn icon={<MdPeopleAlt />} />
          <RoundedBtn icon={<TbCircleDashed />} />
          <RoundedBtn icon={<BsFillChatLeftTextFill />} />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div> */}
      </div>

      {/* Search and filter */}
      <div className="flex justify-between items-center h-[10px] p-2">
        {/* Search input */}
        {/* <input
          type="text"
          placeholder="Search or start a new chat"
          className="rounded-lg bg-[#202d33] text-[#8796a1] text-sm font-light outline-none px-4 py-2 w-[400px] h-[35px] placeholder:text-[#8796a1] placeholder:text-sm placeholder:font-light"
        /> */}

        {/* Filter button */}
        
      </div>

      {/* Chats */}
      <ChatsCustom/> 
    </div>
  );
}

export default LeftMenuCustom;