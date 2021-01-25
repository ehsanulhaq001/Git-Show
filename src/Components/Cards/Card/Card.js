import React from "react";
import { Card, Button } from "react-bootstrap";
import "./Card.css";

function Cards(props) {
  const { repo } = props;
  const url = "https://" + repo.owner.login + ".github.io/" + repo.name;
  const imageUrl =
    "https://raw.githubusercontent.com/" +
    repo.owner.login +
    "/" +
    repo.name +
    "/master/preview.png";
  return (
    <>
      <Card id="card">
        <Card.Img id="cardImg" variant="top" src={imageUrl} />
        <Card.Body className="cardBody">
          <Card.Title>{repo.name}</Card.Title>
          {/* <Card.Text>{repo.description ? repo.description : "none"}</Card.Text> */}
          <Button
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="liveDemoBtn"
          >
            Live Demo
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
export default Cards;
