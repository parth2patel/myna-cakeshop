import Image  from "next/image"
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
		<footer className={styles.footer}>
			<Link href="/">
				<div className="flex items-center">
					<div>Powered by </div>
					<div>
						<span className={styles.logo}>
							<Image
								src="/cake_shop_logo.jpg"
								alt="Cake Shop Logo"
								className="cursor-pointer"
								width={40}
								height={40}
							/>
						</span>
					</div>
				</div>
			</Link>
		</footer>
	);
}