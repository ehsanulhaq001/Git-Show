import React, { Component } from "react";
import "./App.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import Cards from "../Components/Cards/Cards.js";
import Scroll from "../Components/Scroll.js";
import Light from "../images/light.jpg";
import Dark from "../images/dark.jpg";

const excludeTheseRepos = [
  "Bounce",
  "ehsanulhaq001",
  "start-here-guidelines",
  "ehsanulhaq001.github.io",
];

document.documentElement.style.setProperty(
  "--vh",
  `${window.innerHeight * 0.01}px`
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      repos: [],
      searchfield: "",
      sortBy: "created_at",
      ascOrDesc: 1,
      lightOrDark: 0,
    };
  }
  componentDidMount() {
    //get public repositories

    fetch("https://api.github.com/users/ehsanulhaq001/repos")
      .then((response) => response.json())

      //filter unwanted repos from array
      .then((repos) => {
        const filteredRepos = [];
        repos.forEach((repo) => {
          if (
            !excludeTheseRepos.find(
              (unwantedRepo) => repo.name === unwantedRepo
            )
          ) {
            filteredRepos.push(repo);
          }
        });
        return filteredRepos;
      })
      .then((repos) => this.setState({ repos: repos }));
  }

  //called whenever Search input is changed

  onSearchChange = (event) => {
    this.setState({
      searchfield: event.target.value,
    });
  };

  //called whenever a sort-order is clicked

  onSortMehodChange = (i) => {
    switch (i) {
      case 1:
        this.setState({
          sortBy: "created_at",
        });
        break;
      case 2:
        this.setState({
          sortBy: "updated_at",
        });
        break;
      case 3:
        this.setState({
          sortBy: "size",
        });
        break;
      default:
        break;
    }
  };

  onSortChange = () => {
    this.setState({
      ascOrDesc: !this.state.ascOrDesc,
    });
  };

  onBgChange = () => {
    this.setState({
      lightOrDark: !this.state.lightOrDark,
    });
  };

  getSortInfo = () => {
    if (this.state.sortBy === "created_at") return <span>Date Created</span>;
    if (this.state.sortBy === "updated_at") return <span>Date Updated</span>;
    else return <span>Size</span>;
  };

  render() {
    //filters out Search Results

    const filteredRepos = this.state.repos.filter((repo) => {
      return repo.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });

    //sorts repos according to state.ascOrDesc

    const sortedRepos = filteredRepos.sort((a, b) => {
      if (this.state.ascOrDesc) {
        if (a[this.state.sortBy] < b[this.state.sortBy]) return 1;
        if (a[this.state.sortBy] > b[this.state.sortBy]) return -1;
        else return 0;
      } else {
        if (a[this.state.sortBy] < b[this.state.sortBy]) return -1;
        if (a[this.state.sortBy] > b[this.state.sortBy]) return 1;
        else return 0;
      }
    });

    const url = this.state.lightOrDark ? Light : Dark;

    const theme = {
      backgroundImage: `url(${url})`,
    };

    return (
      <div className="App" style={theme}>
        <header>
          <Navbar
            bg="light"
            className={
              this.state.lightOrDark
                ? "navbar-light  bg-transparent"
                : "navbar-dark  bg-transparent"
            }
            expand="lg"
          >
            <Navbar.Brand id="title">Git Show</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavDropdown className="navItems navDropdown" title="Sort By">
                  <NavDropdown.Item
                    className="navDropdownItem"
                    onClick={() => this.onSortMehodChange(1)}
                  >
                    Date Created
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="navDropdownItem"
                    onClick={() => this.onSortMehodChange(2)}
                  >
                    Date Updated
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="navDropdownItem"
                    onClick={() => this.onSortMehodChange(3)}
                  >
                    Size
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link className="navItems disabled">
                  {this.getSortInfo()}
                </Nav.Link>
                <Nav.Link className="navItems" onClick={this.onSortChange}>
                  {this.state.ascOrDesc ? "Desc" : "Asc"}
                </Nav.Link>
                <Nav.Link className="navItems" onClick={this.onBgChange}>
                  {this.state.lightOrDark ? "Dark" : "Light"}
                </Nav.Link>
              </Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search Repositories"
                  id="searchInput"
                  className="mr-sm-2"
                  style={{
                    color: this.state.lightOrDark
                      ? "rgba(0, 0, 0, 0.7)"
                      : "white",
                  }}
                  onChange={this.onSearchChange}
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        </header>
        <div id="cardsHolder">
          <Scroll>
            <Cards repos={sortedRepos} theme={this.state.lightOrDark}></Cards>
          </Scroll>
        </div>
        <footer>
          <div>
            <a
              href="https://github.com/ehsanulhaq001"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#111111"
                className="custom-icon bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/ehsanulhaq01/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#0015b6"
                className="custom-icon bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/ehsan__ulhaq"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="custom-icon bi bi-twitter"
                viewBox="0 0 16 16"
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
