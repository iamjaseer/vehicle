import Link from "next/link"




function Card(props) {

    const formattedNumber = props.price.replace(/.(?=(..)*...$)/g, '$&,');

    return (
        <>

            <Link href={`${props.link}?id=${props.id}`} className="card-">
                <div className="photo position-relative overflow-hidden">
                    {props.status == 1 ? <div className="price">SOLD</div> : <div className="price">₹ {formattedNumber}</div>}
                    <img src={`https://iamjaseer.in/usedvehicle/uploads/${props.photo.split(',')[0]}`} className="w-100 d-block" alt="" />
                </div>
                <div className="content">
                    <p className="title m-0">{decodeURI(props.title)}</p>
                    <small className="brand">{decodeURI(props.make)}</small>
                </div>
            </Link>
        </>
    )
}


export default Card