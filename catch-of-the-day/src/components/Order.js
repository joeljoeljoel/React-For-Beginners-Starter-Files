import React from "react";
import { formatPrice } from "../helpers";

class Order extends React.Component {
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const amount = this.props.order[key];

        if (!fish) {
            return null;
        }

        const isAvailable = fish && fish.status === 'available';
        if (!isAvailable) {
            return <li key={key}>
                Sorry {fish ? fish.name : 'fish'} is no longer available
            </li>
        }

        return <li key={key}>
            {amount} lbs.
            {fish.name}
            {formatPrice(fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
        </li>
    };
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((tally, key) => {
            const fish = this.props.fishes[key];
            const amount = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return tally + amount * fish.price;
            }
            return tally;
        }, 0);

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul className="order">
                    { orderIds.map(this.renderOrder) }
                </ul>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>

            </div>
        )
    }
}

export default Order;