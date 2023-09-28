'use client'
import Link from "next/link";
import Brand from "./Brand"
import { useRouter } from 'next/navigation';





function Header(props) {

    const router = useRouter();

    //HEADER TYPES

function HeaderSelector(type) {
    let header;
    switch (type) {
        case 0:
            header = <header className="primary curved">
                <div className="container-fluid my-3">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between">
                            <Brand
                                image=""
                                size="small"
                            />
                            <div className="welcome-message d-flex d-flex align-items-center justify-content-center">
                                <p className="m-0">Hi, {props.welcome}</p>
                                <Link href={props.profilelink} className="letter-info d-flex d-flex align-items-center justify-content-center ms-3">
                                    <img src={props.image} className="w-100 d-block" alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row mt-5 mb-3">
                        <div className="col-xl-12">
                            <input type="text" className="form-control" placeholder="Search vehicles" />
                        </div>
                    </div> */}
                </div>
            </header>
            break;
        case 1:
            header = <header className="primary">
                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between">
                            <button onClick={() => router.back()} className="btn btn-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                    <path d="M5.87565 9.39595C5.91404 9.42789 5.94483 9.4664 5.96618 9.50919C5.98753 9.55198 5.99901 9.59817 5.99994 9.64501C6.00087 9.69185 5.99122 9.73837 5.97157 9.78181C5.95192 9.82525 5.92267 9.8647 5.88557 9.89783C5.84847 9.93095 5.80428 9.95707 5.75563 9.97461C5.70698 9.99216 5.65488 10.0008 5.60242 9.99995C5.54996 9.99912 5.49822 9.98887 5.4503 9.9698C5.40238 9.95074 5.35924 9.92325 5.32348 9.88897L0.114259 5.23781C0.0410954 5.1724 0 5.08374 0 4.9913C0 4.89886 0.0410954 4.81019 0.114259 4.74479L5.32348 0.093624C5.39754 0.0320054 5.49549 -0.00154017 5.59671 5.43476e-05C5.69793 0.00164887 5.7945 0.038259 5.86608 0.102172C5.93766 0.166085 5.97866 0.252311 5.98045 0.342683C5.98223 0.433056 5.94466 0.52052 5.87565 0.586647L0.943175 4.9913L5.87565 9.39595Z" fill="white" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-12">
                            <h5 className="heading text-white">{props.heading}</h5>
                        </div>
                    </div>
                </div>
            </header>
            break;
        case 2:
            header = <header>
                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center">
                            <button onClick={() => router.back()} className="btn btn-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                    <path d="M5.87565 9.39595C5.91404 9.42789 5.94483 9.4664 5.96618 9.50919C5.98753 9.55198 5.99901 9.59817 5.99994 9.64501C6.00087 9.69185 5.99122 9.73837 5.97157 9.78181C5.95192 9.82525 5.92267 9.8647 5.88557 9.89783C5.84847 9.93095 5.80428 9.95707 5.75563 9.97461C5.70698 9.99216 5.65488 10.0008 5.60242 9.99995C5.54996 9.99912 5.49822 9.98887 5.4503 9.9698C5.40238 9.95074 5.35924 9.92325 5.32348 9.88897L0.114259 5.23781C0.0410954 5.1724 0 5.08374 0 4.9913C0 4.89886 0.0410954 4.81019 0.114259 4.74479L5.32348 0.093624C5.39754 0.0320054 5.49549 -0.00154017 5.59671 5.43476e-05C5.69793 0.00164887 5.7945 0.038259 5.86608 0.102172C5.93766 0.166085 5.97866 0.252311 5.98045 0.342683C5.98223 0.433056 5.94466 0.52052 5.87565 0.586647L0.943175 4.9913L5.87565 9.39595Z" fill="#0B0328" />
                                </svg>
                            </button>
                            <h5 className="heading ms-4 m-0">{props.heading}</h5>
                        </div>
                    </div>
                </div>
            </header>
            break;
        case 3:
            header = <header>
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-12 d-flex align-items-center">
                        <h5 className="heading m-0">{props.heading}</h5>
                    </div>
                </div>
            </div>
        </header>
        break;
        case 4:
            case 1:
            header = <header>
                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between">
                            <button onClick={() => router.back()} className="btn btn-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                    <path d="M5.87565 9.39595C5.91404 9.42789 5.94483 9.4664 5.96618 9.50919C5.98753 9.55198 5.99901 9.59817 5.99994 9.64501C6.00087 9.69185 5.99122 9.73837 5.97157 9.78181C5.95192 9.82525 5.92267 9.8647 5.88557 9.89783C5.84847 9.93095 5.80428 9.95707 5.75563 9.97461C5.70698 9.99216 5.65488 10.0008 5.60242 9.99995C5.54996 9.99912 5.49822 9.98887 5.4503 9.9698C5.40238 9.95074 5.35924 9.92325 5.32348 9.88897L0.114259 5.23781C0.0410954 5.1724 0 5.08374 0 4.9913C0 4.89886 0.0410954 4.81019 0.114259 4.74479L5.32348 0.093624C5.39754 0.0320054 5.49549 -0.00154017 5.59671 5.43476e-05C5.69793 0.00164887 5.7945 0.038259 5.86608 0.102172C5.93766 0.166085 5.97866 0.252311 5.98045 0.342683C5.98223 0.433056 5.94466 0.52052 5.87565 0.586647L0.943175 4.9913L5.87565 9.39595Z" fill="white" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <h5 className="heading text-white">{props.heading}</h5>
                        </div>
                    </div>
                </div>
            </header>
            break;
            case 5:
                header = <header className="primary">
                    <div className="container-fluid mt-3 text-center">
                        <div className="row my-5">
                            <div className="col-12">
                                <h5 className="heading text-white">{props.heading}</h5>
                            </div>
                        </div>
                    </div>
                </header>
               
      }

    return header
}


    return (
        HeaderSelector(props.type)
    )
}


export default Header