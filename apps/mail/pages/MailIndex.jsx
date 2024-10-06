const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { Loader } from '../../../cmps/Loader.jsx'
import { utilService } from '../../../services/util.service.js'

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [searchPrms, setSearchPrms] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchPrms))

    useEffect(() => {
        loadMails(filterBy)
        setSearchPrms(utilService.getTruthyValues(filterBy))
    }, [])
    
    useEffect(() => {
        const newFilter = mailService.getFilterFromSearchParams(searchPrms)
        
        setFilterBy(newFilter)
    }, [searchPrms])

    useEffect(() => {
        loadMails(filterBy)
    }, [filterBy])

    function loadMails() {
        mailService.query()
            .then(setMails)
            .catch(err => console.log('error: ', err))
    }

    
    
    if (!mails) return <Loader />
    return (
        <section className="mail-container">
            <section className="actions-pagination">
                <section className="select-options flex">
                    <button>
                        <span className="material-symbols-outlined">check_box_outline_blank</span>
                    </button>
                    <button>
                        <span className="material-symbols-outlined">keyboard_arrow_down</span>
                    </button>

                    <button>
                        <span className="material-symbols-outlined">refresh</span>
                    </button>

                    <button>
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </section>

                <section className="info-pagination flex">
                    <div className="shown-mails">1-50 of 2,000</div>
                    <button>
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button>
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </section>



            </section>

            <section className="filter-tabs">
                <button>
                    <span className="material-symbols-outlined">inbox</span>
                    Primary</button>
                <button>
                    <span className="material-symbols-outlined">sell</span>
                    Promotions
                </button>
                <button>
                    <span className="material-symbols-outlined">group</span>
                    Social</button>
                <button>
                    <span className="material-symbols-outlined">info</span>
                    Updates</button>
            </section>

            <MailList mails={mails} filterBy={filterBy} loggedUser={mailService.loggedinUser}/>
        </section>
    )
}

