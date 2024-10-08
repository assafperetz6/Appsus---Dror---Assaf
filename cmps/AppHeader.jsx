const { useState, useEffect } = React
const { Link, NavLink, useSearchParams, useLocation } = ReactRouterDOM

import { mailService } from '../apps/mail/services/mail.service.js'
import { Input } from './Inputs.jsx'
import { svgs } from './Svgs.jsx'

export function AppHeader() {
	const [searchPrms, setSearchPrms] = useSearchParams()
	const loc = useLocation()

	const [filterBy, setFilterBy] = useState(
		mailService.getFilterFromSearchParams(searchPrms)
	)

	// useEffect(() => {

	// }, [filterBy])

	return (
		<header className="app-header full">
			<section className="logo-menu-container flex">
				<button className="menu"></button>
				<Link className="flex align-center logo" to="/">
					{(loc.pathname.startsWith('/mail')) ? svgs.mailLogo : (loc.pathname.startsWith('/note') ? svgs.noteLogo : svgs.appLogo)}
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
