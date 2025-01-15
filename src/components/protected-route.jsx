import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const{isSignedIn,user,isLoaded}=useUser() //user= user details, isloaded=user details loaded or not
    const{pathname}=useLocation() 

    if(isLoaded && !isSignedIn && isSignedIn!==undefined){
        return <Navigate to='/?sign-in=true'/>
    }     //isSignedIn!==undefined means still loading

    // check onboarding status
    if(user !== undefined && !user?.unsafeMetadata?.role && pathname !== '/onboarding')
      return <Navigate to= '/onboarding' />
    

  return (
    children
  )
}

export default ProtectedRoute