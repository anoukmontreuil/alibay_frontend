import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import GoogleLogin from 'react-google-login'
class App extends Component {
  constructor() {
    super();
    this.state = { logged: true }
  }
  render() {
    return (
      this.state.logged ? <Homepage /> : <Login />
    )
  }
}
class Login extends Component {
  constructor() {
    super();
    this.state = { loginForm: false, items: {} }
  }
  submit = () => {
    this.login();
    // this.getList();
  }
  loginForm = () => {
    return (<div>
      <h1> Login form</h1>
      <input ref={r => this.username = r} type="text" placeholder="username" name="username" />
      <input ref={r => this.password = r} type="password" placeholder="password" name="password" />
      <button id="login" onClick={this.submit} > login </button>
      {/* <button id="signup" onClick={this.signup} > signup </button> */}
    </div>);
  }
  // getList = () => {
  //   fetch('/todos', {
  //     method: "POST",
  //     body: JSON.stringify(this.username.value)
  //   })
  //     .then(x => x.json())
  //     .then(lst => this.setState({ items: lst })
  //     )
  // }
  login = () => {
    var usr = this.username.value;
    var pwd = this.password.value;
    this.name = usr;
    fetch('/login', {
      credentials: 'include',
      method: "POST",
      body: JSON.stringify({
        username: usr,
        password: pwd
      })
    })
      .then(x => x.text())
      .then(x => {
        this.setState({ attemptedLogin: true, outcome: x })
        this.username = usr;
        this.password = pwd;
      })
  }
  showLoginForm = () => {
    this.setState({ loginForm: true })
  }
  loginRender = () => {
    return (
      <div>
        <h1> Login form </h1>
        {/* <img/> */}
        <button onClick={this.showLoginForm}> LOGIN </button>
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        {this.state.loginForm ? this.loginForm() : this.loginRender()}
      </div>
    );
  }
}
class Homepage extends Component {
  constructor() {
    super();
    this.state = { displayPage: "" }
  }
  showSellPage = () => {
    this.setState({ displayPage: "sellPage" })
  }
  showBuyPage = () => {
    this.setState({ displayPage: "buyPage" })
  }
  showBoughtList = () => {
    this.setState({ displayPage: "boughtList" })
  }
  showSoldList = () => {
    this.setState({ displayPage: "soldList" })
  }
  showAddItemToSellPage = () => {
    this.setState({ displayPage: "addItem" })
  }
  chosePage = () => {
    return (
      <div>
        <div id="sidebar">
          {/* <img/> */}
          <h2> welcome name </h2>
          <button onClick={this.showSellPage}> sell </button>
          <button onClick={this.showBuyPage}> buy </button>
          <button onClick={this.showBoughtList}> bought list </button>
          <button onClick={this.showSoldList}> sold list </button>
        </div>
        <div>
          <Carts /><Carts /><Carts /><Carts />
        </div>
      </div>)
  }
  // confirmItem = () => {
  //   envoi vers le backend
  //   liste : {
  //     name: this.nameItemInput,
  //     price: this.priceItemInput,
  //     blurb: this.blurbItemInput
  //   }
  // }
  addItemToSellPage = () => {
    return (
      <div>
        
        <div>
          <h1> Add an item </h1><button onClick={this.showSellPage}> x </button>
          Name
          <input ref={r => this.nameItemInput = r}></input>
          Price
          <input ref={r => this.priceItemInput = r}></input>
          Description
          <input ref={r => this.blurbItemInput = r}></input>
          <button onClick={this.confirmItem}> add item </button>
        </div>
      </div>
    )
  }
  sellPage = () => {
    return (<div>
      <div id="sidebar">
        {/* <img/> */}
        <button onClick={this.showAddItemToSellPage}> add item </button>
        <h2> welcome name </h2>
        <button onClick={this.showSellPage}> sell </button>
        <button onClick={this.showBuyPage}> buy </button>
        <button onClick={this.showBoughtList}> bought list </button>
        <button onClick={this.showSoldList}> sold list </button>
      </div>
      <div>
        <Carts /><Carts /><Carts /><Carts />
      </div>
    </div>)
  }
  buyPage = () => {
    return (<div>
      <div id="sidebar">
        {/* <img/> */}
        <h2> welcome name </h2>
        <button onClick={this.showSellPage}> sell </button>
        <button onClick={this.showBuyPage}> buy </button>
        <button onClick={this.showBoughtList}> bought list </button>
        <button onClick={this.showSoldList}> sold list </button>
      </div>
      <div>
        <Carts /><Carts /><Carts />
      </div>
    </div>)
  }
  boughtList = () => {
    return (<div>
      <div id="sidebar">
        {/* <img/> */}
        <h2> welcome name </h2>
        <button onClick={this.showSellPage}> sell </button>
        <button onClick={this.showBuyPage}> buy </button>
        <button onClick={this.showBoughtList}> bought list </button>
        <button onClick={this.showSoldList}> sold list </button>
      </div>
      <div>
        <Carts /><Carts />
      </div>
    </div>)
  }
  soldList = () => {
    return (<div>
      <div id="sidebar">
        {/* <img/> */}
        <h2> welcome name </h2>
        <button onClick={this.showSellPage}> sell </button>
        <button onClick={this.showBuyPage}> buy </button>
        <button onClick={this.showBoughtList}> bought list </button>
        <button onClick={this.showSoldList}> sold list </button>
      </div>
      <div>
        <Carts />
      </div>
    </div>)
  }
  render() {
    return (
      <div>
        {this.state.displayPage === "" ? this.chosePage() :
          this.state.displayPage === "sellPage" ? this.sellPage() :
            this.state.displayPage === "buyPage" ? this.buyPage() :
              this.state.displayPage === "boughtList" ? this.boughtList() :
                this.state.displayPage === "soldList" ? this.soldList() :
                  this.state.displayPage === "addItem" ? this.addItemToSellPage() : null
        }
      </div>
    )
  }
}
class Carts extends Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    return (<div>
      <img />
      <h2>titre objet</h2>
      <p>Description objet</p>
    </div>)
  }
}
export default App;