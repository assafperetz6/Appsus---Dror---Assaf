const { useState, useEffect } = React
const { Link, NavLink, useSearchParams } = ReactRouterDOM

import { mailService } from '../apps/mail/services/mail.service.js'
import { Input } from './Inputs.jsx'

export function AppHeader() {
	const [searchPrms, setSearchPrms] = useSearchParams()
	const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchPrms))

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
					<img
						className="logo"
						src="../assets/img/gmail-logo.png"
						alt="gmail-logo"
					/>
				</Link>
			</section>

			<div className="main-search-container">
				<button>
					<span className="material-symbols-outlined">search</span>
				</button>

				<Input value={filterBy.txt} onChange={value => setFilterBy(preFilter => ({ ...preFilter, value }))} />
                
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
