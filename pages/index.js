import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Country from '../components/Country'
import Language from '../components/Language'
import { COUNTRIES } from '../constants/countries';
import {LANGUAGES} from '../constants/Languages';
import React, {useState} from 'react';
import { INSPECT_MAX_BYTES } from "buffer";

export async function getServerSideProps() {
	return {
		props: {
			opportunity: {
				items: [
					{
						id: 1,
						countries: "India",
						name: "Swiss Cake",
						description:
							"Swiss Cake is a delicious and indulgent dessert made from rich Swiss chocolate. It is often made with layers of chocolate cake, chocolate mousse, and chocolate ganache, creating a creamy and heavenly treat. Whether served as a special occasion dessert or enjoyed as an everyday indulgence, Swiss Cake is sure to satisfy any chocolate lover's cravings.",
						lang: "en",
						bannerUrl: "/swiss-cake.jpg",
						minQuantity: 7,
						price: "19.99",
					},
					{
						id: 2,
						countries: "India",
						name: "Red Velvet Muffins",
						description:
							"Red velvet muffins are a delicious and moist baked good made with red velvet chocolate. They have a soft and tender crumb, and are often topped with a cream cheese frosting. These muffins are perfect for any occasion, and are sure to be a hit with both children and adults alike.",
						lang: "en",
						bannerUrl: "/red-velvet.jpg",
						minQuantity: 7,
						price: "9.99",
					},
					{
						id: 3,
						countries: "India",
						name: "New York Cheese Cake",
						description:
							"New York cheesecake is a rich and creamy dessert made with cream cheese, eggs, and a graham cracker crust. It is often topped with fruit or a fruit sauce and is known for its dense, smooth texture and tangy flavor. It is a popular choice for special occasions and is a classic dessert in American cuisine.",
						lang: "en",
						bannerUrl: "/ny-cheesecake.jpg",
						minQuantity: 7,
						price: "29.99",
					},
					{
						id: 4,
						countries: "India",
						name: "Blueberry Cake",
						description:
							"A blueberry cake is a type of cake that is made with blueberries as a main ingredient. The blueberries can be fresh or frozen, and are often baked into the cake batter or used as a topping. They can be served at parties, gatherings, or as a special treat for any occasion.",
						lang: "en",
						bannerUrl: "/blueberry-cake.jpg",
						minQuantity: 7,
						price: "19.99",
					},
					{
						id: 5,
						countries: "India",
						name: "Blackforest Cake",
						description:
							"Blackforest cake, also known as Schwarzwälder Kirschtorte, is a classic German chocolate cake made with layers of chocolate sponge cake, whipped cream, and cherries. It is typically topped with chocolate shavings and maraschino cherries. Blackforest cake is a rich and indulgent dessert that is perfect for any special occasion.",
						lang: "en",
						bannerUrl: "/blackforest-cake.jpg",
						minQuantity: 7,
						price: "39.99",
					},
					{
						id: 6,
						countries: "United States",
						name: "Chocolate Fondant",
						description:
							"A chocolate fondant is a rich and indulgent chocolate cake with a soft and gooey center. It is made with high-quality chocolate and has a smooth and velvety texture. The cake is usually served warm, with a melting center that oozes out as you cut into it. The chocolate fondant is a perfect dessert for chocolate lovers and is sure to satisfy your sweet cravings.",
						lang: "en",
						bannerUrl: "/chocolate-fondant.jpg",
						minQuantity: 5,
						price: "29.99",
					},
					{
						id: 7,
						countries: "France",
						name: "Crème Brûlée",
						description:
							"Creme brulee is a classic French dessert that features a creamy custard base and a caramelized sugar topping. The custard is usually made with heavy cream, egg yolks, and sugar, and is flavored with vanilla or other aromatic ingredients. It is a rich and indulgent dessert that is perfect for special occasions or for satisfying a sweet tooth.",
						lang: "en",
						bannerUrl: "/creme-brulee.jpg",
						minQuantity: 3,
						price: "19.99",
					},
					{
						id: 8,
						countries: "Japan",
						name: "Matcha Cake",
						description:
							"Matcha cake is a type of Japanese dessert that is made with matcha green tea powder. It is often moist and fluffy, with a subtle but distinct matcha flavor. Matcha cake is a popular choice for celebrations and special occasions in Japan, and it has gained popularity in other parts of the world as well. It is often served as a layer cake, with the matcha flavor coming through in both the cake layers and the frosting.",
						lang: "en",
						bannerUrl: "/matcha-cake.jpg",
						minQuantity: 8,
						price: "19.99",
					},
				],
			},
		},
	};
}
const inCart = [];

