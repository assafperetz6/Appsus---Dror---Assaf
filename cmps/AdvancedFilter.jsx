export function AdvancedFilter({ submitAdvancedFilter }) {

    function handleInputs(ev) {
        ev.preventDefault()
    
        const inputs = Array.from(ev.target.elements)
        

        const filterData = inputs.reduce((acc, input) => {
            if (input.value) acc[input.id] = input.value

            return acc
        },{})
        
        filterData.isAdvanced = true
        submitAdvancedFilter(filterData)
    }
    

    return (
        <form className="advanced-filter" onSubmit={handleInputs}>
            <label htmlFor="from">From</label>
            <input id="from" type="text" />

            <label htmlFor="to">To</label>
            <input id="to" type="text" />

            <label htmlFor="subject">Subject</label>
            <input id="subject" type="text" />

            <label htmlFor="txt">Has the words</label>
            <input id="txt" type="text" />

            <button className="advanced-filter-btn" type="submit">Search</button>
        </form>
    )
}