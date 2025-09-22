/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { usePhotos } from "@/contexts/photos/hooks/use-photos";
import { InputText } from "./input-text";
import { debounce } from "../utils/debounce";
import SearchIcon from "../assets/icons/search.svg?react";

export function PhotosSearch() {
  const [inputValue, setInputValue] = useState("");
  const { filters } = usePhotos();

  const debouncedSetValue = useCallback(
    debounce((value: string) => {
      filters.setQ(value ? value : null);
    }, 1000),
    [filters.setQ]
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
