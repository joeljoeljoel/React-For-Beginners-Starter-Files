import React from "react";


class EditFishForm extends React.Component {
    handleChange = (event) => {
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.props.updateFish(this.props.index, updatedFish);
    }

    render() {
        return (
          <div className="fish-edit">
            <input name="name" type="text" value={this.props.fish.name} onChange={this.handleChange} />
            <input name="price" type="text" value={this.props.fish.price} onChange={this.handleChange} />
            <select name="status" onChange={this.handleChange}>
                <option value="available">Fresh!</option>
                <option value="unavailable">Sold Out!</option>
            </select>
            <textarea name="desc"  type="text" value={this.props.fish.desc} onChange={this.handleChange} />
            <input name="image" value={this.props.fish.img} onChange={this.handleChange} />
          </div>
        )
    }
}

export default EditFishForm;