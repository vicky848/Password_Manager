import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  listenWebsite = event => {
    this.setState({website: event.target.value})
  }

  listenUsername = event => {
    this.setState({username: event.target.value})
  }

  listenPassword = event => {
    this.setState({password: event.target.value})
  }

  addContent = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classVale = colorList[Math.floor(Math.random() * 5)]

    const newValue = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classVale,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValue],
      website: '',
      username: '',
      password: '',
      isTrue: false,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      latestList,
      username,
      password,
      searchInput,
      isShow,
    } = this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="user-card-container">
          <form className="form-details" onSubmit={this.addContent}>
            <h1 className="user-heading">Add New Password</h1>

            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-image"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input-element"
                onChange={this.listenWebsite}
                value={website}
              />
            </div>

            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-image"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input-element"
                onChange={this.listenUsername}
                value={username}
              />
            </div>

            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-image"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input-element"
                onChange={this.listenPassword}
                value={password}
              />
            </div>
            <button className="button" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="password-manager"
            alt="password manager"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="lg-image"
            alt="password manager"
          />
        </div>

        <div className="down-container">
          <div className="search-card-container">
            <div className="your-password">
              <h1 className="password-heading">Your Passwords</h1>
              <p className="color-text">{newList.length}</p>
            </div>
            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="input-image"
                alt="search"
              />
              <input
                type="search"
                className="input-element"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>

          <hr />

          <div className="showing-password">
            <input
              value="checkbox"
              type="checkbox"
              className="check-box-password"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-image"
                alt="no passwords"
              />
              <p className="no-password">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="result-container">
              {newList.map(eachValue => (
                <li className="list-item" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachValue.websiteName}</p>
                    <p className="website"> {eachValue.userName}</p>

                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt=" stars"
                        className="image-stars"
                      />
                    )}
                    {isShow && <p className="website">{eachValue.Password}</p>}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={() => this.deleteItem(eachValue.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="delete-img"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
