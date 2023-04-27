import {useState} from "react";



function User(){
   const [username, setUsername]= useState("");
   const [userId, setUserId]= useState(0);
   const [show, setShow]= useState(false);
   const [user, setUser]= useState({});

  const handleSubmit=(e)=> {
    e.preventDefault();

     fetch("https://test-backend-rho.vercel.app", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            userId
        })
     })
     .then(res=> res.json())
     .then(res=> {
        if(res.message === "User does not exist"){
            alert("Invalid username/userId")
            return;
        }
        else{
                console.log({"profile": res})
                setUser(res);
                setShow(true);
        }
     })
     .catch(err=> console.log(err));

  }

    return(
        <div>
            <h3>Fill the form below to log in</h3>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <input required type="text" placeholder="Enter username!" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                <input required type="number" placeholder="Enter your userId!" value={userId} onChange={(e)=> setUserId(e.target.value)}/>
                <p><button>Authenticate</button></p>
            </form>

            {show && (<div>
                 <h3>User details</h3>
                 <h4>Name: {user.user.name}</h4>
                 <p>Username: {user.user.username}</p>
                 <p>UserId: {user.user.userId}</p>
                 <p>Code: {user.key}</p>
            </div>)
            }
        </div>
    )
}

export default User;