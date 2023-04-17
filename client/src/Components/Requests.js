import { useState, useEffect } from 'react'

function Requests({groupID}) {
    const [requests, setRequests] = useState([])
    
    useEffect(() => {
        if (groupID)
        fetch(`/groups/${groupID}/requests`).then(res => res.json()).then(data => setRequests(data))
    }, [groupID])
    const renderRequests = requests.map((request) => {
        return (
            <div key={request.id} >
                <ul className='requestcard' >
                    <li>
                        <h4> {request.type} {request.name} {request.quality} </h4>
                    </li>
                </ul>
            </div>
        )
    })

    return (
        <div>
        <h1> Requests </h1>
        <h4> {renderRequests} </h4>
        </div>
    )
}

export default Requests