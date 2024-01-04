document.getElementById("resetpass").addEventListener("submit", (e) => {
   e.preventDefault();
   const email = document.getElementById("email").value;
   const data = {
      email: email
  };


     try {
        fetch("http://localhost:8090/user/reset",{
        method: "POST",
        headers : {"Content-Type":"application/json"},
        body: JSON.stringify(data)
        })
        .then((res)=> res.json())
        .then((data)=> console.log(data))
     } catch (error) {
        console.log(error.message)
     }
})