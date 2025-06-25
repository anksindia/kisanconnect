import React from 'react'

const Button = (props) => {
  return (
    <div>
      <button className="bg-green-600 hover:bg-green-700 font-semibold text-white px-4 py-2 rounded-md">
                {props.button}
              </button>
    </div>
  )
}

export default Button

