import axios from "axios";
import React, { useEffect, useState } from "react";

type ResponseComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export const useDebounce = () => {
  const [value, setValue] = useState<ResponseComment[]>([]);
  const [item, setItem] = useState<ResponseComment>();
  const [errortext, setErrorText] = useState("");
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    setItem(value.find(data => data.id === id));
  }, [value, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = value.find((data) => {
          return data.id === id;
        });
        if (id !== null && id !== 0 && !item) {
          const response = await axios.get<ResponseComment>(
            `https://jsonplaceholder.typicode.com/comments/${id}`
          );
          setValue((prev) => {
            return [...prev, response.data];
          });
        }
      } catch (error) {
        setErrorText("1〜500の数字を入力してください");
      }
    };

    const timer = setTimeout(fetchData, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, value]);

  const onChangeText = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.value === "") {
        setErrorText("");
        return;
      }
      const value = Number(e.target.value);
      if (!isNaN(Number(value))) {
        setErrorText("");
        setId(value);
        return;
      }
      throw new Error("正しい値を入力してください");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorText(error.message);
      }
    }
  };
  return { item, errortext, id, onChangeText };
};
