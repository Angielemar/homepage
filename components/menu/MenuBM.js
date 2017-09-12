import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import FaPlus from 'react-icons/lib/fa/plus';
import FaMinus from 'react-icons/lib/fa/minus';

import Home from 'content/Home';
import About from 'content/About';
import Resume from 'content/Resume';
import Portfolio from 'content/portfolio/Portfolio';
import StreetCat from 'content/portfolio/StreetCat';
import FamilyTrip from 'content/portfolio/FamilyTrip';

import 'menu.scss';

class MenuBM extends Component {
  constructor(props) {
    super(props);

    this.getChildMenuBtn = this.getChildMenuBtn.bind(this);

    this.handleMenu = this.handleMenu.bind(this);
    this.handleChildMenu = this.handleChildMenu.bind(this);

    this.state = {
      close: false,
      childMenuClose: false,
    };
  }

  componentWillMount() { }
  componentDidMount() { }

  shouldComponentUpdate() {
    return true;
  }

  componentWillUpdate() { }
  componentWillUnmount() { }

  getChildMenuBtn() {
    const MBtn = this.state.childMenuClose === false ?
      <FaPlus style={{ paddingLeft: '10px', display: 'inline-block' }} size={12} onClick={this.handleChildMenu} />
      : <FaMinus style={{ paddingLeft: '10px', display: 'inline-block' }} size={12} onClick={this.handleChildMenu} />;

    return MBtn;
  }

  handleChildMenu() {
    this.setState({ childMenuClose: !this.state.childMenuClose, close: true });
  }

  handleMenu() {
    this.setState({ close: false });
  }

  render() {
    return (
      <Router>
        <div>
          <Menu noOverlay={false} isOpen={this.state.close}>
            <Link className="bm-menu-item" to="/jinze">Home</Link>
            <Link className="bm-menu-item" to="/about" onClick={this.handleMenu}>About</Link>
            <Link className="bm-menu-item" to="/resume" onClick={this.handleMenu}>Resume</Link>
            <Link className="bm-menu-item" to="/portfolio" onClick={this.handleMenu} style={{ width: '70%', display: 'initial' }}>Portfolio</Link>
            {this.getChildMenuBtn()}
            <Menu
              noOverlay={true}
              customCrossIcon={false}
              menuClassName="bm-menu-child"
              itemListClassName="no-padding bm-item-list-child"
              crossButtonClassName="bm-cross-child"
              isOpen={this.state.childMenuClose}
              width={200}
            >
              <Link className="bm-menu-item-child" to="/streetcat" onClick={this.handleMenu}>Street Cat</Link>
              <Link className="bm-menu-item-child" to="/FamilyTrip" onClick={this.handleMenu}>Family Trip in Kansai</Link>
            </Menu>
          </Menu>
          <Route exact={true} path="/jinze" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/resume" component={Resume} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/streetcat" component={StreetCat} />
          <Route path="/familyTrip" component={FamilyTrip} />
        </div>
      </Router>
    );
  }
}

export default MenuBM;
