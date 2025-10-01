import * as SelectRadix from "@radix-ui/react-select";
import Icon from "./icon";
import ArrowRightIcon from "@/assets/icons/chevron-right.svg?react";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Text } from "./text";

interface SelectProps {
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange(value: string): void;
}

export function Select({ value, options, onChange }: SelectProps) {
  function handleSelect(value: string) {
    onChange(value);
  }

  return (
    <SelectRadix.Root value={value} onValueChange={handleSelect}>
      <SelectRadix.Trigger className="cursor-pointer flex items-center justify-center p-2">
        <SelectRadix.Value>
          <Text variant="heading-small">{value}</Text>
        </SelectRadix.Value>

        <SelectRadix.Icon>
          <Icon svg={ArrowRightIcon} className="fill-white" />
        </SelectRadix.Icon>
      </SelectRadix.Trigger>

      <SelectRadix.Portal>
        <SelectRadix.Content className="overflow-hidden rounded-2xl border border-gray-100 bg-heading shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
          <SelectRadix.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
            <ChevronUpIcon />
          </SelectRadix.ScrollUpButton>

          <SelectRadix.Viewport className="p-2">
            {options.map(({ value, label }) => (
              <SelectRadix.Item
                key={value}
                value={value}
                className="cursor-pointer rounded-lg p-2 text-sm text-gray-800 transition-colors outline-none data-[highlighted]:bg-gray-100 data-[state=checked]:font-bold hover:bg-placeholder"
              >
                <SelectRadix.ItemText>{label}</SelectRadix.ItemText>
              </SelectRadix.Item>
            ))}
          </SelectRadix.Viewport>

          <SelectRadix.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
            <ChevronDownIcon />
          </SelectRadix.ScrollDownButton>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  );
}
