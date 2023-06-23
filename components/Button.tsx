import React from 'react'

type button = {
  children?: React.ReactNode
  text?: String
  type?: String
}

const Button = ({ children, text, type }: button) => {
  return <button>{children ?? <p>{text}</p>}</button>
}

export default Button
