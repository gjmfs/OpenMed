import axios from "axios";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

export const OpenMed = (api: OpenMedProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData") || "");
    if (!userData) {
      navigate("/login");
    }
  }, []);

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

  // const msg = chat.map((chat, index) => (
  //   <div key={index} className={chat.id === 1 ? "ai-chat" : "user-chat"}>
  //     {chat.profile}
  //     {chat.id === 1 ? (
  //       // <Typewriter words={[]} typeSpeed={10} delaySpeed={100} />
  //       <p>
  //         {chat.msg
  //           .replace(/##\s(.*?):/g, "<h3>$1:</h3>")
  //           .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  //           .replace(/\n/g, "<br />")}
  //       </p>
  //     ) : (
  //       <p>{chat.msg}</p>
  //     )}
  //   </div>
  // ));

  const msg = chat.map((chatItem, index) => {
    console.log("ChatItem:", chatItem);

    const formattedMsg =
      chatItem.id === 1
        ? chatItem.msg
            .replace(/##\s(.*?):/g, "<h3>$1:</h3>")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br />")
        : chatItem.msg;

    console.log("Formatted Message:", formattedMsg);

    return (
      <div key={index} className={chatItem.id === 1 ? "ai-chat" : "user-chat"}>
        {chatItem.profile}
        {chatItem.id === 1 ? (
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(formattedMsg),
            }}
          />
        ) : (
          <p>{formattedMsg}</p>
        )}
      </div>
    );
  });

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
          const response = data.data.result;
          setChat((prevChat) => [
            ...prevChat,
            { id: 1, msg: response, profile: <AiOutlineUser /> },
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
