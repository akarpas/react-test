import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Cards, Card, Line, CardLink } from "./style"

class CardList extends Component {
  render() {
    const { cards } = this.props

    return (
      <Container>
        <h1>Your Cards</h1>
        <Cards>
          {
            cards.map((item, index) => {
              return (
                <CardLink to={`/card/${index}`} id={index} key={`${index}-link`}>
                    <Line>{item.text}</Line>
                </CardLink>
              )
            })
          }
        </Cards>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { cards: state.cards }
}

export default connect(mapStateToProps)(CardList)