const { useState, useEffect } = React
const { Link, NavLink, useSearchParams } = ReactRouterDOM

import { mailService } from '../apps/mail/services/mail.service.js'
import { Input } from './Inputs.jsx'

export function AppHeader() {
	const [searchPrms, setSearchPrms] = useSearchParams()
	const [filterBy, setFilterBy] = useState(
		mailService.getFilterFromSearchParams(searchPrms)
	)

	// useEffect(() => {

	// }, [filterBy])

	return (
		<header className="app-header full">
			<section className="logo-menu-container flex">
				<button className="main-menu-btn">
					<svg width="24" height="24" fill="#616367" viewBox="0 0 24 24">
						<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
					</svg>
				</button>
				<Link className="flex align-center" to="/">
					<svg
						width="200"
						height="200"
						viewBox="0 0 200 200"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M40 0 L80 100 L40 200 L0 100 L40 0Z" fill="#4185f4" />
						<text
							x="75"
							y="115"
							stroke="#fbbc04"
							fill="#35aa54"
							fontFamily="Product-sans-bold"
							fontSize="36"
						>
							Mail
						</text>
						<text
							x="25"
							y="115"
							stroke="#fbbc04"
							fill="#c5211e"
							fontFamily="Product-sans-bold"
							fontSize="36"
						>
							Me
						</text>
					</svg>
				</Link>
			</section>

			<div className="main-search-container">
				<button>
					<span className="material-symbols-outlined">search</span>
				</button>

				<Input
					value={filterBy.txt}
					onChange={(value) =>
						setFilterBy((preFilter) => ({ ...preFilter, value }))
					}
				/>

				<button className="advanced-search">
					<span className="material-symbols-outlined">tune</span>
				</button>
			</div>
			<nav className="flex align-center">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/about">About</NavLink>
				<NavLink to="/mail">Mail</NavLink>
				<NavLink to="/note">Note</NavLink>
			</nav>
		</header>
	)
}
