import React, { Component } from "react";
import { connect } from "react-redux";
import { editApp } from "../../../../../../../stores/ducks/apps";
import { Link } from "react-router";

const mapStateToProps = state => ({
  apps: state.apps.apps
});

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.apps[this.props.params.appId].name,
      logo: this.props.apps[this.props.params.appId].logo
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }

  handleInputChange({ target }) {
    switch (target.name) {
      case "name":
        return this.setState({ name: target.value });
      case "logo":
        return this.setState({ logo: target.value });
    }
  }

  handleSumbit(event) {
    event.preventDefault();
    const app = this.props.apps[this.props.params.appId];
    const { name, logo } = this.state;
    this.props.dispatch(editApp(app.id, name, logo));
  }

  render() {
    const app = this.props.apps[this.props.params.appId];
    const { name, logo } = this.state;
    const savable = name !== app.name || logo !== app.logo;

    const saveAction = savable ? (
      <div className="featured-article-category">
        <a className="btn btn--edit btn--save" onClick={this.handleSumbit}>
          Save Changes
        </a>
        or{" "}
        <Link className="btn btn--cancel" to={`/apps/${app.id}`}>
          Cancel
        </Link>
      </div>
    ) : (
      ""
    );

    return (
      <div>
        <div className="featured-article featured-article--blank edit">
          <div
            style={{
              backgroundImage: `url(/static/images/logo-filter.png), url(${
                this.state.logo
              })`
            }}
          >
            {saveAction}
            <div className="featured-article-title edit--input">
              <input
                autoFocus
                className="name"
                name="name"
                onChange={this.handleInputChange}
                placeholder="name"
                value={this.state.name}
              />
            </div>
            <div className="featured-article-subtitle edit--input">
              <input
                name="logo"
                onChange={this.handleInputChange}
                placeholder="logo"
                value={this.state.logo}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Edit);
