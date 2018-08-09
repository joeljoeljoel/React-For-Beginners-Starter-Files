import React from 'react';
import { getFunName } from "../helpers";

class StorePicker extends React.Component {

    storeNameInput = React.createRef();

    /* Write goToStore as a property instead of a function so we can use `this` */
    goToStore = (event) => {
        event.preventDefault();
        console.log(this);
    }

    render() {
        console.log(this);
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter A Store</h2>
                <input ref={this.storeNameInput}  type="text" required placeholder="Store Name" defaultValue={getFunName()} />
                <button type="submit">Visit Store →</button>
            </form>
        )
    }
}

export default StorePicker;