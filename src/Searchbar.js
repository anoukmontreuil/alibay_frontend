import React, { Component } from 'react';
import {getPerformSearch} from './requests';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  performSearch = () => {
    getPerformSearch();
    if (this.searchBar.value === "") {
      this.props.pageToDisplayInViewer(this.pageName);
    } else { }
  }

  render = () => {
    return (
      <div className="FlexCenter">
        <input ref={sb => this.searchBar = sb} className="Searchbar" placeholder="Find items for sale" />
        <button onClick={this.performSearch}>Search</button>
      </div>
    );
  }
}

export default Searchbar;