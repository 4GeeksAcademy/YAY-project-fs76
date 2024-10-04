const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
            message: null,
            auth: false,
            intereses: [],
            eventos: [],
            entidades: [],
            partners: [],
            inscripciones: [],
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
            setStore: (newStore) => {
                setStore((prevStore) => ({
                    ...prevStore,
                    ...newStore,
                }));
            },
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
                  throw error;
                }
              },
    
         
            updateEntidad: async (id, updatedEntidad) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/entidades/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedEntidad)
                    });
                    if (resp.ok) {
                        // Actualiza la lista de intereses después de la edición
                        actions.getEntidades(); 
                    } else {
                        const data = await resp.json();
                        console.log("Error: ", data.message);
                    }
                } catch (error) {
                    console.log("Error editing interest from backend", error);
                }
            },


              createEntidad: async (newEntidades) => {
                try {
                  const resp = await fetch(`${process.env.BACKEND_URL}/api/entidades`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newEntidades)
                  });
                  const data = await resp.json();
                  setStore(store => ({ entidades: [...store.entidades, data] }));
                } catch (error) {
                  console.log(error);
                }
              },

              deleteEntidad: async (id) => {
                try {
                  const resp = await fetch(`${process.env.BACKEND_URL}/api/entidades/${id}`, {
                    method: "DELETE",
                  });
                  if (resp.ok) {
                    setStore(store => ({ entidades: store.entidades.filter(entidad => entidad.id !== id) }));
                  } else {
                    const data = await resp.json();
                    console.log("Error: ", data.message);
                  }
                } catch (error) {
                  console.log("Error deleting entidad from backend", error);
                }
              },



            createInteres: async (newEntidades) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/entidades`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newEntidades)
                    });

                    if (resp.ok) {
                        const data = await resp.json();
                        // Puedes optar por actualizar el store directamente o volver a obtener la lista de intereses
                        setStore((store) => ({ Entidades: [...store.entidades, data] }));
                    } else {
                        const data = await resp.json();
                        console.log("Error: ", data.message);
                    }
                } catch (error) {
                    console.log("Error creating interest from backend", error);
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
                        console.log(data);
                        localStorage.setItem("token", data.access_token);
                        setStore({ message: null, partnerId: data.partner_id });
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

            loginPartner: (email, password) => {
                console.log("Login Partner desde flux");
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                    body: JSON.stringify({ "email": email, "password": password })
                };
                fetch(process.env.BACKEND_URL + "/api/partner-login", requestOptions)
                    .then(response => {
                        if (response.status === 200) {
                            setStore({ auth: true });
                            return response.json();
                        } else {
                            console.log("El correo electrónico o la contraseña son incorrectos")

                        }
                    })
                    .then(data => {
                        if (data.access_token) {
                            localStorage.setItem("token", data.access_token);
                            console.log("Inicio de sesión de Partner correcto", "token", data.access_token);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            },

            completePartner: (theid, newPartner, onSuccess, onError) => {
                fetch(`${process.env.BACKEND_URL}/api/completar-perfil-partner/${theid}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newPartner)
                })
                    .then(resp => resp.json())
                    .then(data => {
                        const store = getStore();
                        setStore({auth: true, partners: [...store.partners, data] });
                        onSuccess();
                    })
                    .catch(error => {
                        console.log(error);
                        onError();
                    });
            },

            signup: async (email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, password }),
                    });
            
                    if (response.ok) {
                        const data = await response.json();
                        console.log("Usuario registrado exitosamente", data);
                        return true; // Registro exitoso
                    } else {
                        const errorData = await response.json();
                        console.error("Error en el registro:", errorData);
                        return false; // Registro fallido
                    }
                } catch (error) {
                    console.error("Error en la solicitud de registro:", error);
                    return false; // Error en el registro
                }
            },
            loginUser: async (email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/login", { // Asegúrate de que esta URL sea correcta
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });
            
                    if (response.ok) {
                        const data = await response.json();
                        sessionStorage.setItem("token", data.access_token); // Guardar el token en sessionStorage
                        setStore({ token: data.access_token, auth: true }); // Guardar el token y cambiar auth a true
                        return true; // Indicar que el login fue exitoso
                    } else {
                        const errorData = await response.json();
                        console.error("Error en el login:", errorData);
                        return false; // Indicar que el login falló
                    }
                } catch (error) {
                    console.error("Error en login", error);
                    return false; // Error en el login
                }
            },
                        

            logout: () => {
				console.log("Logout desde flux")
				localStorage.removeItem("token");
				setStore({ auth: false })
			},

            inscribirse: async (usuarioId, eventoId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/inscripciones`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            usuario_id: usuarioId,
                            evento_id: eventoId,
                            fecha_registro: new Date().toISOString(),
                        }),
                    });
                    
                    const data = await resp.json();
                    
                    if (resp.ok) {
                        console.log('Inscripción creada:', data);
                        console.log('ID de inscripción:', data.id); // Añadir esto para verificar el ID
                        return data.id; // Asegúrate de que 'data' contenga el ID
                    } else {
                        console.log("Error: ", data.message);
                        return null; // O lanza un error si prefieres
                    }
                } catch (error) {
                    console.error("Error inscribiendo al usuario:", error);
                    return null; // O lanza un error si prefieres
                }
            },
        
            desapuntarse: (inscripcionId) => {
                fetch(`${process.env.BACKEND_URL}/api/inscripciones/${inscripcionId}`, {
                    method: 'DELETE',
                })
                .then(resp => {
                    if (resp.ok) {
                        console.log('Inscripción eliminada');
                        // Actualiza el store para eliminar la inscripción
                        setStore(prevStore => ({
                            ...prevStore,
                            inscripciones: prevStore.inscripciones.filter(inscripcion => inscripcion.id !== inscripcionId), // Asegúrate de que 'id' sea la propiedad correcta
                        }));
                    } else {
                        return resp.json().then(data => {
                            console.log("Error: ", data.message);
                        });
                    }
                })
                .catch(error => {
                    console.error("Error desapuntando al usuario:", error);
                });
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
