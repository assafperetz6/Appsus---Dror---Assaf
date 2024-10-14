const { Link } = ReactRouterDOM

export function NoNotes(){
    return (
        <section className="no-notes">
            <h1>There are no notes that match this search</h1>
            <Link to="/note"><button>Go back</button></Link>
        </section>
    )
}