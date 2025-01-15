import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
    return (
        <>
        <main className='min-h-screen container'>
        <Header/>
        <Outlet/>
        </main>
        <footer>
            <div className='p-10 text-center bg-gray-800 mt-10'>
            © 2025 Hired. All rights reserved. Company will not charge anything from a candidate. The information 
            on this site may not be reproduced, distributed, transmitted, cached or otherwise used, except with a prior 
            written permission of user.
            </div>
        </footer>
        </>
        
    )
}

export default AppLayout