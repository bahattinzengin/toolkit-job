import React, { useEffect } from 'react'
import { statusOpt, typeOpt } from './../constant/index';
import { v4 } from 'uuid';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createJob,
  setError,
  setJobs, setLoading
} from '../redux/slices/jobSlice';
import { toast } from 'react-toastify';

const AddJob = () => {
  const dispactch = useDispatch()
  const navigate = useNavigate()
  const state=useSelector((store)=>store.jobSlice)
  // console.log(state);

  useEffect(() => {
    dispactch(setLoading());
    axios
      .get("http://localhost:4200/jobs")
      .then((res) => dispactch(setJobs(res.data)))
      .catch(() => dispactch(setError()))

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries())
    data.id = v4()
    data.date = new Date().toLocaleDateString()

    axios
      .post('http://localhost:4200/jobs', data)
      .then(() => {
        navigate('/')
        dispactch(createJob(data));
        toast.success("Ekleme Başarıyla Gerçekleşti")

        e.target.reset()
      })

  }
  return (
    <div className='add-page'>
      <section className='add-sec'>
        <h2>Yeni İş Ekle</h2>

        <form onSubmit={handleSubmit} >
          <div>
            <label >Pozisyon</label>
            <input
              list='positions'
              name='position'
              type="text"
              required
            />
            <datalist id='positions'>
              {state.jobs.map((job) => (
                <option value={job.position} />
              ))}
            </datalist>
          </div>

          <div>
            <label >Şirket</label>
            <input
              list='companies'
              name='company'
              type="text"
              required
            />
            <datalist id='companies'>
              {state.jobs.map((job) => (
                <option value={job.company} />
              ))}
            </datalist>
          </div>

          <div>
            <label >Lokasyon</label>
            <input
              list='locations'
              name='location'
              type="text"
              required
            />

            <datalist id='locations'>
              {state.jobs.map((job) => (
                <option value={job.location} />
              ))}
            </datalist>
          </div>

          <div>
            <label >Durum</label>
            <select name='status'>
              <option hidden >seçiniz</option>
              {statusOpt.map((text) => (
                <option key={text} >{text} </option>
                
              ))}
            </select>
          </div>



          <div>
            <label >Tür</label>
            <select name='type' >
              <option hidden >seçiniz</option>
              {typeOpt.map((i) => (
                <option >{i} </option>
              ))}
            </select>
          </div>


          <div>
            <button type='submit'>
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text"> Oluştur
              </span>
            </button>
          </div>

        </form>
      </section>



    </div>
  )
}

export default AddJob