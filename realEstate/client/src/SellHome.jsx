import { useState } from "react";
export default function SellHome() {
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError]=useState('')

    const handleFormSubmission = async e => {
        setError('')
        e.preventDefault();
        const form = e.target;
        const data = {
            name: form.name.value,
            phone: form.phone.value,
            email: form.email.value,
            soleOwner: form.soleOwner.checked,
            street: form.street.value,
            city: form.city.value,
            state: form.state.value,
            zip: form.zip.value
        };
        try {
            const response = await fetch('http://localhost:3003/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if (response.ok) {
                setResponseMessage(`Success: ${res.message}`);
            } else {
                setError(`Error: ${res.error}`);
            }
        } catch (error) {
            setError(`Error: ${error.error}`);
        }

    }
    if(responseMessage){
        return(
            <div id='submitMessage'>{responseMessage}</div>
        )
    }
    return (

        <form onSubmit={handleFormSubmission} className="sellHomeForm">
            <h3>home owner:</h3>
            name:<input name="name" type="text" id="name" required />
            phone:<input name="phone" type="tel" id="phone" required />
            email:<input name="email" type="email" id="email" required />
            <p>Are you the sole owner?</p>
            <input name="soleOwner" id="soleOwner" type="checkbox" defaultChecked={true} required />

            <h3>home info:</h3>
            <fieldset>
                <legend>Address</legend>
                street:<input name="street" type="text" id="address" required />
                city: <input name="city" type="text" required />
                state: <input name="state" type="text" required />
                zip: <input name="zip" type="text" required />
            </fieldset>
            {error? <div className="error">{error}</div> : null}
            <button type="submit">submit</button>
        </form>
    )
}
