import { ImagePreview, InputCheckbox } from "@/components";
import { useState } from "react";
import { tv } from "tailwind-variants";

export const photoSelectableVariants = tv({
  base: "cursor-pointer relative rounded-lg",
  variants: {
    select: {
      true: "outline-2 outline-accent-brand",
    },
  },
});

interface PhotoSelectableProps
  extends React.ComponentProps<typeof ImagePreview> {
  selected?: boolean;
  onSelectimage?: (selected: boolean) => void;
}

export function PhotoSelectable({
  className,
  selected,
  onSelectimage,
  ...props
}: PhotoSelectableProps) {
  const [isSelected, setIsSelected] = useState(selected);

  function handleSelect() {
    const newValue = !isSelected;

    setIsSelected(newValue);
    onSelectimage?.(newValue);
  }

  return (
    <label className={photoSelectableVariants({ className, select: isSelected })}>
      <InputCheckbox
        size="sm"
        defaultChecked={isSelected}
        onChange={handleSelect}
        className="absolute top-1 left-1"
      />
      <ImagePreview {...props} />
    </label>
  );
}
