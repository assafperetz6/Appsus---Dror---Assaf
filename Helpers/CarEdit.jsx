const { useNavigate, useParams } = ReactRouterDOM


import { carService } from "../services/car.service.js"

const { useState, useEffect } = React

export function CarEdit() {

    const [carToEdit, setCarToEdit] = useState(carService.getEmptyCar())
    const { carId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (carId) loadCar()
    }, [])


    function loadCar() {
        carService.get(carId)
            .then(setCarToEdit)
            .catch(err => {
                console.log('Problem getting car', err)
                navigate('/car')
            })
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setCarToEdit(prevCar => ({ ...prevCar, [field]: value }))
    }

    function onSaveCar(ev) {
        ev.preventDefault()
        carService.save(carToEdit)
            .then(car => {
            })
            .catch(err => {
                console.log('err:', err)
            })
            .finally(() => {
                navigate('/car')
            })
    }


    const { vendor, speed } = carToEdit
    return (
        <section className="car-edit">
            <h1>{carToEdit.id ? 'Edit' : 'Add'} Car</h1>
            <form onSubmit={onSaveCar}>
                <label htmlFor="vendor">Vendor</label>
                <input value={vendor} onChange={handleChange} type="text" name="vendor" id="vendor" />

                <label htmlFor="speed">Speed</label>
                <input value={speed} onChange={handleChange} type="number" name="speed" id="speed" />
                <button>Save</button>
            </form>
        </section>
    )

}