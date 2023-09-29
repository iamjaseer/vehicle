
'use client'
import { useEffect, useState, } from "react";
import axios from "axios";
import Link from "next/link";
import Header from "@/component/Header";
import BottomNav from "@/component/BottomNav";
import { signIn, signOut, useSession } from 'next-auth/react'
import Card from "@/component/Card";
import { useRouter } from 'next/navigation';

function Sold() {

    const router = useRouter();
    const session =useSession();
    //console.log(session)

    const name =  session.status ==="authenticated" ? session.data.user.name : null
    const email =  session.status ==="authenticated" ? session.data.user.email : null
    const image =  session.status ==="authenticated" ? session.data.user.image : null


    //ALL VEHICLES

    const [vehicles, setVehicles] = useState([]);

    function getAllVehicles() {
        axios.get(`https://iamjaseer.in/usedvehicle/sold.php/${email}/1`).then(function (response) {
            console.log(response.data);
            setVehicles(response.data);
        });
    }




   



    useEffect(() => {
        getAllVehicles()
    }, []);

   
    return (
        <>

          <main className='profile'>
                <div className="content">
                    <Header
                        type={0}
                        heading="Add vehicles"
                        image={image}
                        welcome={name}
                        business=""
                        profilelink={"/profile"}
                    />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <Link href="/add-vehicle" className="btn btn-outline-primary dotted w-100 my-4">Add vehicle</Link>
                                <div className="card-wrpr">
                                      {vehicles.map((item, k) => 
                                    <Card
                                    key={k}
                                        link="/vehicle-info"
                                        price={item.price}
                                        title={item.title}
                                        make={item.make}
                                        photo={item.photo}
                                        id={item.id}
                                        status={item.status}
                                    />
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                    <BottomNav
                        items={[
                            {
                                'icon': <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path d="M240,112H229.2L201.42,49.5A16,16,0,0,0,186.8,40H69.2a16,16,0,0,0-14.62,9.5L26.8,112H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V192h96v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V128h8a8,8,0,0,0,0-16ZM69.2,56H186.8l24.89,56H44.31ZM216,208H192V184a8,8,0,0,0-8-8H72a8,8,0,0,0-8,8v24H40V128H216Z"></path></svg>,
                                'heading': 'New',
                                'active': 'bg-primary text-white',
                                'link': '/stock'
                            },
                            {
                                'icon': <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path></svg>,
                                'heading': 'Sold',
                                'active': '',
                                'link': '/sold'
                            },
                        ]}
                    />
                </div>
            </main>
        </>
    )
}

export default Sold