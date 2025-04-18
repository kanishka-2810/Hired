import React from 'react'
import {Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button';
import { Input } from './input';
import { Label } from "@/components/ui/Label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import useFetch from '@/hooks/useFetch';
import { applyToJob } from '@/api/apiApplications';
import { BarLoader } from 'react-spinners';
import { colors } from '@clerk/themes/dist/clerk-js/src/ui/foundations/colors';

const schema = z.object({
  experience: z.number().min(0, {message: "Experience must be atleast 0"}).int(),
  skills: z.string().min(1, {message: "Skills are required"}),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {message: "Education is required"}),
  resume: z.any().refine((file)=> file[0] && (file[0].type === "application/pdf" || file[0].type === "application/msword"), 
  {message: "Only PDF or Word documents are allowed"}),
});

const ApplyJobDrawer = ({user,job,applied=false,fetchJob}) => {

  const {register, handleSubmit, control, formState:{errors}, reset} = useForm({
    resolver: zodResolver(schema)
  });

  const {fn: fnApply, loading: loadingApply, error: errorApply} = useFetch(applyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullname,
      status: "applied",
      resume: data.resume[0]
    }).then(()=> {
      fetchJob();
      reset();
    });
  };

  return (
    <Drawer open={applied ? false : undefined}>
    <DrawerTrigger asChild> 
    <Button 
    size="lg"
    variant={job?.isOpen && !applied ? "blue" : "destructive"}
    disabled= {!job?.isOpen || applied}>
        {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
    </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Apply for {job?.title} at {job?.company?.name}</DrawerTitle>
        <DrawerDescription>Please Fill the form below.</DrawerDescription>
      </DrawerHeader>

      <form onSubmit= {handleSubmit(onSubmit)} 
      className='flex flex-col gap-4 p-4 pb-0'>
        <Input 
        type="number"
        placeholder = "Years of Experience"
        className = "flex-1"
        {...register("experience", {valueAsNumber: true})}
        />    
        {errors.experience && (<p className='text-red-500'>{errors.experience.message}</p>)}

        <Input 
        type="text"
        placeholder = "Skills (Comma Separated)"
        className = "flex-1"
        {...register("skills")}
        />
        {errors.skills && (<p className='text-red-500'>{errors.skills.message}</p>)}

        <Controller
        name='education'
        control={control}
        render={({field}) => (
          <RadioGroup onValueChange = {field.onChange} {...field}> 
          {/* field is from controller and it contains lot of functions and here {...field} wil help to set value automatically as it contain fn value in it */}
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Intermediate" id="Intermediate" />
                <Label htmlFor="Intermediate">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Graduate" id="Graduate" />
                <Label htmlFor="Graduate">Graduate</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Post Graduate" id="Post Graduate" />
                <Label htmlFor="Post Graduate">Post Graduate</Label>
            </div>
        </RadioGroup>
        )} />
        {errors.education && (<p className='text-red-500'>{errors.education.message}</p>)}
        
        <Input
        type="file"
        accept = ".pdf, .doc, .docx"
        className= "flex-1 file:text-gray-500"
        {...register("resume")}
        />
        {errors.resume && (<p className='text-red-500'>{errors.resume.message}</p>)}
        {errorApply?.message && (<p className='text-red-500'>{errorApply?.message}</p>)}
        {loadingApply && <BarLoader width={"100%"} color="#36d7b7"/>}

        <Button type="submit" variant="blue" size="lg">Submit</Button>
      </form>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="destructive">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  )
}

export default ApplyJobDrawer;