const { useState, useEffect } = React
const { Link, useParams, useSearchParams, useNavigate, useLocation } = ReactRouterDOM

import { eventBusService } from '../services/event-bus.service.js'
import { onToggle } from '../services/util.service.js'
import { MailMenu } from '../apps/mail/cmps/MailMenu.jsx'
import { NoteMenu } from '../apps/note/cmps/NoteMenu.jsx'
import { FilterByLabel } from './FilterByLabel.jsx'

export function MainMenu() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const [isMenuOpen, setIsMenuOpen] = useState(true)
	const navigate = useNavigate()
	const [searchPrms, setSearchPrms] = useSearchParams()
	const loc = useLocation()
	const { pathname } = loc

	useEffect(() => {
		const unsubscribe = eventBusService.on('toggleMenu', () => setIsMenuOpen(onToggle))
		
		return unsubscribe
	}, [])

	useEffect(() => {
		const handleResize = () => {			
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)
		
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useEffect(() => {
		if (windowWidth < 800) setIsMenuOpen(false)
		else setIsMenuOpen(true)

	}, [windowWidth])

	function toggleMenu(menuState, ev) {
		if (ev.target.closest('.compose-form-container')) return
		if (isMenuOpen === true) return
		
		setIsMenuOpen(menuState)
		
	}

	function setMarkedFolder(folderName) {		
		if (pathname.includes('labels')) {
			const currLabel = searchPrms.get('label')
			if (folderName === currLabel) return 'marked'
		}	

		if (pathname.includes(folderName) || searchPrms.get('status') === folderName || (folderName === 'notes' && !searchPrms.get('status'))) return 'marked'
		return ''
	}

	function onSelectLabel(labelName) {
		if(pathname.startsWith('/mail')) {
			navigate(`/mail/labels?label=${labelName}`)
			return
		}
		setSearchPrms({status: 'labels', label: labelName})
	}
	
	return (
		<section className={`main-menu ${isMenuOpen ? 'menu-open' : 'menu-close'}`} onMouseOver={(ev) => toggleMenu('hover', ev)} onMouseOut={(ev) => toggleMenu(false, ev)}>
			<DynamicMenu pathname={pathname} setMarkedFolder={setMarkedFolder} searchPrms={searchPrms} setSearchPrms={setSearchPrms} />
			{(pathname.startsWith('/note') || pathname.startsWith('/mail')) 
				? <FilterByLabel Link={Link} setMarkedFolder={setMarkedFolder} onSelectLabel={onSelectLabel} openMenu={isMenuOpen}/> 
				: null}
		</section>
	)
}

function DynamicMenu(props) {
	if(props.pathname.startsWith('/mail')) return <MailMenu {...props} />
	else if(props.pathname.startsWith('/note')) return <NoteMenu {...props} />
}