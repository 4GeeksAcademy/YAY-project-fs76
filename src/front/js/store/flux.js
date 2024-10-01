const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
             token: null,
            message: null,
            auth: false,
            intereses: [],
            eventos: [],
            partners: [],
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
            ]
        },
        actions: {
            // Ejemplo de función que cambia el color
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            // Acción para obtener el mensaje desde el backend
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },
            getEntidades: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/entidades");
                    if (!resp.ok) {
                        throw new Error("Error fetching entidades, status: " + resp.status);
                    }
                    const data = await resp.json();
                    if (!Array.isArray(data)) {
                        throw new Error("Unexpected data format: expected an array of entidades");
                    }
                    setStore({ entidades: data });

                    return data;

             } catch (error) {
                  console.error("Error loading entidades from backend", error);
              return null; 
    }
},
          
signup: async (email, password) => {
    try {
        const response = await fetch("https://obscure-giggle-g4547qvxr79rfxr7-3001.app.github.dev/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            // Manejar el caso de error
            const errorData = await response.json();
            console.error("Error en el registro:", errorData);
            return false;
        }
                } catch (error) {
                    console.error("Error loading entidades from backend", error);
                    return null;
                }
            }

        return true; // Registro exitoso
    } catch (error) {
        console.error("Error en la solicitud de registro:", error);
        return false;
    }
},
            // Acción para obtener la lista de intereses desde el backend
            getInteres: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/interes");
                    const data = await resp.json();

                    if (resp.ok) {
                        // Guarda los intereses en el store
                        setStore({ intereses: data });
                    } else {
                        console.log("Error: ", data.message);
                    }

                    return data;
                } catch (error) {
                    console.log("Error loading interests from backend", error);
                }
            },

            // Acción para obtener un interés por ID
            getInteresById: async (id) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/interes/${id}`);
                    const data = await resp.json();

                    if (resp.ok) {
                        return data; // Retorna el interés encontrado
                    } else {
                        console.log("Error: ", data.message);
                    }

                    return null;
                } catch (error) {
                    console.log("Error loading interest from backend", error);
                }
            },

            // Acción para eliminar un interés por ID
            deleteInteres: async (id) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/interes/${id}`, {
                        method: "DELETE",
                    });

                    if (resp.ok) {
                        // Actualiza el store eliminando el interés de la lista
                        const store = getStore();
                        const updatedIntereses = store.intereses.filter(interes => interes.id !== id);
                        setStore({ intereses: updatedIntereses });
                    } else {
                        const data = await resp.json();
                        console.log("Error: ", data.message);
                    }
                } catch (error) {
                    console.log("Error deleting interest from backend", error);
                }
            },
            createInteres: async (newInteres) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/interes`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newInteres)
                    });

                    if (resp.ok) {
                        const data = await resp.json();
                        // Puedes optar por actualizar el store directamente o volver a obtener la lista de intereses
                        setStore((store) => ({ intereses: [...store.intereses, data] }));
                    } else {
                        const data = await resp.json();
                        console.log("Error: ", data.message);
                    }
                } catch (error) {
                    console.log("Error creating interest from backend", error);
                }
            },

            // Acción para editar un interés
            editInteres: async (id, updatedInteres) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/interes/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedInteres)
                    });

                    if (resp.ok) {
                        // Actualiza la lista de intereses después de la edición
                        actions.getInteres(); // Vuelve a obtener la lista actualizada
                    } else {
                        const data = await resp.json();
                        console.log("Error: ", data.message);
                    }
                } catch (error) {
                    console.log("Error editing interest from backend", error);
                }
            },

            addEvento: (newEvento, onSuccess, onError) => {
                fetch(process.env.BACKEND_URL + '/api/eventos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newEvento)
                })
                    .then(resp => resp.json())
                    .then(data => {
                        const store = getStore();
                        setStore({ eventos: [...store.eventos, data] });
                        onSuccess();
                    })
                    .catch(error => {
                        console.log(error);
                        onError();
                    });
            },

            loadEventos: () => {
                return fetch(process.env.BACKEND_URL + '/api/eventos')
                    .then(resp => {
                        console.log('Response:', resp);
                        return resp.json();
                    })
                    .then(data => {
                        console.log('Data:', data);
                        const store = getStore();
                        setStore({ ...store, eventos: data });
                        return data;
                    })
                    .catch(error => console.log(error));
            },

            deleteEvento: (eventoId) => {
                const store = getStore();
                const requestOptions = {
                    method: "DELETE",
                    redirect: "follow"
                };
                return fetch(`${process.env.BACKEND_URL}/api/eventos/${eventoId}`, requestOptions)
                    .then((resp) => {
                        console.log('Response:', resp);
                        return resp.text();
                    })
                    .then((data) => {
                        console.log('Data:', data);
                        const eventos = store.eventos.filter((evento) => evento.id !== eventoId);
                        setStore({ eventos: eventos });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },

            updateEvento: (theid, updatedEvento, onSuccess, onError) => {
                fetch(`${process.env.BACKEND_URL}/api/eventos/${theid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedEvento)
                })
                    .then(resp => resp.json())
                    .then(data => {
                        const store = getStore();
                        const updatedEventos = store.eventos.map(evento =>
                            evento.id === updatedEvento.id ? updatedEvento : evento
                        );
                        setStore({ eventos: updatedEventos });
                        onSuccess();
                    })
                    .catch(error => {
                        console.log(error);
                        onError();
                    });
            },

            signupPartner: (email, password) => {
                console.log("Signup Partner desde flux")
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({
                        "email": email,
                        "password": password
                    })
                };
                fetch(process.env.BACKEND_URL + "/api/partner-signup", requestOptions)
                    .then(response => {
                        if (response.status === 200) {
                            const store = getStore();
                            const newPartner = { email };
                            setStore({
                                partners: [...store.partners, newPartner],
                            });
                        }
                        return response.json()
                    })
                    .then(data => {
                        console.log(data)
                        localStorage.setItem("token", data.access_token);
                        setStore({ auth: true, message: null });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            },

            checkPartnerExists: (email) => {
				return fetch(process.env.BACKEND_URL + "/api/checkPartner", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8'
					},
					body: JSON.stringify({ email })
				})
				.then(response => response.json())
				.then(data => data.exists);
			},

            changeColor: (index, color) => {
                const store = getStore();

                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                // Actualiza el store con los nuevos colores
                setStore({ demo: demo });
            }
        }
    };
};

export default getState;
