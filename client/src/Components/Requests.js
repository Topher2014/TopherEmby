import { useState, useEffect } from 'react'

function Requests({groupID}) {
    const [requests, setRequests] = useState([])
    
    useEffect(() => {
        if (groupID)
        fetch(`/groups/${groupID}/requests`).then(res => res.json()).then(data => setRequests(data))
    }, [groupID])
    const renderRequests = requests.map((request) => {
        let type = ''
        if (request.type === 'movie') {
        type = request.type.charAt(0).toUpperCase() + request.type.slice(1)
            console.log(request.type)
        }
        else if (request.type === 'tv') {
        type = 'Show'
            console.log(request.type)
        }
        return (
            <div key={request.id} >
                <ul className='requestcard' >
                    <li>
                        <h4> {type} {request.name} {request.quality} </h4>
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