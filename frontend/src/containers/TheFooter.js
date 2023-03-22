import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="#" target="_self" rel="noopener noreferrer">virtualhardwarelab v1.0.0</a>
        <span className="ml-1">&copy; 2023</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
