import { LANGUAGES} from '../constants/Languages';
import { SelectMenuOption } from '../types/index';
import { AnimatePresence, motion } from 'framer-motion';
import React, { MutableRefObject, useEffect, useState } from 'react';

export const LanguageSelector = React.forwardRef<
  HTMLDivElement,
  {
    id: string;
    open: boolean;
    onToggle: () => void;
    onChange: (value: any) => void;
    selectedValue: SelectMenuOption;
  }
>((props, ref) => {
  useEffect(() => {
    const mutableRef = ref as MutableRefObject<HTMLDivElement | null>;

    const handleClickOutside = (event: any) => {
      if (mutableRef.current && !mutableRef.current.contains(event.target) && props.open) {
        props.onToggle();
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const [query, setQuery] = useState('');

  return (
    <div ref={ref}>
      <div className="relative w-32 border-gray-200">
        <button
          type="button"
          className=""
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={props.onToggle}
        >
          <span className="truncate flex items-center">
            {props.selectedValue.title}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">

          </span>
        </button>

        <AnimatePresence>
          {props.open && (
            <motion.ul
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.1}}
              className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-80 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >

              <div
                className={
                  'max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll'
                }
              >
                {LANGUAGES.filter(language => language.title.toLowerCase().startsWith(query.toLowerCase())).length ===
                0 ? (
                  <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                    No LANGUAGES found
                  </li>
                ) : (
                  LANGUAGES.filter(language => language.title.toLowerCase().startsWith(query.toLowerCase())).map(
                    (value, index) => {
                      return (
                        <li
                          key={`${props.id}-${index}`}
                          className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                          id="listbox-option-0"
                          role="option"
                          onClick={() => {
                            props.onChange(value.value);
                            setQuery('');
                            props.onToggle();
                          }}
                        >

                          <span className="font-normal truncate">{value.title}</span>
                          {value.value === props.selectedValue.value ? (
                            <span className="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-8">
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                              </svg>
                            </span>
                          ) : null}
                        </li>
                      );
                    }
                  )
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});