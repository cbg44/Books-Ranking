import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
    active = {
        backgroundColor: "#212F3D",
        color: "white",
        fontWeight: "bold"
    };
    header = {
        listStyle: "none",
        display: "flex",
        justifyContent: "space-evenly"
    };
    render() {
        return (
            <div style={this.header}>
                <NavLink exact to="/" activeStyle={this.active}>
                    Home
                </NavLink>
                <NavLink exact to="/rank/9" activeStyle={this.active}>
                    Book By Rank
                </NavLink>
                <NavLink exact to="/rank/9/9.5" activeStyle={this.active}>
                    Book By Rank And Author Rank
                </NavLink>
            </div>
        );
    }
}
export default Header;