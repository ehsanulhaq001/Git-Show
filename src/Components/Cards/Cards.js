import React from "react";
import Card from "./Card/Card.js";
import "./Cards.css";

function Cards(props) {
  const { repos, theme } = props;
  const cards = [];
  repos.forEach((repo, i) => {
    cards.push(<Card repo={repo} theme={theme} key={i}></Card>);
  });

  return <div className="cardsHolder">{cards}</div>;
}
export default Cards;
