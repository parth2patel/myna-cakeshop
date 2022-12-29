import React, { useState } from 'react';
import { SelectMenuOption } from '../types/index';
import { CountrySelector } from './selector';
import { COUNTRIES } from '../constants/countries';

export default function CountryUI( props ) {
  const myRef = React.createRef<HTMLDivElement>();
  //console.log(props,"thisisprops");
  const [isOpen, setIsOpen] = useState(() => { return false });
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState(() => { return 'IN' });

  return (
    <div>
      <CountrySelector
        id={'countries'}
        ref={myRef}
        open={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        onChange={val => {
          setCountry(val),
            props.onChange(val)
            //console.log(val);
          }
        }
        selectedValue={COUNTRIES.find(option => option.value === country) as SelectMenuOption}
      />

    </div>
  );
}
