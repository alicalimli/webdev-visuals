import React, { useEffect } from "react";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Float } from "@headlessui-float/react";

import { BiChevronDown } from "react-icons/bi";

const people = [
  { name: "All", value: "all" },
  { name: "HTML", value: "html" },
  { name: "CSS", value: "css" },
  { name: "Javascript", value: "javascript" },
  { name: "VS Code", value: "vscode" },
];

interface FilterSelectProps {}

const FilterSelect = ({ changeFilter }: FilterSelectProps) => {
  const [selected, setSelected] = useState(people[0]);

  useEffect(() => {
    changeFilter(selected.value);
  }, [selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Float
        as="div"
        className="relative"
        placement="bottom"
        offset={4}
        floatingAs={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Button className="relative w-full cursor-pointer py-3 xs:py-2 pl-8 pr-10 text-left min-w-[12rem]">
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <BiChevronDown className="text-2xl" />
          </span>
        </Listbox.Button>

        <Listbox.Options className="absolute mt-4 max-h-70 w-full min-w-[10rem] overflow-auto rounded-xl bg-bg-secondary py-1 text-base shadow-lg focus:outline-none fluid-md z-20 ">
          {people.map((person, personIdx) => (
            <Listbox.Option
              key={personIdx}
              className={({ active }) =>
                `relative cursor-pointer select-none  p-3 px-6  ${
                  active ? "bg-accent-primary text-white" : "text-white"
                }`
              }
              value={person}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {person.name}
                  </span>
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Float>
    </Listbox>
  );
};

export default FilterSelect;
