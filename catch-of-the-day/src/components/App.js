import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import fishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    }

    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            console.log(localStorageRef);
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        console.log(this.props.match.params.storeId);
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));

    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({ fishes });
    };

    deleteFish = (key) => {
        const fishes  = { ...this.state.fishes };

        // can't use delete fishes[key]. firebase requires us to set it to null
        fishes[key] = null;
        this.setState({ fishes });
    }

    updateFish = (key, updatedFish) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    loadSampleFishes = () => {
        this.setState({ fishes });
    };

    addToOrder = (key) => {
        const order = { ...this.state.order };
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    };

    removeFromOrder = (key) => {
        const order = { ...this.state.order };
        delete order[key];
        this.setState({ order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Daily" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}
                            />
                        ))}
                    </ul>
                </div>
                <Order order={this.state.order} fishes={this.state.fishes} removeFromOrder={this.removeFromOrder} />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes} updateFish={this.updateFish} deleteFish={this.deleteFish} />
            </div>
        )
    }
}

export default App;