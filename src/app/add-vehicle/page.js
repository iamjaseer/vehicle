'use client'
import Link from "next/link"
import Header from "@/component/Header";
import Form from 'react-bootstrap/Form';
import { useState } from "react"
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'

function EditProfile() {

  const router = useRouter();

  const session = useSession();
  console.log(session)
  const email = session.status === "authenticated" ? session.data.user.email : null

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




  const uploadedImages = Array.from(images).map(file => {
    return file.name
    // console.log(file.name)
  });


  const addVehicle = async event => {
    event.preventDefault();

    event.preventDefault();
    axios.post(`https://iamjaseer.in/usedvehicle/add_vehicle.php/${title}/${regNumber}/${chasisNumber}/${engineNumber}/${make}/${year}/${km}/${price}/${lastPrice}/${ownerType}/${noc}}/${tax}/${insurance}/${tyre}/${accident}/${replacemnt}/${uploadedImages}/${email}/`).then(function (response) {
      console.log(response.data);
    });
    router.push("/stock")


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





  return (
    <>

      {/* {uploadedImages}

      {title}
      {regNumber}
      {chasisNumber}
      {engineNumber}
      {make}
      {year}
      {km}
      {price}
      {lastPrice}
      {ownerType}
      {noc}
      {tax}
      {tyre}
      {insurance}
      {accident}
      {replacemnt} */}

      <main className='profile'>

        <div className="content">
          <Header
            type={1}
            heading="Add vehicles"
            brand=""
            welcome=""
            business=""
          />
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <form onSubmit={addVehicle} className="w-100">
                  <div className="form my-4">
                    <div className="form-group mb-3">
                      <input
                        maxLength={3}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={e => setImages(e.target.files)}
                        className="form-control w-100"
                        required
                        />
                    </div>
                    <div className="form-group mb-3">
                      <input required type="text" name="" className="form-control" placeholder="Title" onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                      <input required type="text" name="" className="form-control" placeholder="Regsiter Number" onChange={e => setRegNumber(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                      <input required type="number" name="" className="form-control" placeholder="Chasis Number" onChange={e => setChasisNumber(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                      <input required type="number" name="" className="form-control" placeholder="Engine Number" onChange={e => setEngineNumber(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                      <select
                        className="form-control"
                        placeholder="Make"
                        onChange={e => setMake(e.target.value)}
                        required
                      >
                        <option value="Make">Make</option>
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

                    <div className="form-group mb-3">
                      <select
                        className="form-control"
                        placeholder="Make"
                        onChange={e => setYear(e.target.value)}
                        required
                      >
                        <option value="select">Year</option>
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
                    <div className="form-group mb-3">
                      <input required type="number" name="" className="form-control" placeholder="Kilometer" onChange={e => setKm(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                      <input  required type="number" name="" className="form-control" placeholder="Price" onChange={e => setPrice(e.target.value)}  />
                    </div>
                    <div className="form-group mb-3">
                      <input required type="number" name="" className="form-control" placeholder="Last price" onChange={e => setLastPrice(e.target.value)} />
                    </div>
                    <p>Additional Info</p>
                    <div className="form-group mb-3">
                      <input required type="number" name="" className="form-control" placeholder="Owner type" onChange={e => setOwnerType(e.target.value)} />
                    </div>
                    <div className="form-group form-group- d-flex align-items-center justify-content-between mb-3">
                      Noc
                      <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        value={'1'}
                        onChange={e => noc != '1' ? setNoc(e.target.value) : setNoc(0)}
                      />
                    </div>
                    <div className="form-group form-group- d-flex align-items-center justify-content-between mb-3">
                      Tax
                      <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        value={'1'}
                        onChange={e => tax != '1' ? setTax(e.target.value) : setTax(0)}
                      />
                    </div>
                    <div className="form-group form-group- d-flex align-items-center justify-content-between mb-3">
                      Insurance
                      <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        value={'1'}
                        onChange={e => insurance != '1' ? setInsurance(e.target.value) : setInsurance(0)}

                      />
                    </div>
                    <p>Tyres</p>
                    <div className="form-group mb-3">
                      <select className="form-control" onChange={e => setTyre(e.target.value)} required>
                        <option selected>Choose...</option>
                        <option value="0">Below 50%</option>
                        <option value="1">Above 50%</option>
                      </select>
                    </div>
                    <div className="form-group form-group- d-flex align-items-center justify-content-between mb-3">
                      Accident
                      <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        value={'1'}
                        onChange={e => accident != '1' ? setAccident(e.target.value) : setAccident(0)}
                      />
                    </div>
                    <p>Replacements</p>
                    <div className="form-group mb-3">
                      <textarea type="text" rows={4} className="form-control" onChange={e => setReplacement(e.target.value)}></textarea>
                    </div>
                    <div className="form-group mb-3">
                      <button type="submit" className="btn btn-primary w-100">Add</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Header
    type=""
    heading=""
    brand=""
    welcome=""
    business=""
    />
    <BottomNav
    items={[
      {
        'icon':'test',
        'heading':'New',
        'active':'',
        'link':'/stock'
      },
      {
        'icon':'test',
        'heading':'Sold',
        'active':'active',
        'link':'/sold'
      },
    ]}
    />
    <Brand
    image=""
    />
    <Button
    type=""
    label=""
    />
    <Card
    type=""
    label=""
    data=""
    /> */}
    </>
  )
}

export default EditProfile