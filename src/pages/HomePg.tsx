import { useNavigate } from "react-router-dom"

const HomePg = () => 
{
    const navigator = useNavigate()
    return (
        <div>
            <h1>Home</h1>
            <button 
            className="w-20 h-20 bg-lime-700 "
            onClick={() => navigator("/signup")}>Signup</button>
        </div>
    )
}

export default HomePg