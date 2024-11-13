import React, { createContext } from 'react'


export const Appcontext = createContext()

const Appcontextprovider = () => {

  const value ={}
  return (
    <Appcontext.Provider value = {value}>

      
    </Appcontext.Provider>
  )
}

export default Appcontextprovider
