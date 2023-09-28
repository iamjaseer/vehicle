'use client'
import Link from "next/link"
import Header from "@/component/Header";
import Form from 'react-bootstrap/Form';
import { useEffect, useRef, useState } from "react"
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import Swal from "sweetalert2";

function AddVehicle() {

  const router = useRouter();

  const session = useSession();
  console.log(session)
  const email = session.status === "authenticated" ? session.data.user.email : null


  const vehicleinfos = useSearchParams()
  const id = vehicleinfos.get('id')

  const [vehicle, setVehicle] = useState([]);

  function getVehicle() {
    axios.get(`https://iamjaseer.in/usedvehicle/edit_vehicle.php/${id}`).then(function (response) {
      console.log(response.data);
      setVehicle(response.data);
    });
  }



  //STATES
  const [title, setTitle] = useState('')
  const [regNumber, setRegNumber] = useState('')
  const [chasisNumber, setChasisNumber] = useState('')
  const [engineNumber, setEngineNumber] = useState('')
  const [make, setMake] = useState('')
  const [year, setYear] = useState('')
  const [km, setKm] = useState('')
  const [price, setPrice] = useState('')
  const [lastPrice, setLastPrice] = useState('')
  const [ownerType, setOwnerType] = useState('')
  const [noc, setNoc] = useState('')
  const [tax, setTax] = useState('')
  const [insurance, setInsurance] = useState('')
  const [tyre, setTyre] = useState('')
  const [accident, setAccident] = useState('')
  const [replacemnt, setReplacement] = useState('')


  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [edit, setEdit] = useState(false)



  const uploadedImages = Array.from(images).map(file => {
    return file.name
    // console.log(file.name)
  });




  const updateVehicle = async event => {
    event.preventDefault();

    Swal.fire({
      title: `Do you want edit ${vehicle.map((item) => decodeURI(item.title))}?`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
      confirmButtonColor: '#4E76FB',
      cancelButtonColor: '#ddd',
      confirmButtonText: 'Yes',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        axios.put(`https://iamjaseer.in/usedvehicle/update_vehicle.php/${title}/${regNumber}/${chasisNumber}/${engineNumber}/${make}/${year}/${km}/${price}/${lastPrice}/${ownerType}/${noc}}/${tax}/${insurance}/${tyre}/${accident}/${replacemnt}/${uploadedImages}/${id}`).then(function (response) {
          console.log(response.data);

        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })




    const formData = new FormData();

    for (const file of images) {
      formData.append('files[]', file);
      //  console.log(file.name)

    }

    try {
      const response = await axios.post('https://iamjaseer.in/usedvehicle/reactimageupload.php', formData);

      //console.log(response.data)
      setUploadedFiles(response.data);



    } catch (error) {
      setUploadError(error);
    }
  };





  useEffect(() => {
    getVehicle()
  }, []);



  

  return (
    <>





      <main className='profile'>

        <div className="content">
          <Header
            type={1}
            heading="Edit vehicle"
            brand=""
            welcome=""
            business=""
          />
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                  <button type="button" onClick={() => setEdit(!edit)}>Edit</button>
                <form onSubmit={updateVehicle} className="w-100">
                  <div className="form my-4">
                   <div className="input-group mb-3">
                      <input
                        maxLength={3}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={e => setImages(e.target.files)}
                        className="form-control w-100" />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={!edit == true ? vehicle.map((item) => decodeURI(item.title)) : null}
                        onChange={e => setTitle(e.target.value)}
                        required
                        disabled={!edit}
                       
                      />
                      
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Regsiter Number"
                        value={!edit == true ? vehicle.map((item) => decodeURI(item.register_number)) : null}
                        onChange={e => setRegNumber(e.target.value)}
                        disabled={!edit}
                      />
                      
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Chasis Number"
                        value={!edit == true ? vehicle.map((item) => decodeURI(item.chasis_number)) : null}
                        onChange={e => setChasisNumber(e.target.value)}
                        disabled={!edit}
                      />
                      
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Engine Number"
                        value={!edit == true ? vehicle.map((item) => decodeURI(item.engine_number)) : null}
                        onChange={e => setEngineNumber(e.target.value)}
                        disabled={!edit}
                      />
                      
                    </div>
                    <div className="input-group mb-3">

                      <select
                        className="form-control"
                        placeholder="Make"
                        onChange={e => setMake(e.target.value)}
                        required

                      >
                        {vehicle.map((item) => decodeURI(item.make)) != null ? <option value={vehicle.map((item) => decodeURI(item.make))}>{vehicle.map((item) => decodeURI(item.make))}</option> : <option select>Select</option>}
                        <option value="Maruti Suzuki">Maruti Suzuki</option>
                        <option value="Hyundai">Hyundai</option>
                        <option value="Tata Motors">Tata Motors</option>
                        <option value="Mahindra & Mahindra">Mahindra & Mahindra</option>
                        <option value="Kia">Kia</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Honda">Honda</option>
                        <option value="Renault">Renault</option>
                        <option value="Skoda">Skoda</option>
                        <option value="MG">MG</option>
                        <option value="select">BMW</option>
                        <option value="select">Mercidez Benz</option>
                        <option value="select">Porsche</option>
                        <option value="select">Other</option>
                      </select>

                    </div>

                    <div className="input-group mb-3">
                      <select
                        className="form-control"
                        placeholder="Make"
                        onChange={e => setYear(e.target.value)}
                      >
                        {vehicle.map((item) => decodeURI(item.year)) != null ? <option value={vehicle.map((item) => decodeURI(item.year))}>{vehicle.map((item) => decodeURI(item.year))}</option> : <option select>Select</option>}
                        <option value="2001">2001</option>
                        <option value="2002">2002</option>
                        <option value="2003">2003</option>
                        <option value="2004">2004</option>
                        <option value="2005">2005</option>
                        <option value="2006">2006</option>
                        <option value="2007">2007</option>
                        <option value="2008">2008</option>
                        <option value="2009">2009</option>
                        <option value="2010">2010</option>
                        <option value="2011">2011</option>
                        <option value="2012">2012</option>
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                      </select>

                    </div>
                    <div className="input-group mb-3">
                      <input type="number"
                        className="form-control"
                        placeholder="Kilometer"
                        value={!edit == true ? vehicle.map((item) => decodeURI(item.km)) : null}
                        onChange={e => setKm(e.target.value)}
                        disabled={!edit}
                      />
                      
                    </div>
                    <div className="input-group mb-3">
                      <input type="number"
                        className="form-control"
                        placeholder="Price"
                        value={!edit == true ? vehicle.map((item) => decodeURI(item.price)) : null}
                        onChange={e => setPrice(e.target.value)}
                        required
                        disabled={!edit}
                      />
                      
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Last price"
                        value={!edit == true ? vehicle.map((item) => decodeURI(item.last_price)) : null}
                        onChange={e => setLastPrice(e.target.value)}
                        disabled={!edit}
                      />
                      
                    </div>
                    <p>Additional Info</p>
                    <div className="input-group mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Owner type"
                        value={!edit == true ? vehicle.map((item) => decodeURI(item.owner_type)) : null}
                        onChange={e => setOwnerType(e.target.value)}
                        disabled={!edit}
                      />
                      
                    </div>
                    <div className="form-group form-group- d-flex align-items-center justify-content-between mb-3">
                      Noc
                      {vehicle.map((item) => decodeURI(item.noc)) == 1 ?
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          value={'1'}
                          checked
                          onChange={e => noc != '1' ? setNoc(e.target.value) : setNoc(0)}
                        />
                        :
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          value={'1'}
                          onChange={e => noc != '1' ? setNoc(e.target.value) : setNoc(0)}
                        />
                      }
                    </div>
                    <div className="form-group form-group- d-flex align-items-center justify-content-between mb-3">
                      Tax
                      {vehicle.map((item) => decodeURI(item.tax)) == 1 ?
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          value={'1'}
                          checked
                          onChange={e => noc != '1' ? setTax(e.target.value) : setTax(0)}
                        />
                        :
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          value={'1'}
                          onChange={e => noc != '1' ? setTax(e.target.value) : setTax(0)}
                        />
                      }
                    </div>
                    <div className="form-group form-group- d-flex align-items-center justify-content-between mb-3">
                      Insurance
                      {vehicle.map((item) => decodeURI(item.insurance)) == 1 ?
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          value={'1'}
                          checked
                          onChange={e => noc != '1' ? setInsurance(e.target.value) : setInsurance(0)}
                        />
                        :
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          value={'1'}
                          onChange={e => noc != '1' ? setInsurance(e.target.value) : setInsurance(0)}
                        />
                      }
                    </div>
                    <p>Tyres</p>
                    <div className="input-group mb-3">
                      <select className="form-control" onChange={e => setTyre(e.target.value)}>
                        {vehicle.map((item) => decodeURI(item.accident)) != null ? <option value={vehicle.map((item) => decodeURI(item.accident))}>{vehicle.map((item) => decodeURI(item.accident))}</option> : <option select>Select</option>}
                        <option value="0">Below 50%</option>
                        <option value="1">Above 50%</option>
                      </select>
                    </div>
                    <div className="form-group form-group- d-flex align-items-center justify-content-between mb-3">
                      Accident

                      {vehicle.map((item) => decodeURI(item.accident)) == 1 ?
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          value={'1'}
                          checked
                          onChange={e => accident != '1' ? setAccident(e.target.value) : setAccident(0)}
                        />
                        :
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          value={'1'}
                          onChange={e => accident != '1' ? setAccident(e.target.value) : setAccident(0)}
                        />
                      }
                    </div>
                    <p>Replacements</p>
                    <div className="input-group mb-3">
                      <textarea
                        type="text"
                        rows={4}
                        className="form-control"
                        value={!edit == true ? vehicle.map((item) => decodeURI(item.replacements)) : null}
                        onChange={e => setReplacement(e.target.value)}
                        disabled={!edit}
                      ></textarea>
                      
                    </div>
                    <div className="input-group mb-3">
                      <button type="submit" className="btn btn-primary w-100">Add</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}

export default AddVehicle