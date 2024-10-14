const { useState, useEffect } = React
const { Link, NavLink, useSearchParams, useLocation } = ReactRouterDOM

import { mailService } from '../apps/mail/services/mail.service.js'
import { toggleMenu } from '../services/event-bus.service.js'
import { Input } from './Inputs.jsx'
import { svgs } from './Svgs.jsx'

export function AppHeader() {
	const [searchPrms, setSearchPrms] = useSearchParams()
	const loc = useLocation()

	const [filterBy, setFilterBy] = useState(
		mailService.getFilterFromSearchParams(searchPrms)
	)

	useEffect(() => {
		setFilterBy(prev => ({ ...prev, ...searchPrms }))
	}, [searchPrms])

	return (
		<header className="app-header full">
			<section className="logo-menu-container flex">
				<button className="main-menu-btn" onClick={toggleMenu}></button>
				<Link className="flex align-center logo" to="/">
					{(loc.pathname.startsWith('/mail')) ? svgs.mailLogo : (loc.pathname.startsWith('/note') ? svgs.noteLogo : svgs.appLogo)}
				</Link>
			</section>

			<div className="main-search-container">
				<button className="search"></button>

				<Input
					onChange={(value) =>
						setSearchPrms({ txt: value})
					}
				/>

				{loc.pathname.startsWith('/mail') && <button className="advanced-search"></button>}
			</div>
			<nav className="main-nav flex align-center">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/about">About</NavLink>
				<NavLink to="/mail">Mail</NavLink>
				<NavLink to="/note">Note</NavLink>
			</nav>
		</header>
	)
}
