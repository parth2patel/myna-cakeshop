import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
const Navbar = () => {
  return (
		<nav className={styles.mainnav}>
			<ul>
				<Link href="/">
					<a href="http://localhost:3000/" rel="noopener noreferrer">
						<li>
							<Image
								src="/cake_shop_logo.jpg"
								alt="Cake Shop Logo"
								width={125}
								height={125}
							/>
						</li>
					</a>
				</Link>
			</ul>
		</nav>
	);
}

export default Navbar