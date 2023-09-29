import Link from "next/link"


function BottomNav(props) {

    const items = props.items
    return (
        <>
        <div className="bottom-nav d-flex">
            {items.map(function (item, k) {
                return <Link key={k} href={item.link} className={`btn w-100 py-3 rounded-0 ${item.active}`}>{item.icon} {item.heading}</Link>
            })}
            </div>
        </>
    )
}


export default BottomNav