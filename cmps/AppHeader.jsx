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
						width="109"
						height="48"
						viewBox="0 0 109 48"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect width="109" height="48" fill="#f6f8fb"/>
						<g transform="translate(54.5, 24)">
							<path d="M-54.5,-24 L-54.5,24 L54.5,24 L54.5,-24 Z" fill="none" />
							<path d="M-40,-12 L-40,12 L-20,0 Z" fill="#EA4335" />
							<path d="M-20,0 L0,12 L20,0 Z" fill="#FBBC05" />
							<path d="M20,0 L40,12 L40,-12 Z" fill="#34A853" />
							<path d="M-40,-12 L0,12 L40,-12 Z" fill="#4285F4" />
							<text
								x="0"
								y="20"
								fontFamily="Lato"
								fontSize="20"
								fill="#000000"
								textAnchor="middle"
							>
								MeMail
							</text>
						</g>
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
