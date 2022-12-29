import React, { useState } from 'react';
import { SelectMenuOption } from '../types/index';
import { LanguageSelector } from './selector_language';
import { LANGUAGES } from '../constants/Languages';

export default function languageUI( props ) {
  const myRef = React.createRef<HTMLDivElement>();
  //console.log(props,"thisisprops");
  const [isOpen, setIsOpen] = useState(() => { return false });
  // Default this to a country's code to preselect it
  const [language, setLanguage] = useState(() => { return 'en' });

  return (
    <div>
      <LanguageSelector
        id={'countries'}
        ref={myRef}
        open={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        onChange={val => {setLanguage(val),
            props.onChange(val)}}      
        selectedValue={LANGUAGES.find(option => option.value === language) as SelectMenuOption}
      />

    </div>
  );
}
