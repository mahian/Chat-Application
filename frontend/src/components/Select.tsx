import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { classNames } from "../utils";

const Select: React.FC<{
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  onChange: (value: { value: string; label: string }) => void;
  placeholder: string;
}> = ({ options, value, placeholder, onChange }) => {
  const [localOptions, setLocalOptions] = useState<typeof options>([]);

  useEffect(() => {
    setLocalOptions(options);
  }, [options]);

  return (
    <Combobox
      className={"w-full"}
      as="div"
      value={options.find((o) => o.value === value)}
      onChange={(val: any) => onChange(val)}
    >
      <div className="relative mt-2">
        <Combobox.Button className="w-full">
          <Combobox.Input
            placeholder={placeholder}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            onChange={(e) => {
              setLocalOptions(
                options.filter((op) => op.label.includes(e.target.value))
              );
            }}
            displayValue={(option: (typeof options)[0]) => option?.label}
          />
        </Combobox.Button>
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-zinc-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {localOptions.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-2 p-2 max-h-60 w-full overflow-auto rounded bg-secondary text-base shadow-lg ring-opacity-5 focus:outline-none sm:text-sm space-y-2">
            {localOptions.map((option) => (
              <Combobox.Option
                key={option.value}
                value={option}
                className={({ active }) =>
                  classNames(
                    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-gray-100 text-dark hover:bg-blue-700 ",
                    active ? "bg-blue-700 text-white" : "text-white"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected ? "font-semibold" : ""
                      )}
                    >
                      {option.label}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default Select;
