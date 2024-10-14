const { useState, useEffect } = React
const { Link, NavLink, useParams, useSearchParams, useLocation } = ReactRouterDOM



import { onToggle } from '../services/util.service.js'
import { mailService } from '../apps/mail/services/mail.service.js'
import { toggleMenu } from '../services/event-bus.service.js'
import { AdvancedFilter } from './AdvancedFilter.jsx'
import { Input } from './Inputs.jsx'
import { svgs } from './Svgs.jsx'

export function AppHeader() {
	const [searchPrms, setSearchPrms] = useSearchParams()
	const loc = useLocation()
	const params = useParams()
	const [isAppMenuOpen, setIsAppMenuOpen] = useState(false)
	const [isAdvancedFilter, setIsAdvancedFilter] = useState(false)
	const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchPrms))

	useEffect(() => {
		setFilterBy(prev => ({ ...prev, ...searchPrms }))
	}, [searchPrms])

	useEffect(() => {
		setIsAppMenuOpen(false)
	}, [loc.pathname])

	function closeWindows() {
		if (isAppMenuOpen) setIsAppMenuOpen(false)
		if (isAdvancedFilter) setIsAdvancedFilter(false)
	}

	function submitAdvancedFilter(params) {
		setSearchPrms(params)
		setIsAdvancedFilter(false)
	}
	
	return (
		<header className="app-header full">
			<div className={`close-menu ${isAppMenuOpen || isAdvancedFilter ? 'visible' : 'hidden'}`} onClick={() => closeWindows()}></div>
			<section className="logo-menu-container flex">
				<button className="main-menu-btn" onClick={toggleMenu}></button>
				<Link className="flex align-center logo" to="/">
					{(loc.pathname.startsWith('/mail')) ? svgs.mailLogo : (loc.pathname.startsWith('/note') ? svgs.noteLogo : svgs.appLogoNoText)}
				</Link>
			</section>

			<div className="main-search-container">
				<button className="search"></button>

				<Input
					onChange={(value) =>
						setSearchPrms({ txt: value})
					}
				/>

				{loc.pathname.startsWith('/mail') && <button className="advanced-search" onClick={() => setIsAdvancedFilter(onToggle)}></button>}
				{isAdvancedFilter && <AdvancedFilter submitAdvancedFilter={submitAdvancedFilter}/>}
			</div>
			<button className="main-nav-btn" onClick={() => setIsAppMenuOpen(onToggle)}></button>
			<nav className={`main-nav flex align-center ${isAppMenuOpen ? 'menu-open' : 'hidden'}`}>
				<NavLink to="/">{svgs.appLogo}</NavLink>
				<NavLink to="/about">{svgs.aboutUs}</NavLink>
				<NavLink to="/mail">{svgs.mailLogoNoTxt}</NavLink>
				<NavLink to="/note">{svgs.noteLogoNoText}</NavLink>
			</nav>
		</header>
	)
}
