import React, { Component } from "react";
import { connect } from "react-redux"
import { 
  Container,
  DrawerButton,
  TextArea,
  Label,
  StyledInput,
  StyledSelect,
  Form,
  Button,
  Notice
} from "./style"
import ExpandLessIcon from "../../assets/expandLess.png"
import ExpandMoreIcon from "../../assets/expandMore.png"
import * as actions from "../../actions"

class CardMaker extends Component {
  state = {
    text: "",
    author: "",
    emoji: "smiley",
    open: true
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize')
  }

  updateDimensions = () => {
    if (window.innerWidth > 1199) {
      this.setState({ open: true })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { text, author, emoji } = this.state
    this.props.saveCard({
      text,
      author,
      emoji
    })
    this.setState({
      text: "",
      author: "",
      emoji: "smiley"
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleClick = (event) => {
    const { open } = this.state
    this.setState({ open: !open })
  }

  render() {
    const { open } = this.state
    const { cards } = this.props
    const isLimit = cards.length >= 20
    return (
      <Container>
        {!open && <DrawerButton src={ExpandMoreIcon} onClick={this.handleClick}/>}
        {open && 
          <Form id="form" onSubmit={this.handleSubmit}>
            <Label>Card Text</Label>
            <TextArea
              name="text"
              placeholder="Add text to your card"
              value={this.state.text}
              onChange={this.handleChange}
              required
            />
            <Label>Author</Label>
            <StyledInput
              name="author"
              component="input"
              value={this.state.author}
              onChange={this.handleChange}
              placeholder="Name"
              required
            />
            <Label>Mood</Label>
            <StyledSelect
              name="emoji"
              required
              component="select"
              onChange={this.handleChange}
              value={this.state.emoji}
            >
              <option value="smiley">Smiley</option>
              <option value="angry">Angry</option>
              <option value="sad">Sad</option>
            </StyledSelect>
            {!isLimit ?
              <Button type="submit"> Create </Button> :
              <Notice> Up to 20 Cards at a time! </Notice>}
            <DrawerButton src={ExpandLessIcon} onClick={this.handleClick}/>
          </Form>
        }
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { cards: state.cards }
}

export default connect(mapStateToProps, actions)(CardMaker)