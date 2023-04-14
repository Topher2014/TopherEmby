import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Requests() {
    const {groupId} = useParams()
    const [requests, setRequests] = useState([])
    
    useEffect(() => {
        fetch(`/groups/${groupId}/requests`).then(res => res.json()).then(data => setRequests(data))
    }, [groupId])
    // Ask Emiley
    console.log(requests)
    const renderRequests = requests.map((request) => {
            console.log(request)
        return (
            <div>
                <ul className='requestcard' key={request.id}>
                    <li key={request.id}>
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