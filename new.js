console.log('response.js is working')


async function getAllUsers() {
  let wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
                            

  const result = await fetch('https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/all-users');
  // const result = await fetch('http://localhost:9090/api/ordabl/all-users');
  const response = await result.json()
  console.log('response from server ')
    
    let cnFluid = document.createElement('div');
    cnFluid.classList.add('container-fluid');

    let profile = '';
  
     response.forEach(user => {

      profile += `
      
  

      <div class="user">
      <div class="control">
          <div class="name">
          <h3>${user.firstname} ${user.lastname}</h3>
          </div>
          <div class="edit-delete">
          <span class="material-symbols-outlined edit" id=${user.id}> edit</span>
          <span class="material-symbols-outlined delete" id=${user.id} > delete</span>
        </div>
      
          </div>
          <div class="info">

          <div class="email">
          <h3>${user.email}</h3>
          </div>
          <div class="school ">
              <h3>${user.school}</h3>
          </div>
          <div class="contact">
              <h3>${user.contact}</h3>
          </div>
          </div>
          
          </div>
          `;

    })

    cnFluid.innerHTML = profile;
    wrapper.appendChild(cnFluid)

  const deleteBtn = wrapper.querySelectorAll('.edit-delete .delete')
  // console.log(deleteBtn)
  deleteBtn.forEach(btn => {
    //------------- confirm method ----------
    btn.addEventListener('click', (e) => {
     let  confirmed = confirm("you about to delete user with id  " + btn.id);

     if(confirmed  === true) {
      fetch(`https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/profile/${btn.id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }})//fetch ends here
        .then((response )=> {
          if(response.status == 200 || response.status == 201){
            //code comes here
            console.log('deleted successfully')

            const usr =   e.target.parentElement.parentElement;
            const user = usr.parentElement;
            user .classList.add('remove-deleted');
            user.addEventListener('transitionend', () =>{
              user.remove();
            })


            return true;
           }
           return false;

        } )
        .catch((err )=> {
            console.log(err)
        })
     }

     })
})


const editBtn = wrapper.querySelectorAll('.edit-delete .edit')
editBtn.forEach(btn => {
  btn.addEventListener('click', async (e) => {
    try {

      alert('attempting to edit/update user with id ' +  btn.id);
      
      const profile = await fetch(`https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/user/${btn.id}`)
      
      let response = await profile.json()
      console.log(response);
        
       window.location.href = `./update.html?id=${response.id}&firstname=${response.firstname}&lastname=${response.lastname}
       &email=${response.email}&school=${response.school}&contact=${response.contact}`
        
        return true;
    }catch(error) {
            console.error(error)
        }

  })
})

        


document.body.appendChild(wrapper);
}


 getAllUsers();

const gBack = document.querySelector('.header .logout');

gBack.addEventListener('click', () => {
  window.location.href = './index.html'
})