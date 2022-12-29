import Image  from "next/image"
import Button from "./Language"
import HeaderItem from "./HeaderItem"
import React, {useState} from 'react'
//import { LANGUAGES } from "../constants/Languages"

function Header(props) {
  const [language, setLanguage] = useState(() => { return 'en' });
  //const [languageTitle, setlanguageTitle] = useState(()=>{return 'ENGILISH'});
  return (
		<header className="flex justify-between content-center m-5">
			<Image
				className="flex"
				src="/cake_shop_logo.jpg"
				width={75}
				height={75}
			/>
			<div className="flex gap-x-3 pr-12 ">
				<HeaderItem title="FAQs" />
				<HeaderItem title="|" />
				<HeaderItem title="Default Font" />
				<Button
					onChange={(val) => {
						setLanguage(() => {
							return val;
						});
						props.onChange(val);
					}}
				/>
			</div>
		</header>
	);
}
export default Header