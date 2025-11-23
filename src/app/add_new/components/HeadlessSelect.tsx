import { Listbox } from "@headlessui/react";
import React from "react";

export interface Option {
  value: string;
  label: string;
}

import { ReactNode } from "react";

interface HeadlessSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  name: string;
  error?: ReactNode;
}

export const HeadlessSelect: React.FC<HeadlessSelectProps> = ({
  options,
  value,
  onChange,
  label,
  name,
  error,
}) => {
  return (
    <div className="mb-4 flex flex-col justify-start items-start w-full">
      <label
        htmlFor={name}
        className="block text-h4 font-heading mb-2 text-secondary"
      >
        {label}
      </label>
      <Listbox value={value} onChange={onChange} name={name}>
        <div className="relative w-full">
          <Listbox.Button className="border border-outline rounded-lg p-3 w-full bg-background text-text shadow-sm focus:border-primary focus:ring-2 focus:ring-primary transition-all duration-150 flex justify-between items-center">
            <span className="text-text">
              {options.find((opt) => opt.value === value)?.label}
            </span>
            <span className="ml-2 text-text">▼</span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 w-full bg-background text-text border border-outline rounded-lg shadow-lg">
            {options.map((opt) => (
              <Listbox.Option
                key={opt.value}
                value={opt.value}
                className={({ active, selected }) =>
                  `cursor-pointer select-none p-3 bg-background text-text ${
                    active ? "bg-primary text-white" : ""
                  } ${selected ? "font-bold" : "font-normal"}`
                }
              >
                {opt.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      {error}
    </div>
  );
};
