import { SAVE_CARD, DELETE_CARD, EDIT_CARD } from "../actions/types"

const deleteCard = (state, data) => {
  console.warn("STATE ", state[0])
  if (state.length === 1) {
    return ([])
  }
  state.splice(data.cardNumber, 1)
  return [...state]
}

const editCard = (state, data) => {
  state[data.cardNumber].text = data.text
  return [...state]
}

export default function(state = [], action) {
  switch(action.type) {
    case SAVE_CARD:
      return [...state, action.payload]
    case DELETE_CARD:
      return deleteCard(state, action.payload)
    case EDIT_CARD:
      return editCard(state, action.payload)
    default:
      return state
  }
}