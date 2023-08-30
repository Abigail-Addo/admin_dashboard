window.addEventListener('load', () => {

    async function getAllEmployees() {
        const results = await fetch('https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/employer/1')
        const response = await results.json();
        // console.log(response); //Fetch ends here
        // get the employees in employer 1
        const employees = response.employee;
        console.log(employees);


        // const tableBody = document.querySelector('tbody');

        const tbody = document.querySelector('tbody');
        let tContents = '';


        employees.forEach(employee => {
            tContents += `
            <tr class="wrapper">
            <td>${employee.name}</td>
            <td>${employee.job_title}</td>
            <td>${employee.email}</td>
            <td>
            <span>
            <i class="fas fa-edit" edit-id="${employee.id}"> </i>
            <i class="fas fa-trash" delete-id="${employee.id}"> </i>
            </span>
            </td>
            </tr>
            `;
            tbody.innerHTML = tContents;
        });
            // delete icon event listener 
        const deleteBtns = document.querySelectorAll('.fa-trash');
        deleteBtns.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', async (e) => {
                const employeeId = deleteBtn.getAttribute('delete-id');
                console.log(employeeId);
                try {
                    let confirmed = confirm(`Are you sure you want to delete employee ${employeeId}`);
                    if (confirmed === true) {
                        const result = await fetch(`https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/employee/${employeeId}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });    // fetch ends here
                        if (result.status === 200 || result.status === 201) {
                            console.log("Deleted successfully");
                            
                            const usr =   e.target.parentElement.parentElement;
                            const user = usr.parentElement;
                            user.classList.add('remove-deleted');
                            user.addEventListener('transitionend', () =>{
                                user.remove();
                            })
                        }
                        return true;
                    }
                } catch(error) {
                    console.error(error);
                }
            });
        });        

            // edit icon event listener 
        const editBtns = document.querySelectorAll('.fa-edit');
        editBtns.forEach(editBtn => {
            editBtn.addEventListener('click', async () => {

                const modal = document.querySelector('.modal');
                const employeeId = editBtn.getAttribute('edit-id');
                // console.log(employeeId);

                // try {
                    let confirmed = confirm(`Are you sure you want to update employee ${employeeId}`);

                    
                    if (confirmed === true) {
                        modal.style.display = "flex";
                //         const result = await fetch(`https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/employer/${employeeId}`)
                //         // console.log(result);
                //         // const response = await result.json();
                //         // console.log(response);

                //         // const employees = response.employee
                //         // console.log(employees);
                //         // fetch ends here
                        
                //         document.body.appendChild(modal);

                //         // window.location.href = `./update.html?id=${response.id}&firstname=${response.firstname}&lastname=${response.lastname}
                //         // &email=${response.email}&school=${response.school}&contact=${response.contact}`
                        
                //         return true;
                //     }
                // } catch(error) {
                //     console.error(error);
                }
            });
        });
               
    } getAllEmployees();

    // toggler
    const light_mode = document.querySelector("div.theme-toggler span.light_mode");
    const dark_mode = document.querySelector("div.theme-toggler span.dark_mode");

    dark_mode.addEventListener('click', () => {
        document.body.classList.add('dark-theme-variables');
        dark_mode.classList.add('active');
        light_mode.classList.remove('active');
    });

    light_mode.addEventListener('click', () => {
        document.body.classList.remove('dark-theme-variables');
        dark_mode.classList.remove('active');
        light_mode.classList.add('active');
    });


})

  // table row
            // const tableRow = document.createElement('tr');

            // // table names
            // const names = document.createElement('td');
            // names.textContent = employee.name;
            // tableRow.appendChild(names);

            // // table jobs
            // const jobs = document.createElement('td');
            // jobs.textContent = employee.job_title;
            // tableRow.appendChild(jobs);

            // // table email
            // const emails = document.createElement('td');
            // emails.textContent = employee.email;
            // tableRow.appendChild(emails);

            // tableBody.appendChild(tableRow);

            // // edit icon
            // const edit_icon = document.createElement('td');
            // const editIcon = document.createElement('i');
            // editIcon.classList.add('fas', 'fa-edit');
            // edit_icon.appendChild(editIcon);
            // tableRow.appendChild(edit_icon);

            // // delete icon
            // const delete_icon = document.createElement('td');
            // const deleteIcon = document.createElement('i');
            // deleteIcon.classList.add('fas', 'fa-trash');
            // delete_icon.appendChild(deleteIcon);
            // tableRow.appendChild(delete_icon);

            // deleteIcon.addEventListener('click', () => {
            //     let confirmed = confirm(`Are you sure you want to delete user ${employee.id}?`)

            //     if (confirmed === true) {
            //         fetch(`https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/employee/${employee.id}`, {
            //             method: 'DELETE',
            //             headers: {
            //                 'Content-Type': 'application/json'
            //             }
            //         })  
            //         // fetch ends here

            //             .then((employees) => {
            //                 if (employees.status === 200 || employees.status === 201) {
            //                     // console.log("delete successful")
            //                     alert("delete successful")
            //                     deleteIcon.remove();
            //                 }
            //             })
            //             .catch((err) => {
            //                 console.log(err)
            //             })
            //     }
            // });

            // show employees
            // const displayEmployees = employees.slice(0, 5);
            // console.log(displayEmployees);

            // const show = document.querySelector('.show');
            // show.addEventListener('click', (e) => {
            //     e.preventDefault();

            // alert('hello')
            // })

            // const { employee } = response;
            // console.log(employee);
