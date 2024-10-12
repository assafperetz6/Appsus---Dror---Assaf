const { Link, useParams, useSearchParams, useNavigate, useLocation } = ReactRouterDOM

import { MailMenu } from '../apps/mail/cmps/MailMenu.jsx'
import { NoteMenu } from '../apps/note/cmps/NoteMenu.jsx'
import { FilterByLabel } from './FilterByLabel.jsx'

export function MainMenu() {
	const navigate = useNavigate()
	const [searchPrms, setSearchPrms] = useSearchParams()
	const loc = useLocation()
	const { pathname } = loc
	
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
		<section className="main-menu">
			<DynamicMenu pathname={pathname} setMarkedFolder={setMarkedFolder} searchPrms={searchPrms} setSearchPrms={setSearchPrms} />
			{(pathname.startsWith('/note') || pathname.startsWith('/mail')) 
				? <FilterByLabel Link={Link} setMarkedFolder={setMarkedFolder} onSelectLabel={onSelectLabel}/> 
				: null}
		</section>
	)
}

function DynamicMenu(props) {
	if(props.pathname.startsWith('/mail')) return <MailMenu {...props} />
	else if(props.pathname.startsWith('/note')) return <NoteMenu {...props} />
}