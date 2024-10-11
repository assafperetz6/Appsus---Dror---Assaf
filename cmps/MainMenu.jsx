const { useSearchParams, useLocation } = ReactRouterDOM

import { MailMenu } from '../apps/mail/cmps/MailMenu.jsx'
import { NoteMenu } from '../apps/note/cmps/NoteMenu.jsx'
import { FilterByLabel } from './FilterByLabel.jsx'

export function MainMenu() {
	const [searchPrms, setSearchPrms] = useSearchParams()
	const { pathname } = useLocation()
	
	function setMarkedFolder(folderName) {
		const currFolder = searchPrms.get('status')
		
		if (currFolder === 'labels') {
			const currLabel = searchPrms.get('label')
			if (folderName === currLabel) return 'marked'
		}	

		if (currFolder === folderName) return 'marked'
		return ''
	}

	function onSelectLabel(labelName) {
		setSearchPrms({status: 'labels', label: labelName})
	}

	return (
		<section className="main-menu">
			<DynamicMenu pathname={pathname} setMarkedFolder={setMarkedFolder} searchPrms={searchPrms} setSearchPrms={setSearchPrms} />
			{(pathname.startsWith('/mail') || pathname.startsWith('/note')) 
				? <FilterByLabel setMarkedFolder={setMarkedFolder} onSelectLabel={onSelectLabel}/> 
				: null}
		</section>
	)
}

function DynamicMenu(props) {
	if(props.pathname.startsWith('/mail')) return <MailMenu {...props}/>
	else if(props.pathname.startsWith('/note')) return <NoteMenu {...props}/>
}