export default function Home({ opportunity }) {
	let map = new Map();

	//English Language:
	map.set("find.vol.en", "Find delicious desserts in");
	map.set(
		"pos.impact.en",
		"Satisfy your sweet cravings with our delicious cakes, delivered straight to your door!"
	);
	map.set("no.eve.found.en", "No Desserts Found!");
	map.set("min.quant.en", "Min. Quantity");
	map.set("price.en", "Price");
	map.set("book.en", "Order Now");
	map.set("view.deets.en", "Add to Cart");
	map.set("no.eve.incount.en", "No Desserts Found in the selected Country!");

	//Spanish Language:
	map.set("find.vol.es", "Encuentra deliciosos postres en");
	map.set(
		"pos.impact.es",
		"Satisfaga sus antojos dulces con nuestros deliciosos pasteles, ¡entregados directamente a su puerta!"
	);
	map.set("no.eve.found.es", "¡No se encontraron postres!");
	map.set("min.quant.es", "Cantidad mínima");
	map.set("price.es", "Precio");
	map.set("book.es", "Ordena ahora");
	map.set("view.deets.es", "Añadir al carrito");
	map.set(
		"no.eve.incount.es",
		"¡No se encontraron postres en el país seleccionado!"
	);

	//French Language
	map.set("find.vol.fr", "Trouvez de délicieux desserts dans");
	map.set(
		"pos.impact.fr",
		"Satisfaire vos envies de sucreries avec nos délicieux gâteaux, livrés directement à votre porte !"
	);
	map.set("no.eve.found.fr", "Aucun Dessert Trouvé !");
	map.set("min.quant.fr", "Quantité Min.");
	map.set("price.fr", "Prix");
	map.set("book.fr", "Commander maintenant");
	map.set("view.deets.fr", "Ajouter au panier");
	map.set(
		"no.eve.incount.fr",
		"Aucun Dessert Trouvé dans le pays sélectionné !"
	);

	const [language, setLanguage] = useState(() => {
		return "en";
	});
	const [languageTitle, setlanguageTitle] = useState(() => {
		return "ENGILISH";
	});
	const [country, setCountry] = useState(() => {
		return "IN";
	});
	const [countryTitle, setCountryTitle] = useState(() => {
		return "India";
	});
	let cnt = 0;

	const [cartItems, setCartItems] = useState(0);
	const setActive = async (id) => {
		toast.success("Cake Ordered Successfully!", {
			position: "top-right",
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
		});
	};
	const addToCart = async (id) => {
		toast.success("Cake Added to Cart!", {
			position: "top-right",
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
		});
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Cake Shop</title>
				<meta name="description" content="Cake Shop" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header
				onChange={(val) => {
					setLanguage(() => {
						return val;
					});
					let lang = LANGUAGES.find((option) => option.value === val);
					setlanguageTitle(() => {
						return lang.title;
					});
				}}
			/>

			<div>
				<div className="text-3xl font bold flex gap-2 m-5 ">
					<h1>{map.get("find.vol." + language)}</h1>
					<div className="flex-1">
						<Country
							onChange={(val) => {
								setCountry(() => {
									return val;
								});
								let cont = COUNTRIES.find((option) => option.value === val);
								setCountryTitle(() => {
									return cont.title;
								});
							}}
						/>
					</div>
					<div className="text-2xl front-semibold">
						<span>Items in Cart: {cartItems}</span>
					</div>
				</div>
				<div className="text-xl font bold m-5">
					{map.get("pos.impact." + language)}
				</div>
			</div>
			<main className={styles.main}>
				<div className={"styles.grid"}>
					{opportunity?.items?.length === 0 ? (
						<div>
							<h1>{map.get("no.eve.found." + language)}</h1>
						</div>
					) : (
						opportunity?.items?.map((opp) => {
							if (opp.countries != countryTitle) {
								cnt++;
							} else if (opp.lang == language)
								return (
									<div className="m-10 flex max-w-screen-lg gap justify-evenly gap-5">
										<Image
											src={opp.bannerUrl}
											className="styles.clickpt style.img justify-evenly flex-1 rounded-xl cursor-pointer border-2 border-orange-600 outline outline-offset-[20px]"
											alt="Event Banner"
											width={535}
											height={326}
										/>

										<div className="flex-1">
											<h2 className="font-bold text-2xl cursor-pointer">
												{opp.name} &rarr;
											</h2>

											<div className="text-ellipsis cursor-pointer mb-3">
												{opp.description}
											</div>

											<div>
												<h4 className="cursor-pointer">
													{map.get("min.quant." + language)}: {opp.minQuantity}
												</h4>
											</div>

											<div>
												<h4 className="cursor-pointer mb-2">
													{map.get("price." + language)}: ${opp.price}
												</h4>
											</div>

											<div className="styles.btn flex col gap-2">
												<>
													<ToastContainer />
													<button
														className={styles.buttonbooknow}
														onClick={() => {
															setActive(opp.id);
															console.log("Order Details:", opp);
														}}
													>
														{map.get("book." + language)}
													</button>
												</>

												<button
													className={styles.buttondeets}
													onClick={() => {
														addToCart(opp.id);
														inCart.push(opp.id);
														setCartItems(inCart.length);
														console.log("Order Details:", opp);
													}}
													type="submit"
												>
													{map.get("view.deets." + language)}
												</button>
												{inCart.includes(opp.id) ? (
													<button
														className={styles.buttonremove}
														onClick={() => {
															const index = inCart.indexOf(opp.id);
															if (index > -1) {
																inCart.splice(index, 1);
															}
															setCartItems(inCart.length);
														}}
													>
														Remove from cart
													</button>
												) : null}
											</div>
										</div>
									</div>
								);
							if (cnt == opportunity.items.length)
								return (
									<div className="text-3xl font bold m-20">
										{map.get("no.eve.incount." + language)}
									</div>
								);
						})
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}