import { useState } from "react";

import { verbOptions } from "../../constants";
import Tooltip from "../Tooltip";

const VerbFilter: React.FC<{ onChange: (values: string[]) => void }> = ({
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleCheckboxChange = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setSelectedValues(newValues);
    onChange(newValues);
  };

  const toggleFilter = () => setShowFilter(!showFilter);

  return (
    <div>
      <div>
        <label className="mr-2" onClick={toggleFilter}>
          Learning Record Verb:
        </label>
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none p-1"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="text-sm font-medium">Options</span>
              <svg
                className="w-4 h-4 ml-2 -mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="p-4" role="none">
                {verbOptions.map((option) => (
                  <div key={option.value} className="flex items-center py-2">
                    <input
                      type="checkbox"
                      id={option.value}
                      name={option.value}
                      value={option.value}
                      checked={selectedValues.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value)}
                      className={`appearance-none rounded p-2 ${
                        selectedValues.includes(option.value)
                          ? `bg-${option.value.toLowerCase()}`
                          : "bg-gray-200 text-black"
                      } focus:outline-none focus:ring-2 focus:ring-${option.value.toLowerCase()} focus:ring-opacity-50 mr-2`}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* selected verbs */}
      <span>
        <div className="flex">
          {verbOptions.map((option) => {
            if (selectedValues.includes(option.value)) {
              return (
                <Tooltip content={option.value} key={option.value}>
                  <div
                    className={`w-4 h-4 rounded-full mx-1 bg-${option.value.toLowerCase()} shadow flex items-center justify-center`}
                  >
                    {option.label.charAt(0)}
                  </div>
                </Tooltip>
              );
            } else {
              return null;
            }
          })}
        </div>
      </span>
    </div>
  );
};

export default VerbFilter;
