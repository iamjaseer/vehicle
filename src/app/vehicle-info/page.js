'use client'
import { useEffect, useState } from "react";
import Header from "@/component/Header"
import Carousel from 'react-bootstrap/Carousel';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import axios from "axios";
import Swal from 'sweetalert2'
import Link from "next/link";


function VehicleInfo() {

    const router = useRouter();
    const vehicleinfos = useSearchParams()
    const id = vehicleinfos.get('id')


    //GET VEHICLE INFO
    const [vehicle, setVehicle] = useState([]);
    const [loading, setLoading] = useState(false);
    function getVehicle() {
        axios.get(`https://iamjaseer.in/usedvehicle/vehicles_info.php/${id}`).then(function (response) {
            //  console.log(response.data);
            setVehicle(response.data);
            setLoading(true)
        });
    }


    //MARK SOLD
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleMarkSold = () => setShow(true);



    const [customername, setcustomername] = useState('');
    const [customerphone, setCustomerphone] = useState('');
    const [customerprice, setCustomerprice] = useState('');
    const [customernote, setCustomernote] = useState('');

    const sold = (event) => {
        event.preventDefault()

        Swal.fire({
            title: `Do you want to sold ${vehicle.map((item) => decodeURI(item.title))}?`,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
            confirmButtonColor: '#4E76FB',
            cancelButtonColor: '#ddd',
            confirmButtonText: 'Yes, sold',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                axios.put(`https://iamjaseer.in/usedvehicle/mark_sold.php/${vehicle.map((item) => decodeURI(item.id))}/${customername}/${customerphone}/${customerprice}/${customernote}`).then(function (response) {
                    console.log(response.data);
                });


            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })


    }



    const removeVehicle = (event) => {
        event.preventDefault()
        Swal.fire({
            title: `Do you want remove ${vehicle.map((item) => decodeURI(item.title))}?`,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
            confirmButtonColor: '#4E76FB',
            cancelButtonColor: '#ddd',
            confirmButtonText: 'Yes, Remove',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                axios.delete(`https://iamjaseer.in/usedvehicle/delete_vehicle.php/${vehicle.map((item) => decodeURI(item.id))}/`).then(function (response) {
            console.log(response.data);
        });

        router.push('/stock')

            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
       
    }


    useEffect(() => {
        getVehicle()
    }, []);





    return (
        <>

            <main className='single'>
                <div className="content">
                    <Header
                        type={2}
                        heading={vehicle.map((item) => decodeURI(item.title))}
                        brand=""
                        welcome=""
                        business=""
                    />
                    <div className="container-fluid mt-3 pb-5">
                        <div className="row mb-5">
                            <div className="col-12">

                                <Carousel
                                    touch={true}
                                    controls={false}
                                    indicators={false}
                                >
                                    {vehicle.map((item, k) => item.photo.split(',')[0] == null ? null :
                                        <Carousel.Item key={k}>
                                            <img src={`https://iamjaseer.in/usedvehicle/uploads/${vehicle.map((item) => decodeURI(item.photo.split(',')[0]))}`} className="w-100 d-block" alt="" />
                                        </Carousel.Item>
                                    )}
                                    {vehicle.map((item, k) => item.photo.split(',')[1] == null ? null :
                                        <Carousel.Item  key={k}>
                                            <img src={`https://iamjaseer.in/usedvehicle/uploads/${vehicle.map((item) => decodeURI(item.photo.split(',')[1]))}`} className="w-100 d-block" alt="" />
                                        </Carousel.Item>
                                    )}
                                    {vehicle.map((item, k) => item.photo.split(',')[2] == null ? null :
                                        <Carousel.Item key={k}> 
                                            <img src={`https://iamjaseer.in/usedvehicle/uploads/${vehicle.map((item) => decodeURI(item.photo.split(',')[2]))}`} className="w-100 d-block" alt="" />
                                        </Carousel.Item>
                                    )}

                                </Carousel>
                                <div className="content mt-3">
                                    <p className="title mb-1 h5 fw-semibold">{vehicle.map((item) => decodeURI(item.title))}</p>
                                    <small className="brand">{vehicle.map((item) => decodeURI(item.make))}</small>
                                </div>
                                <div className="selling-price my-4">
                                    <p>SELLING PRICE</p>
                                    <div className="price text-end">

                                        {vehicle.map((item) => decodeURI(item.status)) == 1 ? 'SOLD' : '₹' + vehicle.map((item) => decodeURI(item.price.replace(/.(?=(..)*...$)/g, '$&,')))}
                                        <small>₹{vehicle.map((item) => decodeURI(item.status)) == 1 ? vehicle.map((item) => item.customer_price.replace(/.(?=(..)*...$)/g, '$&,')) : vehicle.map((item) => decodeURI(item.last_price.replace(/.(?=(..)*...$)/g, '$&,')))} </small>
                                    </div>
                                </div>
                                <p className="mt-3 mb-2 fw-semibold">Vehicle  info</p>
                                <ul className="list-unstyled text-uppercase primary info-list">
                                    <li>
                                        <span className="label">REGISTER NO.</span>
                                        <span className="data">
                                            {vehicle.map((item) => decodeURI(item.register_number)) == 0 ? '-' : vehicle.map((item) => decodeURI(item.register_number))}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="label">CHASIS NO.</span>
                                        <span className="data">
                                            {vehicle.map((item) => decodeURI(item.chasis_number)) == 0 ? '-' : vehicle.map((item) => decodeURI(item.chasis_number))}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="label">ENGINE NO.</span>
                                        <span className="data">
                                            {vehicle.map((item) => decodeURI(item.engine_number)) == 0 ? '-' : vehicle.map((item) => decodeURI(item.engine_number))}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="label">KILOMETER</span>
                                        <span className="data">
                                            {vehicle.map((item) => decodeURI(item.km)) == 0 ? '-' : vehicle.map((item) => decodeURI(item.km))}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="label">YEAR</span>
                                        <span className="data">
                                            {vehicle.map((item) => decodeURI(item.year)) == 0 ? '-' : vehicle.map((item) => decodeURI(item.year))}
                                        </span>
                                    </li>
                                </ul>
                                <p className="mt-3 mb-2 fw-semibold">Documents</p>
                                <ul className="list-unstyled text-uppercase primary info-list">
                                    <li>
                                        <span className="label">TAX</span>
                                        <span className="data">
                                            {vehicle.map((item) => decodeURI(item.tax)) == 1 ? 'Yes' : 'No'}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="label">NOC</span>
                                        <span className="data">
                                            {vehicle.map((item) => decodeURI(item.noc)) == 1 ? 'Yes' : 'No'}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="label">INSURANCE</span>
                                        <span className="data">
                                            {vehicle.map((item) => decodeURI(item.insurance)) == 1 ? 'Yes' : 'No'}
                                        </span>
                                    </li>
                                </ul>
                                <p className="mt-3 mb-2 fw-semibold">Tyre</p>
                                <ul className="list-unstyled text-uppercase primary info-list">
                                    <li>
                                        <span className="label">Condition</span>
                                        <span className="data">
                                            {vehicle.map((item) => decodeURI(item.tyre)) == 0 ? 'Below 50%' : 'Above 50%'}
                                        </span>
                                    </li>
                                </ul>
                                <p className="mt-3 mb-2 fw-semibold">Accident and Replacements</p>

                                {vehicle.map((item) => decodeURI(item.replacements)) != '' ?

                                    <ul className="list-unstyled text-uppercase danger info-list rowd d-block">
                                        <li className="m-0 w-100 d-block">
                                            <span className="label d-block py-3 px-3">REPLACEMENTS</span>
                                            <span className="data w-100">
                                                {vehicle.map((item) => decodeURI(item.replacements))}
                                            </span>
                                        </li>
                                    </ul>
                                    :
                                    <ul className="list-unstyled text-uppercase primary info-list">
                                        <li className="m-0 w-100">
                                            <span className="label d-block py-3 px-3">REPLACEMENTS</span>
                                            <span className="data w-100">
                                                No
                                            </span>
                                        </li>
                                    </ul>
                                }
                                <ul className="list-unstyled text-uppercase primary info-list">
                                    <li ><span className="label">ACCIDENT</span><span className="data">{vehicle.map((item) => decodeURI(item.accident))}</span></li>
                                </ul>
                                {vehicle.map((item) => decodeURI(item.status)) != 0
                                    ?
                                    <>
                                        <p className="mt-3 mb-2 fw-semibold">Customer Informations</p>
                                        <ul className="list-unstyled text-uppercase primary info-list">
                                            <li><span className="label">Name</span><span className="data">{vehicle.map((item) => decodeURI(item.customer_name))}</span></li>
                                            <li><span className="label">Phone</span><span className="data">{vehicle.map((item) => decodeURI(item.customer_phone))}</span></li>
                                            <li><span className="label">Place</span><span className="data">{vehicle.map((item) => decodeURI(item.customer_note))}</span></li>
                                        </ul>
                                    </>
                                    : null}


                                <div className="d-flex mb-2">
                                    {vehicle.map((item) => decodeURI(item.status)) == 0
                                        ?
                                       null // <Link href={`edit-vehicle?id=${vehicle.map((item) => decodeURI(item.id))}`} className="btn btn-primary-outline btn-sm w-100 py-2">Edit</Link>
                                        :
                                        null}
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <Offcanvas show={show} onHide={handleClose} placement={'bottom'}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Mark as sold</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <form onSubmit={sold} className="w-100">
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Customer Name"
                                        onChange={e => setcustomername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Phone"
                                        onChange={e => setCustomerphone(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Final price"
                                        onChange={e => setCustomerprice(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <textarea
                                        className="form-control"
                                        placeholder="Note"
                                        onChange={e => setCustomernote(e.target.value)}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg w-100">Sold</button>
                            </form>
                            
                        </Offcanvas.Body>
                    </Offcanvas>
                    
                    {vehicle.map((item) => decodeURI(item.status)) == 0
                        ?
                        <div className="fixed-bottom p-4 bg-white d-flex">
                             <button type="button" onClick={removeVehicle} className="btn btn-primary-outline rounded-pill me-2 btn-sm ms-2 w-100 py-2">Remove</button>
                            <button className="btn btn-primary  w-100" onClick={handleMarkSold}>Mark as sold</button>
                        </div>
                        :
                        null}
                 </div>
            </main>
        </>
    )
}

export default VehicleInfo