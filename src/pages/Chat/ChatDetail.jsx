import Message from "../../components/Message";
import RoundedBtn from "../../components/Common/RoundedBtn";
import { messagesData } from "../../data/whatsapp";
import { MdSearch, MdSend } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { BiHappy } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { chat4 } from "../../assets/whatsapp";
import { getTime } from "../../logic/whatsapp";
import React, { useEffect, useRef, useState,useContext } from 'react';
import * as ws from 'ws';
import { PostContext } from '../../context';
import {AuthContext} from '../../AuthContext';
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import ChatProfileData from "./ChatProfileData";

function ChatDetail() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [b,setB]=useState(false)
  const socketRef = useRef(null);
  let{roomId,messageDetail,setMessageDetail}=React.useContext(PostContext)
  const roomName=roomId.id
  
  let{authTokens}=useContext(AuthContext)
  useEffect(()=>{
    setMessages([])
    axios.get(`https://brosapp.xyz/view_all_messages/${roomName}`).then((response) => {
      console.log(response.data)
      setMessages(response.data)
    })
  },[roomName,b])
  useEffect(() => {
    
    const user =jwt_decode(authTokens.access).user_id
    socketRef.current = new WebSocket(`wss://brosapp.xyz/ws/chat/${roomName}/${user}/`);

    socketRef.current.onmessage = (event) => {
      setB(!b)
      // setMessages([...messages, JSON.parse(event.data)]);
    }

    return () => {
      socketRef.current.close();
    }
  }, [messages,roomName]);

  const sendMessage = () => {
    socketRef.current.send(message);
    setMessage('');
  }

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Functions

  // const handleInputChange = () => {
  //   inputRef.current.value.length === 0 ? setTyping(false) : setTyping(true);
  // };

  // const handleInputSubmit = () => {
  //   if (inputRef.current.value.length > 0) {
  //     addMessage({
  //       msg: inputRef.current.value,
  //       time: getTime(),
  //       sent: true,
  //     });
  //     inputRef.current.value = "";
  //     inputRef.current.focus();
  //     setTyping(false);
  //   }
  // };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // useEffect(() => {
  //   const listener = (e) => {
  //     if (e.code === "Enter") handleInputSubmit();
  //   };

  //   document.addEventListener("keydown", listener);
  //   return () => document.removeEventListener("keydown", listener);
  // });

  return (
    // ChatDetail main container
    <div className="flex flex-col h-screen">
      {/* Contact nav */}
      <div className="flex justify-between bg-[#202d33] h-[60px] p-3">
        {/* Contact info */}
        <div className="flex items-center">
          {/* Profile picture */}
          {/* <img
            src={chat4}
            alt="profile_picture"
            className="rounded-full w-[45px] h-[45px] mr-5"
          /> */}

          {/* Info */}
          {/* <div className="flex flex-col"> */}
            {/* Contact */}
            {/* <h1 className="text-white font-medium">{messageDetail.username}</h1> */}

            {/* Status */}
            {/* <p className="text-[#8796a1] text-xs">&nbsp;</p> */}
          {/* </div> */}
          <ChatProfileData/>
          <div className="flex flex-col">
            {/* Contact */}
            <h1 className="text-white font-medium">{messageDetail.username}</h1>

            {/* Status */}
            <p className="text-[#8796a1] text-xs">&nbsp;</p>
          </div>
        </div>

        {/* Buttons */}
        {/* <div className="flex justify-between items-center w-[85px]">
          <RoundedBtn icon={<MdSearch />} />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div> */}
      </div>

      {/* Messages section */}
      <div
        className="bg-[#0a131a] bg-[url('assets/images/bg.webp')] bg-contain overflow-y-scroll h-100"
        style={{ padding: "12px 7%" }}
      >
        {messages.map((msg) => {
          if(msg.sender === jwt_decode(authTokens.access).user_id ){
          return(
          <Message
          
            msg={msg.message}
            time={msg.time}
            isLink={msg.isLink}
            img={msg.img}
            sent={true}
          />
        )}else{
          return(
          <Message
            msg={msg.message}
            time={msg.time}
            isLink={msg.isLink}
            img={msg.img}
            sent={false}
          />
        )}})}
        <div ref={bottomRef} />
      </div>

      {/* Bottom section */}
      <div className="flex items-center bg-[#202d33] w-100 h-[70px] p-2">
        {/* Emoji btn */}
        {/* <RoundedBtn icon={<BiHappy />} onClick={handleEmojiClick} /> */}
        <RoundedBtn icon={<BiHappy />}/>
        {/* Upload btn */}
        <span className="mr-2">
          {/* <RoundedBtn icon={<AiOutlinePaperClip />} onClick={handleImgUpload} /> */}
        </span>

        {/* Input bar */}
        <input
          type="textarea"
          placeholder="Type a message"
          className="bg-[#2c3943] rounded-lg outline-none text-sm text-neutral-200 w-100 h-100 px-3 placeholder:text-sm placeholder:text-[#8796a1]"
          // onChange={handleInputChange}
          value={message} onChange={(event) => setMessage(event.target.value)}
        />

        {/* Mic/Send btn */}
        <span className="ml-2">
            <RoundedBtn icon={<MdSend />} onClick={sendMessage} />
            {/* <RoundedBtn icon={<MdSend />} onClick={handleInputSubmit} /> */}
        </span>
      </div>
    </div>
  );
}

export default ChatDetail;
