import { Link } from "react-router-dom";

export default function DeleteInfo() {
  return (
    <div>
        <h2>Account deleted successfully</h2>
        <Link to="/sign-up">
           <span  className="hover:underline text-blue-600" >Go to sign up page</span>
        </Link>
    </div>
  )
}
