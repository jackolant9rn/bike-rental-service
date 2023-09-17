import React, { useState, useEffect } from "react";
import './Officers.css'
import { useDispatch, useSelector } from "react-redux";
import SignUpForm from "../SignUpForm/SignUpForm";
import { instanceAuth } from "../../utils/axios/axios";
import Officer from "../Officer/Officer";
import { addofficer, allofficers, removeofficer } from "../../store/slice/officers/officers";

function Officers() {

  const dispatch = useDispatch()

  const [form, setForm] = useState(true)

  const { officers } = useSelector((state) => state.officers)

  const { user } = useSelector(state => state.auth)

  const visibleForm = () => {
    setForm(!form)
  }

  const addOfficer = (obj) => {
    try {
       instanceAuth.post('officers', obj)
        .then(response => {
          dispatch(addofficer(response.data.data))
        })
    } catch (e) {
      console.log(e.response.data.message)
    }
  }

  const removeOfficer =  (id) => {
     instanceAuth.delete(`officers/${id}`)
      .then(() => {
        dispatch(removeofficer(id))
      })
  }

  useEffect(() => {
      instanceAuth.get('officers')
        .then(response => dispatch(allofficers(response.data.officers)))
  }, [])

  return (
    <div className="users">
      {officers.map((officer, index) => {
        return (
          <Officer officer={officer} key={officer._id} removeOfficer={removeOfficer} disabled={index === 0 || officer._id === user.data.user.id ? `disabled` : ''} />
        )
      })}
      {form && <button className="btn btn_add-user" onClick={visibleForm}>Добавить сотрудника</button>}
      {!form && <SignUpForm textBtn="Добавить пользователя" visibleForm={visibleForm} addOfficer={addOfficer} />}
    </div>
  )
}

export default Officers