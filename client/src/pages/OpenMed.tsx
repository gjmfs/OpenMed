import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { Typewriter } from "react-simple-typewriter";

export const OpenMed = (api: OpenMedProps) => {
  const userData = JSON.parse(sessionStorage.getItem("userData") || "");
  const userProfile = (
    <img className="user-profile" src={userData.profile} alt="user-profile" />
  );
  const [userMsg, setUserMsg] = useState("");

  const [chat, setChat] = useState([
    {
      id: 1,
      profile: <AiOutlineUser />,
      msg: "Hi there how can i help you",
    },
  ]);

  const msg = chat.map((chat, index) => (
    <div key={index} className={chat.id === 1 ? "ai-chat" : "user-chat"}>
      {chat.profile}
      {chat.id === 1 ? (
        <Typewriter words={[chat.msg]} typeSpeed={10} delaySpeed={100} />
      ) : (
        <p>{chat.msg}</p>
      )}
    </div>
  ));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Corrected type
    setUserMsg(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Corrected type
    const userReq = userMsg;
    setUserMsg("");
    event.preventDefault();
    chat.push({ id: 2, msg: userMsg, profile: userProfile });
    console.log(chat);

    try {
      console.log(api.api);
      console.log(userMsg);
      await axios
        .post(`${api.api}openmed/chat`, { req: userReq })
        .then((data) => {
          console.log(data);

          setChat((prevChat) => [
            ...prevChat,
            { id: 1, msg: data.data, profile: <AiOutlineUser /> },
          ]);
        });
    } catch (err) {
      console.error("Error generating text:", err);
    }
  };

  return (
    <div className="OpenMed">
      <h1>Chat with OpenMed</h1>
      <div className="msg">{msg}</div>
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Removed action and method */}
        <input type="text" value={userMsg} onChange={handleChange} />
        <button type="submit" className="send">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

interface OpenMedProps {
  children?: React.ReactNode;
  api?: string;
}
