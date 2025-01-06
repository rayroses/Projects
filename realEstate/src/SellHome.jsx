export default function sellHome() {
    return (

        <form method="post" action="foo" className="sellHomeForm">
            <h3>home owner:</h3>
            name:<input name="name" type="text" id="name" required />
            phone:<input name="phone" type="tel" id="phone" required />
            email:<input name="email" type="email" id="email" required />
            <p>Are you the sole owner?</p>
            <input name="soleOwner" id="yes" type="checkbox"  value="yes" />

            <h3>home info:</h3>
            <fieldset>
                <legend>Address</legend>
                street:<input  name="street" type="text" id="address" />
                city: <input name="city"  type="text" />
                state: <input name="state" type="text" />
                zip: <input name="zip" type="text" />
            </fieldset>
            <button>submit</button>
        </form>
    )
}
