import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setError, setJobs, setLoading } from '../redux/slices/jobSlice';
import axios from 'axios';
import Loader from './../components/Loader';
import Card from '../components/Card';
import Filter from '../components/Filter';

const JobList = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.jobSlice)
  // console.log(state);
  const fetchData = () => {

    dispatch(setLoading());
    axios
      .get("http://localhost:4200/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch(() => dispatch(setError()))

  }

  useEffect(() => {
    fetchData()




  }, [])

  return (
    <div className='list-page'>
      <Filter jobs={state.jobs} />

      {state.isLoading ? (<Loader />) : state.isError ? (
        <p className='error'>
          Üzgünüz verilere erişirken bir sorun oluştu{' '}

          <button 
            onClick={fetchData}
            type='button'>
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text">Yeniden Dene
              </span>
            </button>



        </p>
      )
        : (

          <div className='job-list'>
            {state.jobs?.map((job) => (
              <Card key={job.id} job={job} />
            ))}

          </div>
        )
      }



    </div>
  )
}

export default JobList