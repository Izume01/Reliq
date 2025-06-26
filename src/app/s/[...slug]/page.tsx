import React from 'react'

const slugPage = async ({params} : {params : Promise<{slug : string}>}) => {

  const {slug} = await params
  return (
    <div>
      
    </div>
  )
}

export default slugPage