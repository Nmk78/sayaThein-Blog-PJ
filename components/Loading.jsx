import React from 'react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Loading = ({size}) => {
  return (
    <>
      <FontAwesomeIcon icon={faSpinner} size={size} spin />
    </>
  )
}

export default Loading