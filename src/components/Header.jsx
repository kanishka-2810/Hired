import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react'

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const {user} =useUser();

  const handleOverlayClick = (e) => {
    console.log(e)
    if(e.target === e.currentTarget){
      setShowSignIn(false)
      setSearch({})
    }
  }
  
  useEffect(() => {
    if(search.get('sign-in')){
      setShowSignIn(true);
    }
  },[search]);

  return (
    <>
        <nav className='py-4 flex justify-between items-center'>
            <Link>
                <img src="./hired_logo.JPG" className='h-20 border rounded-full' alt="hired logo" />
            </Link>

            <div className='flex gap-8'>
            <SignedOut>
            <Button variant="outline"
            onClick= {() => setShowSignIn(true)}>Login</Button>
            </SignedOut>
            <SignedIn>
            {/* this button will only show if an user is a recruiter */}
            {user?.unsafeMetadata?.role ==="recruiter" && (<Link to="/post-job">
            <Button variant='destructive' className='rounded-full'>
            <PenBox size={20} className='mr-1'/>
                Post a Job
              </Button>
            </Link>)}
            <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-10 h-10'
              },
            }}>
            <UserButton.MenuItems>
              <UserButton.Link
              label='My Jobs'
              labelIcon={<BriefcaseBusiness size={15}/>}
              href='/my-jobs'
              />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Link
              label='Saved Jobs'
              labelIcon={<Heart size={15}/>}
              href= 'saved-job'/>
            </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
          </div>

        </nav>

        {/* Modal for signIn */}
        {showSignIn && <div className='fixed inset-0 flex justify-center items-center bg-black z-10'
        onClick={handleOverlayClick}>
          <SignIn
            signUpForceRedirectUrl='/onboarding'
            fallbackRedirectUrl='/onboarding'
          />
          </div>}
    </>
  )
}

export default Header