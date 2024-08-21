import React from "react";

function NicknameForm({ nickname, setNickname, onSubmit }) {
  console.log(nickname);

  return (
    <form className="flex justify-center items-center space-x-2">
      <span>Nickname: </span>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Nickname"
        className="p-2 border"
      />
      <button
        onClick={onSubmit}
        className="bg-sky-700 px-4 py-1 text-center text-white font-bold rounded-md"
      >
        Submit
      </button>
    </form>
  );
}

export default NicknameForm;
