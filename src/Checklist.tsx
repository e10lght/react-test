import React from "react";
import { useDebounce } from "./hooks/useDebounce";

export const Checklist = () => {
  const { item, errortext, id, onChangeText } = useDebounce();

  return (
    <div>
      <input type="text" onChange={onChangeText} />
      {item && errortext === "" ? (
        <>
          <p>ID:{item.id}</p>
          <p>POSTID:{item.postId}</p>
          <p>NAME:{item.name}</p>
          <p>EMAIL:{item.email}</p>
          <p>MESSAGE:{item.body}</p>
          <hr />
        </>
      ) : (
        errortext
      )}
    </div>
  );
};
