import { useParams } from 'react-router-dom'


function Listing() {
  
     const {id}=useParams()

  return (
    <div>
         <p>This is the listing page for listing  with id {id} </p>
    </div>
  )
}

export default Listing
