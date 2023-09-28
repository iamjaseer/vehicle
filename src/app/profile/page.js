'use client'
import Link from "next/link"
import BottomNav from "@/component/BottomNav"
import Brand from "@/component/Brand"
import Button from "@/component/Button"
import Card from "@/component/Card"
import Header from "@/component/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react'
import Swal from "sweetalert2"


function Profile() {

  const router = useRouter();

  const session = useSession();
  // console.log(session)

  const email = session.status === "authenticated" ? session.data.user.email : null

  // STATES
  const [shopName, setShopName] = useState('')
  const [place, setPlace] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')


  const [editProfile, setEditProfile] = useState(false)
  

  //ADD PROFILE

  const addProfile = (event) => {
    event.preventDefault();

    Swal.fire({
      title: `Do you want to edit profile?`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
      confirmButtonColor: '#4E76FB',
      cancelButtonColor: '#ddd',
      confirmButtonText: 'Yes, Save',
  }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        axios.put(`https://iamjaseer.in/usedvehicle/update_profile.php/${shopName}/${place}/${phone}/${address}/${email}`).then(function (response) {
      console.log(response.data);
    });


      } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
      }
  })


   
    // alert()
    //router.push(`/add-vehicle?user=${authid}`)
  }


  const [users, setUsers] = useState([]);

  function getUsers() {
    axios.get(`https://iamjaseer.in/usedvehicle/shops.php/${email}`).then(function (response) {
      console.log(response.data);
      setUsers(response.data);
    });
  }


  useEffect(() => {
    getUsers()
  }, []);

  return (
    <>
      {/* {shopName}
  {email} */}

      <main className='profile'>
        <div className="content">
          <Header
            type={1}
            heading="Create a profile"
            brand=""
            welcome=""
            business=""
          />
          <div className="container-fluid">
          <button type="button" className="btn btn-outline-primary dotted w-100 my-4" onClick={() => setEditProfile(!editProfile)}>Edit profile</button>
            <div className={editProfile == false ? "row" : "row d-none"}>
              <div className="col-12">
                <ul className="list-unstyled primary info-list rowd d-block">
                  <li className="d-block">
                    <span className="label">Name</span>
                    <span className="data">
                      {users.map((item) => decodeURI(item.name))}
                    </span>
                  </li>
                  <li className="d-block">
                    <span className="label">Place</span>
                    <span className="data">
                      {users.map((item) => decodeURI(item.place))}
                    </span>
                  </li>
                  <li className="d-block">
                    <span className="label">Phone</span>
                    <span className="data">
                      {users.map((item) => decodeURI(item.phone))}
                    </span>
                  </li>
                  <li className="d-block">
                    <span className="label">Email</span>
                    <span className="data">
                      {users.map((item) => decodeURI(item.email))}
                    </span>
                  </li>
                  <li className="d-block">
                    <span className="label">Address</span>
                    <span className="data">
                      {users.map((item) => decodeURI(item.address))}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={editProfile == true ? "row" : "row d-none"}>
              <div className="col-12">
                <form onSubmit={addProfile} className="w-100">
                  <div className="form my-4">
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        name=""
                        className="form-control"
                        placeholder="Shop Name"
                        onChange={e => setShopName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="text" name=""
                        className="form-control"
                        placeholder="Place"
                        onChange={e => setPlace(e.target.value)}

                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="number"
                        name=""
                        className="form-control"
                        placeholder="Phone"
                        onChange={e => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <textarea
                        type="text"
                        rows={4}
                        className="form-control"
                        placeholder="Address"
                        onChange={e => setAddress(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="form-group mb-3">
                      <button type="submit" className="btn btn-primary w-100">Finish</button>
                    </div>
                  </div>
                </form>
                </div>
            </div>
            <div className="row">
              <div className="col-12">
              {session.status === "authenticated" ? <button onClick={() => signOut("google")} className="btn btn-primary-outline btn-lg  w-100 rounded-pill mb-3">Logout</button> : router.push("/")}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Profile