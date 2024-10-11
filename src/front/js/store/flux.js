const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            foto_perfil:null,
            token: null,
            message: null,
            auth: false,
            user_id: null, // Agrega el user_id aquí
            inscripcion_id: null,
            partner_id: null,
            public_id_perfil:null,
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
            setUserId: (user_id) => {
                setStore((prevStore) => ({
                    ...prevStore,
                    user_id, // Almacenar el user_id en el estado global
                }));
            },
        
            setStore: (newStore) => {
                setStore((prevStore) => ({
                    ...prevStore,
                    ...newStore, // Actualizar el estado global con el nuevo store
                }));
            },
            setAuthState: ({ auth, token, user_id }) => {
                setStore({
                    auth: auth,
                    token: token,
                    user_id: user_id,
                });
            
                // También guarda en localStorage si es necesario
                localStorage.setItem("auth", auth);
                localStorage.setItem("token", token);
                localStorage.setItem("user_id", user_id);
            },

            getUserId: () => {
                const store = getStore(); 
                if (store.user_id) {
                    return store.user_id; 
                }
                const userIdFromLocalStorage = localStorage.getItem("user_id");
                return userIdFromLocalStorage ? userIdFromLocalStorage : null; 
            },
            getInscripcionId: () => {
                const store = getStore(); 
                return store.inscripcion_id; 
            },

            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getPartnerIdFromToken(token) {
                const decodedToken = jwtDecode(token);
                return decodedToken.partner_id;
            },

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
                const token = localStorage.getItem('token');
                const partnerId = localStorage.getItem("partner_id");; // función para obtener el ID del partner desde el token
            
                const evento = {
                    ...newEvento,
                    partner_id: partnerId
                };
            
                fetch(process.env.BACKEND_URL + '/api/eventos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // envía el token de autenticación en la cabecera
                    },
                    body: JSON.stringify(evento)
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
                console.log("Signup Partner desde flux");
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
                        // Maneja la respuesta
                        if (!response.ok) {
                            throw new Error('Error en la creación de la cuenta');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        // Guardar el token y el partner_id en localStorage
                        localStorage.setItem("token", data.access_token);
                        localStorage.setItem("partner_id", data.partner_id);
                        
                        // Actualiza el store
                        const store = getStore();
                        const newPartner = { email, partner_id: data.partner_id }; // Asegúrate de incluir el partner_id
                        setStore({
                            partners: [...store.partners, newPartner],
                            message: null, // Restablecer el mensaje de error, si existe
                            partnerId: data.partner_id // Almacenar el partnerId en el store
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // Aquí puedes manejar el error y establecer un mensaje en el store si es necesario
                        setStore({ message: "Error al crear la cuenta. Inténtalo de nuevo." });
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

            loginPartner: async (email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/partner-login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });
            
                    if (response.ok) {
                        const data = await response.json();
                        console.log("Datos recibidos:", data);
                        console.log(data.partner_id);
            
                        // Actualizar el store con los datos del partner y token
                        setStore({ auth: true, partner_id: data.partner_id, token: data.access_token });
            
                        // Guardar auth, token y partner_id en localStorage
                        localStorage.setItem("auth", "true");
                        localStorage.setItem("token", data.access_token);
                        localStorage.setItem("partner_id", data.partner_id);
                        return true;
                    } else {
                        const errorData = await response.json();
                        console.error("Error en el login de Partner:", errorData);
                        return false;
                    }
                } catch (error) {
                    console.error("Error en login de Partner", error);
                    return false;
                }
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
       

            getPartnerProfile: async (partnerId) => {
                try {
                    // Si no se proporciona el partnerId, lo obtenemos desde el token
                    if (!partnerId) {
                        const token = localStorage.getItem("token");
            
                        if (token) {
                            // Decodificamos el token y obtenemos el partnerId
                            const decodedToken = jwt_decode(token);
                            partnerId = decodedToken.partnerId; // Cambia 'partnerId' según el nombre exacto del campo en tu token
                            console.log("Partner ID desde el token:", partnerId);
                        } else {
                            console.error("No se encontró un token en localStorage.");
                            return null;
                        }
                    }
            
                    if (partnerId) {
                        const url = `${process.env.BACKEND_URL}/api/partners/${partnerId}`;
            
                        const token = localStorage.getItem("token");
                        const response = await fetch(url, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            }
                        });
            
                        if (response.ok) {
                            const data = await response.json();
                            console.log("Datos del partner obtenidos exitosamente", data);
                            return data;
                        } else {
                            const errorData = await response.json();
                            console.error("Error al obtener los datos del partner:", errorData);
                            return null;
                        }
                    } else {
                        console.error("partnerId no fue proporcionado.");
                        return null;
                    }
                } catch (error) {
                    console.error("Error en la solicitud de obtener datos del partner:", error);
                    return null;
                }
            },
            updatePartnerProfile: (theid, updatedPartner, onSuccess, onError) => {
                fetch(`${process.env.BACKEND_URL}/api/partners/${theid}`, {
                    method: 'PUT', // Método PUT para actualizar el perfil
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedPartner)
                })
                .then(resp => resp.json())
                .then(data => {
                    const store = getStore();
                    setStore({
                        partners: store.partners.map(partner => partner.id === data.id ? data : partner)
                    });
                    onSuccess();
                })
                .catch(error => {
                    console.error(error);
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
            
                        // Verificar si se recibió un token y un user_id en la respuesta
                        if (data.access_token && data.user_id) {
                            // Guardamos el estado de autenticación y los datos en localStorage
                            localStorage.setItem("auth", "true");
                            localStorage.setItem("token", data.access_token); // Guardamos el token
                            localStorage.setItem("user_id", data.user_id); 
                            localStorage.setItem("usuario_id", data.user_id); 
            
                            console.log("Token y ID del usuario guardados en localStorage");
            
                            // Actualizamos el estado de autenticación en el store global
                            setStore({
                                auth: true,  // Cambiamos el estado de auth a true
                                token: data.access_token,  // Guardamos el token
                                user_id: data.user_id  // Guardamos el user_id
                            });
            
                            return {
                                success: true,
                                user_id: data.user_id
                            };
                        } else {
                            console.error("No se recibieron todos los datos necesarios (token o user_id)", data);
                            return false; // Registro exitoso, pero faltan datos
                        }
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
            
            completarDatos: async (userId, nombre, apellidos, fecha_nacimiento, direccion, latitud, longitud, breve_descripcion) => {
                try {
                    // Construir la URL de la API usando el userId proporcionado
                    const url = `${process.env.BACKEND_URL}/api/usuarios/${userId}`;
                    console.log("URL del fetch:", url);
                    
                 
                    const response = await fetch(url, {
                        method: "PUT", 
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${sessionStorage.getItem('token')}` 
                        },
                        body: JSON.stringify({
                            nombre,
                            apellidos,
                            fecha_nacimiento,
                            direccion,
                            latitud,
                            longitud,
                            breve_descripcion
                        }), 
                    });
            
                  
                    if (response.ok) {
                        const data = await response.json(); // Parsear la respuesta a JSON
                        console.log("Datos del usuario actualizados exitosamente", data);
                        return true; 
                    } else {
                        const errorData = await response.json(); 
                        console.error("Error al actualizar los datos del usuario:", errorData);
                        return false; 
                    }
                } catch (error) {
                    console.error("Error en la solicitud de actualización de datos:", error);
                    return false; 
                }
            },

            updateProfile: async (userId, nombre, apellidos, fecha_nacimiento, direccion,latitud,longitud,breve_descripcion,intereses) => {
                try {
                  
                  const url = `${process.env.BACKEND_URL}/api/usuarios/${userId}`;
                  console.log("URL del fetch:", url);
                  const response = await fetch(url, {
                    method: "PUT", 
                    headers: {
                      "Content-Type": "application/json", 
                      Authorization: `Bearer ${sessionStorage.getItem('token')}` 
                    },
                    body: JSON.stringify({
                      nombre,
                      apellidos,
                      fecha_nacimiento,
                      direccion,
                      latitud,
                      longitud,
                      breve_descripcion,
                      intereses,
                    }), 
                  });
              
                
                  if (response.ok) {
                    const data = await response.json(); 
                    console.log("Datos del usuario actualizados exitosamente", data);
                    localStorage.setItem("nombre", nombre)
                   
                    return true;
                  } else {
                    const errorData = await response.json(); // Obtener datos de error
                    console.error("Error al actualizar los datos del usuario:", errorData);
                    return false; // Indicar que la actualización falló
                  }
                } catch (error) {
                  console.error("Error en la solicitud de actualización de datos:", error);
                  return false; // Indicar que hubo un error
                }
              },
            
              getProfile: async (userId) => {
                try {
                  if (userId) {
                    console.log("Valor de userId:", userId); // Imprime el valor de userId
                    const url = `${process.env.BACKEND_URL}/api/usuarios/${userId}`;
                    console.log("URL del fetch:", url);
              
                    const token = localStorage.getItem("token");
                    const response = await fetch(url, {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}` // Agrega el token de autenticación
                      }
                    });
              
                    if (response.ok) {
                      const data = await response.json();
                      console.log("Datos del usuario obtenidos exitosamente", data);
                      return data;
                    } else {
                      const errorData = await response.json();
                      console.error("Error al obtener los datos del usuario:", errorData);
                      return null; // Retorna null en caso de error
                    }
                  } else {
                    console.error("userId no fue proporcionado.");
                    return null; // Retorna null si no se proporciona userId
                  }
                } catch (error) {
                  console.error("Error en la solicitud de obtener datos del usuario:", error);
                  return null; // Retorna null en caso de error
                }
              },
            
            getToken: () => {
                return localStorage.getItem("token");
              },
              
              loginUser: async (email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });
            
                    if (response.ok) {
                        const data = await response.json();
                        console.log("Datos recibidos:", data);
            
                        // Actualizar el store con los datos del usuario y token
                        setStore({ auth: true, user_id: data.usuario_id, token: data.token });

                        // Guardar auth, token y user_id en localStorage
                        localStorage.setItem("auth", "true");
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("user_id", data.usuario_id);
                        return true;
                    } else {
                        const errorData = await response.json();
                        console.error("Error en el login:", errorData);
                        return false;
                    }
                } catch (error) {
                    console.error("Error en login", error);
                    return false;
                }
            },
            
            logout: () => {
                console.log("Logout desde flux");
                localStorage.removeItem("auth");
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");
                setStore({ auth: false, user_id: null, token: null });
            },

            inscribirse: async (usuarioId, eventoId) => {
                try {
                    console.log(usuarioId, eventoId) 
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
                        // Actualiza el store con el inscripcion_id
                        setStore(prevStore => ({
                            ...prevStore,
                            inscripcion_id: data.id // Guarda el ID de la inscripción en el store
                        }));
                        return data.id; // Retorna el ID de la inscripción
                    } else {
                        console.log("Error: ", data.message);
                        return null; // O lanza un error si prefieres
                    }
                } catch (error) {
                    console.error("Error inscribiendo al usuario:", error);
                    return null; // O lanza un error si prefieres
                }
            },
        
            desapuntarse: async (inscripcionId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/inscripciones/${inscripcionId}`, {
                        method: 'DELETE',
                    });
                    if (resp.ok) {
                        console.log('Inscripción eliminada');
                        // Actualiza el store para eliminar la inscripción
                        setStore(prevStore => ({
                            ...prevStore,
                            inscripciones: prevStore.inscripciones.filter(inscripcion => inscripcion.id !== inscripcionId),
                        }));
                        return true; // Retorna true si la eliminación fue exitosa
                    } else {
                        const data = await resp.json();
                        console.log("Error: ", data.message);
                        return false; // Retorna false si hubo un error
                    }
                } catch (error) {
                    console.error("Error desapuntando al usuario:", error);
                    return false; // Retorna false en caso de error
                }
            },
            
            loadInscripciones: () => {
                fetch(`${process.env.BACKEND_URL}/api/inscripciones`)
                    .then(resp => {
                        if (!resp.ok) {
                            throw new Error("Error fetching inscripciones, status: " + resp.status);
                        }
                        return resp.json();
                    })
                    .then(data => {
                        setStore({ inscripciones: data }); // Actualiza el store con las inscripciones
                    })
                    .catch(error => {
                        console.error("Error loading inscripciones from backend", error);
                    });
            },

            uploadImage: (file) => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("file", file);
            
                    const token = localStorage.getItem('token');
                    if (!token) {
                        console.error("No se encontró el token. Usuario no autenticado.");
                        return reject(new Error("Usuario no autenticado"));
                    }
            
                    fetch(`${process.env.BACKEND_URL}/api/upload-image`, {  
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Error en la respuesta del servidor");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((error) => {
                        console.error("Error subiendo la imagen:", error);
                        reject(error);
                    });
                });
            },
            
            getUserImages: () => {
                const token = localStorage.getItem('token');
                const userId = parseInt(localStorage.getItem('user_id'));
            
                return fetch(`${process.env.BACKEND_URL}/api/fotos/${userId}`, { 
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error en la respuesta al obtener las imágenes");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.fotos) {
                        return data;
                    } else {
                        throw new Error("No se encontraron imágenes.");
                    }
                })
                .catch((error) => {
                    console.error("Error obteniendo imágenes:", error);
                    throw error;
                });
            },
            
            deleteImage: async (usuario_id, public_id) => {
                const token = localStorage.getItem('token'); // Asegurarse de enviar el token si es necesario para la autenticación
            
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/fotos/${usuario_id}/${public_id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}` // Token para autenticación
                        }
                    });
            
                    if (!response.ok) {
                        throw new Error('Error al eliminar la imagen');
                    }
            
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error("Error al eliminar la imagen:", error);
                    throw error;
                }
            },

            uploadPerfilImage: (file) => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("es_perfil", true); // Indicar que la imagen es de perfil
            
                    const token = localStorage.getItem('token');
                    if (!token) {
                        console.error("No se encontró el token. Usuario no autenticado.");
                        return reject(new Error("Usuario no autenticado"));
                    }
            
                    fetch(`${process.env.BACKEND_URL}/api/perfil/upload-image`, {  // Cambiamos la URL para la ruta de perfil
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Error en la respuesta del servidor");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((error) => {
                        console.error("Error subiendo la imagen de perfil:", error);
                        reject(error);
                    });
                });
            },
            
            getUserPerfilImage: () => {
                const token = localStorage.getItem('token');
                const userId = parseInt(localStorage.getItem('user_id'));
                
                return fetch(`${process.env.BACKEND_URL}/api/perfil/image`, {  
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error en la respuesta al obtener la imagen de perfil");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.foto_perfil) {
                        setStore({ response: data.foto_perfil }); // Guarda la imagen de perfil en el store
                        return data; // Retorna los datos si es necesario
                    } else {
                        throw new Error("No se encontró la imagen de perfil.");
                    }
                })
                .catch((error) => {
                    console.error("Error obteniendo la imagen de perfil:", error);
                    throw error;
                });
            },
            
            deletePerfilImage: async (usuario_id, public_id) => {
                const token = localStorage.getItem('token');
                const userId = parseInt(localStorage.getItem('user_id')); // Revisar si el userId se obtiene correctamente
            
                // Imprimir los valores para verificar que no son undefined
                console.log("Usuario ID:", usuario_id, "Public ID:", public_id, "User ID desde localStorage:", userId);
                
                if (!usuario_id || !public_id) {
                    console.error("Faltan parámetros: usuario_id o public_id están undefined");
                    return;
                }
            
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/perfil/image/${usuario_id}/${public_id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
            
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.ERROR || 'Error al eliminar la imagen de perfil');
                    }
            
                    const data = await response.json();
                    return data; // Retornar la respuesta del servidor
                } catch (error) {
                    console.error("Error al eliminar la imagen de perfil:", error);
                    throw error; // Re-lanzar el error para manejarlo en el componente
                }
            },
            uploadPartnerImage: (file) => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("es_perfil", true); // Indicar que la imagen es de perfil
            
                    const token = localStorage.getItem('token');
                    if (!token) {
                        console.error("No se encontró el token. Usuario no autenticado.");
                        return reject(new Error("Usuario no autenticado"));
                    }
            
                    fetch(`${process.env.BACKEND_URL}/api/perfil/upload-image/partner`, {  
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`, // Token de autenticación
                        },
                        body: formData, // FormData que incluye la imagen y otros datos
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Error en la respuesta del servidor");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((error) => {
                        console.error("Error subiendo la imagen de perfil:", error);
                        reject(error);
                    });
                });
            },
            
            
            getPartnerImage: () => {
                const token = localStorage.getItem('token');
                
                // Intenta obtener la imagen desde el localStorage primero
                const storedImage = localStorage.getItem('partner_profile_image');
                if (storedImage) {
                    return Promise.resolve({ url_imagen: storedImage }); // Retorna la imagen guardada en localStorage
                }
            
                return fetch(`${process.env.BACKEND_URL}/api/perfil/images/partner`, {  
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error en la respuesta al obtener la imagen de perfil");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.foto_perfil) {
                        localStorage.setItem('partner_profile_image', data.foto_perfil);  // Guarda la imagen en localStorage
                        setStore({ response: data.foto_perfil }); // Guarda la imagen de perfil en el store
                        return data;
                    } else {
                        throw new Error("No se encontró la imagen de perfil.");
                    }
                })
                .catch((error) => {
                    console.error("Error obteniendo la imagen de perfil:", error);
                    throw error;
                });
            },
            
            
        
            deletePartnerImage: async (public_id) => {
                const token = localStorage.getItem('token');
                
                if (!public_id) {
                    console.error("Faltan parámetros: public_id está undefined");
                    return;
                }
            
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/perfil/image/partner/${public_id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
            
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.ERROR || 'Error al eliminar la imagen de perfil');
                    }
            
                    const data = await response.json();
                    return data; // Retornar la respuesta del servidor
                } catch (error) {
                    console.error("Error al eliminar la imagen de perfil:", error);
                    throw error; // Re-lanzar el error para manejarlo en el componente
                }
            },

            getUserInscripciones: (usuarioId) => {
                const token = localStorage.getItem('token');
                return fetch(`${process.env.BACKEND_URL}/inscripciones?usuario_id=${usuarioId}`, {                       
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error fetching inscripciones");
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error("Error fetching user inscripciones:", error);
                    return null;
                });
            },
            
            loadEventosConUsuarios: () => { 
                return fetch(process.env.BACKEND_URL + '/api/eventos/con-usuarios')
                    .then(resp => {
                        if (!resp.ok) {
                            throw new Error("Error fetching eventos con usuarios, status: " + resp.status);
                        }
                        return resp.json();
                    })
                    .then(data => {
                        console.log(data); 
                        setStore({ eventos: data });
                    })
                    .catch(error => {
                        console.error("Error loading eventos con usuarios from backend", error);
                    });
            },

            getInscripcionUsuarioEventoInscrito: async (usuarioId, eventoId) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/inscripciones/usuario/${usuarioId}/evento/${eventoId}/inscrito`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
            
                    if (response.ok) {
                        const data = await response.json();
                        return { inscrito: data.inscrito, id: data.id }; // Retorna el estado y el ID
                    
                    } else {
                        const errorData = await response.json();
                        console.error("Error:", errorData);
                        return { inscrito: false, id: null };
                    }
                } catch (error) {
                    console.error("Error:", error);
                    return { inscrito: false, id: null }; // Retorna false y null en caso de error
                }
            },

            getInteresPorEvento: async (eventoId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/eventos/${eventoId}/interes`);
                    const data = await resp.json();
            
                    if (resp.ok) {
                        // Actualiza el store con el interés obtenido
                        setStore((prevStore) => ({
                            ...prevStore,
                            interes: data // Guarda el interés en el store
                        }));
                        return data; // Retorna el interés encontrado
                    } else {
                        console.log("Error: ", data.message);
                        return null; // O maneja el error como prefieras
                    }
                } catch (error) {
                    console.error("Error loading interest from backend", error);
                    return null; // O maneja el error como prefieras
                }
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
