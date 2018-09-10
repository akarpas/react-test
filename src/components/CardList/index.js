import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Cards, Line, CardLink } from "./style"

class CardList extends Component {
  render() {
    const { cards } = this.props

    return (
      <Container>
        <h1>Your Cards</h1>
        <Cards>
          {
            cards.slice(0).reverse().map((item, index) => {
              return (
                <CardLink to={{
                  pathname: `/card/${index}`,
                  state: {
                    card: cards[index],
                    index
                  }
                }} id={index} key={`${index}-link`}>
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