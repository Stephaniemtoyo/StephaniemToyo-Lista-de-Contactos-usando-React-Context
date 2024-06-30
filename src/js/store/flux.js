const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts:[],
			contact:{},
			contactToDelete:{}
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},

			seeContact: (contact) => {
				setStore({contact:contact})
			},

			setContactToDelete: (contact) => {
				setStore({contactToDelete:contact})

			},

			getAllContacts: () =>{
				fetch ('https://playground.4geeks.com/contact/agendas/DavidPadilla', {
					method: "GET",
				})
				.then((response)=> {
					if (response.status === 404) {
						createAgenda();
					}
					return response.json()
				})
				.then((data)=>{
					setStore({contacts:data.contacts});})
				.catch((error)=>{
					console.log(error)}
				)
				// console.log(response);
			},

			createAgenda: () =>{
				// console.log(fullName,email,address,phone);
			
				fetch ('https://playground.4geeks.com/contact/agendas/DavidPadilla', {
					method: "POST",
					headers: {
						"content-type": "application/json"
					}
				})
				.then((response)=>{

					return response.json()})
				.then((data)=>{

					console.log(data);})
				.catch((error)=>{
					console.log(error)}
				)
			},

			createContact: (fullName,email,phone,address) =>{
				// console.log(fullName,email,address,phone);
			
				fetch ('https://playground.4geeks.com/contact/agendas/DavidPadilla/contacts', {
					method: "POST",
					body: JSON.stringify(				
						{
						"name": fullName,
						"phone":phone,
						"email": email,
						"address":address
						
					}),
					headers: {
						"content-type": "application/json"
					}
				})
				.then((response)=>{

					return response.json()})
				.then((data)=>{
					console.log(data);})
				.catch((error)=>{
					console.log(error)}
				)
			},

			deleteContact: (id) =>{
				// console.log(fullName,email,address,phone);
			
				fetch ('https://playground.4geeks.com/contact/agendas/DavidPadilla/contacts/'+id, {
					method: "DELETE",
					headers: {
						"content-type": "application/json"
					}
				})
				.then((response)=>{

					return response.json()})
				.then((data)=>{
					getAllContacts();
					console.log(data);})
				.catch((error)=>{
					console.log(error)}
				)
			},

			editContact: (fullName,email,phone,address,id) =>{
				console.log(fullName,email,address,phone,id);
			
				fetch ('https://playground.4geeks.com/contact/agendas/DavidPadilla/contacts/'+id, {
					method: "PUT",
					body: JSON.stringify(				
						{
						"name": fullName,
						"phone":phone,
						"email": email,
						"address":address
						
					}),
					headers: {
						"content-type": "application/json"
					}
				})
				.then((response)=>{

					return response.json()})
				.then((data)=>{
					console.log(data);})
				.catch((error)=>{
					console.log(error)}
				)
			},


			// useEffect:()=>{
			// 	getAllContacts()
			// },[]),

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;

