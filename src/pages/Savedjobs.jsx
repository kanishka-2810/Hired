import { getSavedJobs, saveJob } from '@/api/apiJobs'
import JobCard from '@/components/JobCard'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'

const Savedjobs = () => {
    const {isLoaded} = useUser();

    const {fn: fnsavedJobs, loading: loadingSavedJobs, data: savedJobs} = useFetch(getSavedJobs);

    useEffect(() => {
        if(isLoaded){
            fnsavedJobs();
        }
    },[isLoaded]);

    if(!isLoaded || loadingSavedJobs){
        return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
    }
    return (
        <div>
        <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>
            Saved Jobs
        </h1>

       {loadingSavedJobs === false && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {savedJobs?.length > 0 ? (
                savedJobs.map((saved) => {
                    return (
                        <JobCard 
                            key={saved.id}
                            job= {saved?.job}
                            savedInit= {true}
                            onSavedJobs={fnsavedJobs}
                        />
                    )
                })
            ) : (
                <div>No Saved Jobs Found</div>
            )}
        </div>
       )}
        </div>
    )
}

export default Savedjobs