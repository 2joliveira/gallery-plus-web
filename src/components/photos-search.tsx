/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { InputText } from "./input-text";
import { debounce } from "../utils";
import SearchIcon from "../assets/icons/search.svg?react";

export function PhotosSearch() {
  const [inputValue, setInputValue] = useState("");

  const debouncedSetValue = useCallback(
    debounce((value: string) => {
      console.log({ value });
    }, 200),
    []
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setInputValue(value);
    debouncedSetValue(value);
  }

  return (
    <InputText
      icon={SearchIcon}
      placeholder="Buscar imagens"
      className="flex-1"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
}
