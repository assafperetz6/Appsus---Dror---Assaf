import { MailList } from '../cmps/MailList.jsx'

export function MailIndex() {

    return (
        <section className="mail-container">
            <section className="actions-pagination">
                <section className="select-options flex">
                    <button>
                        <img className="icon" src="../../assets/img/icons/check-box.png" alt="check-box-icon" />
                    </button>
                    <button>
                        <img className="icon" src="../../assets/img/icons/arrow-down.png" alt="arrow-down-icon" />
                    </button>

                    <button>
                        <img className="icon" src="../../assets/img/icons/refresh.png" alt="refresh-icon" />
                    </button>

                    <button>
                        <img className="icon" src="../../assets/img/icons/more.png" alt="more-icon" />
                    </button>
                </section>

                <section className="info-pagination flex">
                    <div className="shown-mails">1-50 of 2,000</div>
                    <button>
                        <img className="icon" src="../../assets/img/icons/arrow-left.png" alt="arrow-left-icon" />
                    </button>
                    <button>
                        <img className="icon" src="../../assets/img/icons/arrow-right.png" alt="arrow-right-icon" />
                    </button>
                </section>



            </section>

            <section className="filter-tabs">
                <button>Primary</button>
                <button>Promotions</button>
                <button>Social</button>
                <button>Updates</button>
            </section>
            
            <section></section>
            <MailList />
        </section>
    )
}

