"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, session
from api.models import db, User, Intereses, Eventos, Entidad, Partners,Usuarios,Inscripciones,UsuariosIntereses,Imagenes
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
import cloudinary.uploader
from cloudinary.api import resources_by_tag
from flask import Flask
from flask_cors import CORS
from flask_cors import CORS

from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)
import cloudinary
import cloudinary.uploader
import cloudinary.api

# Configura Cloudinary
cloudinary.config(
    cloud_name='dy3hdvics',
    api_key='652126365153659',
    api_secret='OSiPkpIQ53iN8pF1uoI2qbJyLiM'
)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/entidades', methods=['GET'])
def get_entidades():
    entidades = Entidad.query.all()
    return jsonify([entidad.serialize() for entidad in entidades])

@api.route('/entidades', methods=['POST'])
def add_entidad():
    data = request.json
    nueva_entidad = Entidad(tipo=data['tipo']) 
    db.session.add(nueva_entidad)
    db.session.commit()
    return jsonify(nueva_entidad.serialize()), 201

@api.route('/entidades', methods=['POST'])
def create_entidad():
    data = request.get_json()
    entidad = Entidad(tipo=data['tipo'])
    db.session.add(entidad)
    db.session.commit()
    return jsonify(entidad.serialize())

@api.route('/entidades/<int:id>', methods=['GET'])
def get_entidad(id):
    entidad = Entidad.query.get_or_404(id)
    return jsonify(entidad.serialize())

@api.route('/entidades/<int:id>', methods=['PUT'])
def update_entidad(id):
    entidad = Entidad.query.get(id)
    if entidad is None:
        return jsonify({'error': 'Entidad no encontrada'}), 404
    data = request.get_json()
    entidad.tipo = data['tipo']
    db.session.commit()
    return jsonify(entidad.serialize())

@api.route('/entidades/<int:id>', methods=['DELETE'])
def delete_entidad(id):
    entidad = Entidad.query.get_or_404(id)
    db.session.delete(entidad)
    db.session.commit()
    return jsonify({"message": "Entidad eliminada con éxito"}), 204


@api.route('/interes', methods=['GET', 'POST'])
def handle_intereses():
    if request.method == 'GET':

        intereses = Intereses.query.all()
        all_intereses = [interes.serialize() for interes in intereses]
        return jsonify(all_intereses), 200

    if request.method == 'POST':
        data = request.get_json()
        if not data or not data.get('nombre') or not data.get('descripcion'):
            return jsonify({"message": "Faltan datos"}), 400

        nuevo_interes = Intereses(nombre=data['nombre'], descripcion=data['descripcion'])
        db.session.add(nuevo_interes)
        db.session.commit()
        return jsonify(nuevo_interes.serialize()), 201


@api.route('/interes/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_interes(id):
    print(f"Recibiendo solicitud para el ID {id}")  # Imprime el ID recibido
    interes = Intereses.query.get(id)

    if not interes:
        return jsonify({"message": "Interés no encontrado"}), 404

    if request.method == 'GET':
        return jsonify(interes.serialize()), 200

    if request.method == 'PUT':
        data = request.get_json()
        if not data:
            return jsonify({"message": "Faltan datos"}), 400

        interes.nombre = data.get('nombre', interes.nombre)
        interes.descripcion = data.get('descripcion', interes.descripcion)

        db.session.commit()
        return jsonify(interes.serialize()), 200

    if request.method == 'DELETE':
        db.session.delete(interes)
        db.session.commit()
        return jsonify({"message": f"Interés con id {id} eliminado"}), 200


@api.route('/eventos', methods=['GET'])
def get_eventos():
    all_eventos = Eventos.query.all()
    results = list(map(lambda evento: evento.serialize(), all_eventos))

    return jsonify(results), 200

@api.route('/eventos', methods=['POST'])
@jwt_required(optional=True)  
def add_evento():
    request_body = request.get_json()  # Aquí capturamos el cuerpo de la solicitud
    partner_id = get_jwt_identity()

    # Log para ver qué partner_id se está utilizando
    print(f"Partner ID recibido: {partner_id}")

    partner = Partners.query.filter_by(id=partner_id).first()
    if partner is None:
        return jsonify({"ERROR": "Partner no encontrado"}), 404

    # Validar el request_body
    if not request_body or not request_body.get("nombre"):
        return jsonify({"ERROR": "El campo 'nombre' es obligatorio"}), 400

    nuevo_evento = Eventos(
        nombre=request_body.get("nombre"),  
        fecha=request_body.get("fecha"), 
        hora_inicio=request_body.get("hora_inicio"),  
        hora_fin=request_body.get("hora_fin"),  
        direccion=request_body.get("direccion"), 
        latitud=request_body.get("latitud"), 
        longitud=request_body.get("longitud"),   
        breve_descripcion=request_body.get("breve_descripcion"),  
        accesibilidad=request_body.get("accesibilidad"),  
        dificultad=request_body.get("dificultad"),  
        precio=request_body.get("precio"), 
        cupo=request_body.get("cupo"), 
        observaciones=request_body.get("observaciones"),  
        is_active=True,
        partner_id=partner_id,
        partner_nombre=partner.nombre, 
        interes_id=request_body.get("interes_id") 
    )

    try:
        db.session.add(nuevo_evento)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"ERROR": "Error al crear el evento", "details": str(e)}), 500

    return jsonify(nuevo_evento.serialize()), 200

@api.route('/eventos/con-usuarios', methods=['GET'])
def get_eventos_con_usuarios():
    eventos = Eventos.query.all()
    output = []
    
    for evento in eventos:
        inscripciones = Inscripciones.query.filter_by(evento_id=evento.id).all()
        usuario_ids = [inscripcion.usuario_id for inscripcion in inscripciones]
        usuarios = Usuarios.query.filter(Usuarios.id.in_(usuario_ids)).all()
        
        # Cambiamos la forma en que obtenemos la información de los usuarios
        usuarios_info = [
            {
                "id": usuario.id,
                "nombre": usuario.nombre,
                "foto_perfil": usuario.foto_perfil,
                "direccion": usuario.direccion,
                "latitud":usuario.latitud,
                "longitud":usuario.longitud,
            } for usuario in usuarios
        ]
        
        evento_data = evento.serialize()
        evento_data['usuarios'] = usuarios_info  # Ahora incluye la foto de perfil
        output.append(evento_data)
    
    return jsonify(output), 200

@api.route('/eventos/<int:evento_id>', methods=['GET'])
def get_evento(evento_id):
    evento = Eventos.query.filter_by(id=evento_id).first()
    if evento is None:
        return jsonify({"ERROR": "Evento no encontrado. Revise que el número de ID introducido, corresponda a un evento existente"}), 404

    return jsonify(evento.serialize()), 200

@api.route('/eventos/<int:evento_id>', methods=['PUT'])
def update_evento(evento_id):
    evento = Eventos.query.filter_by(id=evento_id).first()
    
    if evento is None:
        return jsonify({"ERROR": "Evento no encontrado. Revise que el número de ID introducido, corresponda a un evento existente"}), 404

    request_body = request.get_json()

    if "nombre" not in request_body:
        return jsonify({"ERROR": "La clave 'nombre' es requerida."}), 400

    evento.nombre = request_body.get("nombre", evento.nombre)
    evento.fecha = request_body.get("fecha", evento.fecha)
    evento.hora_inicio = request_body.get("hora_inicio", evento.hora_inicio)
    evento.hora_fin = request_body.get("hora_fin", evento.hora_fin)
    evento.direccion = request_body.get("direccion", evento.direccion)
    evento.latitud = request_body.get("latitud", evento.latitud)
    evento.longitud = request_body.get("longitud", evento.longitud)
    evento.breve_descripcion = request_body.get("breve_descripcion", evento.breve_descripcion)
    evento.accesibilidad = request_body.get("accesibilidad", evento.accesibilidad)
    evento.dificultad = request_body.get("dificultad", evento.dificultad)
    evento.precio = request_body.get("precio", evento.precio)
    evento.cupo = request_body.get("cupo", evento.cupo)
    evento.observaciones = request_body.get("observaciones", evento.observaciones)
    evento.interes_id = request_body.get("interes_id", evento.interes_id)
    evento.is_active = request_body.get("is_active", evento.is_active)

    db.session.commit()

    return jsonify(evento.serialize()), 200

@api.route('/eventos/<int:evento_id>', methods=['DELETE'])
def delete_evento(evento_id):
    evento = Eventos.query.filter_by(id=evento_id).first()
    
    if evento is None:
        return jsonify({"ERROR": "Evento no encontrado. Revise que el número de ID introducido, corresponda a un evento existente"}), 404

    db.session.delete(evento)
    db.session.commit()

    return jsonify({"message": "Evento eliminado exitosamente"}), 200

@api.route('/partners', methods=['GET'])
def get_partners():
    all_partners = Partners.query.all()
    results = list(map(lambda partner: partner.serialize(), all_partners))

    return jsonify(results), 200

@api.route('/partners/<int:partner_id>', methods=['GET'])
@jwt_required()
def get_partner(partner_id):
    # Middleware que valida si el partner está activo
    current_partner = get_jwt_identity()
    partner = Partners.query.filter_by(id=partner_id).first()
    
    if partner is None or partner.id != current_partner['partnerId']:
        return jsonify({"ERROR": "Partner no encontrado."}), 404

    return jsonify(partner.serialize()), 200

@api.route("/private-partner", methods=["GET"])
@jwt_required()
def private_partner():
    current_partner = get_jwt_identity()
    
    # Log para verificar el partner actual que hizo la solicitud
    print(f"Partner {current_partner} accediendo a la ruta privada.")

    return jsonify(logged_in_as=current_partner, message="Has iniciado sesión y tienes acceso a la ruta privada."), 200
@api.route("/logout-partner", methods=['POST'])
@jwt_required()
def logout_partner():
    # Log antes de cerrar sesión
    print("Cierre de sesión solicitado para el partner con JWT.")
    session.pop('jwt_token', None) 
    return jsonify({"msg": "Cierre de sesión con éxito"}), 200

@api.route('/checkPartner', methods=['GET'])
def check_partner_exists():
    email = request.args.get('email')  # Obtener el email desde los parámetros de la URL

    if not email:
        return jsonify(message="Correo electrónico obligatorio"), 400

    existing_partner = Partners.query.filter_by(email=email).first()
    if existing_partner:
        return jsonify(exists=True, message="Ya existe un Partner registrado con este correo electrónico"), 200

    return jsonify(exists=False), 200

@api.route('/partners/<int:partner_id>', methods=['DELETE'])
def delete_partner(partner_id):
    partner = Partners.query.filter_by(id=partner_id).first()
    
    if partner is None:
        return jsonify({"ERROR": "Partner no encontrado. Revise que el número de ID introducido, corresponda a un partner existente"}), 404

    db.session.delete(partner)
    db.session.commit()

    return jsonify({"message": "Partner eliminado exitosamente"}), 200

@api.route('/partner-signup', methods=['POST'])
def signup_partner():
    email = request.json['email']
    password = request.json['password']
    
    # Verificar si se han proporcionado ambos campos
    if not email or not password:
        return jsonify(message="Correo electrónico y contraseña obligatorios"), 400
     
    # Verificar si la contraseña tiene una longitud mínima
    if len(password) < 8:
        return jsonify(message="La contraseña debe tener al menos 8 caracteres"), 400
    
    # Verificar si el correo electrónico ya existe
    existing_user = Partners.query.filter_by(email=email).first()
    if existing_user:
        return jsonify(message="Ya existe un Partner registrado con este correo electrónico"), 400
    
    # Hashear la contraseña antes de guardarla
    hashed_password = generate_password_hash(password)
    new_partner = Partners(email=email, password=hashed_password, is_active=True)
    db.session.add(new_partner)
    db.session.commit()
    
    # Crear el token con el partnerId y el email
    access_token = create_access_token(identity={"email": new_partner.email, "partnerId": new_partner.id})
    
    return jsonify({
        "message": "Cuenta de Partner creada exitosamente",
        "access_token": access_token,
        "partner_id": new_partner.id
    }), 201



@api.route("/partner-login", methods=['POST'])
def login_partner():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    partner = Partners.query.filter(Partners.email == email).first()

    if partner is None or not check_password_hash(partner.password, password):
        return jsonify({"msg": "Email y/o contraseña incorrectos"}), 400

    # Crear el token con la identidad del ID del partner
    access_token = create_access_token(identity=partner.id)  # Cambiado a partner.id
    
    # Log para ver el token generado
    print(f"Token JWT generado para el partner {partner.id}: {access_token}")

    return jsonify({
        "message": "Inicio de sesión de Partner correcto", 
        "access_token": access_token, 
        "partner_id": partner.id
    }), 200

@api.route('/completar-perfil-partner/<int:partner_id>', methods=['POST'])
def complete_partner_profile(partner_id):
    partner = Partners.query.filter_by(id=partner_id).first()
    
    if partner is None:
        return jsonify({"ERROR": "Partner no encontrado."}), 404

    request_body = request.get_json()

    partner.nombre = request_body.get("nombre", partner.nombre)
    partner.nif = request_body.get("nif", partner.nif)
    partner.direccion = request_body.get("direccion", partner.direccion)
    partner.latitud = request_body.get("latitud", partner.latitud)
    partner.longitud = request_body.get("longitud", partner.longitud)
    partner.sector = request_body.get("sector", partner.sector)
    partner.entidad_id = request_body.get("entidad_id", partner.entidad_id)

    db.session.commit()

    return jsonify(partner.serialize()), 200

@api.route('/partners/<int:partner_id>', methods=['PUT'])
def update_partner(partner_id):
    partner = Partners.query.filter_by(id=partner_id).first()
    
    if partner is None:
        return jsonify({"ERROR": "Partner no encontrado. Revise que el número de ID introducido, corresponda a un partner existente"}), 404

    request_body = request.get_json()

    partner.nombre = request_body.get("nombre", partner.nombre)
    partner.nif = request_body.get("nif", partner.nif)
    partner.direccion = request_body.get("direccion", partner.direccion)
    partner.latitud = request_body.get("latitud", partner.latitud)
    partner.longitud = request_body.get("longitud", partner.longitud)
    partner.sector = request_body.get("sector", partner.sector)
    partner.entidad_id = request_body.get("entidad_id", partner.entidad_id)

    db.session.commit()

    return jsonify(partner.serialize()), 200


@api.route('/usuarios', methods=['GET'])
def get_usuarios():
    all_usuarios = Usuarios.query.all()
    results = list(map(lambda usuario: usuario.serialize(), all_usuarios))
    return jsonify(results), 200

# Obtener un usuario por ID


@api.route('/usuarios/<int:usuario_id>', methods=['GET'])
@jwt_required()
def get_usuario(usuario_id):
    usuario = Usuarios.query.filter_by(id=usuario_id).first()
    if usuario is None:
        return jsonify({"ERROR": "Usuario no encontrado. Revise que el número de ID introducido corresponda a un usuario existente"}), 404
    return jsonify(usuario.serialize()), 200

# Ruta privada para usuarios autenticados
@api.route("/private-usuario", methods=["GET"])
@jwt_required()
def private_usuario():
    usuario_id = get_jwt_identity()  # Aquí obtienes el ID del usuario desde el token
    usuario = Usuarios.query.get(usuario_id)

    if usuario is None:
        return jsonify({"ERROR": "Usuario no encontrado"}), 404

    return jsonify({
        "logged_in_as": usuario.nombre,
        "email": usuario.email,
        "message": "Has iniciado sesión y tienes acceso a la ruta privada."
    }), 200

# Cerrar sesión del usuario
@api.route("/logout-usuario", methods=['POST'])
@jwt_required()
def logout_usuario():
    session.pop('jwt_token', None)
    return jsonify({"msg": "Cierre de sesión con éxito"}), 200

@api.route('/checkUser', methods=['GET'])
def check_user_exists():
    email = request.args.get('email')  # Obtener el email desde los parámetros de la URL

    if not email:
        return jsonify(message="Correo electrónico obligatorio"), 400

    existing_user = Usuarios.query.filter_by(email=email).first()  # Asegúrate de tener el modelo Users
    if existing_user:
        return jsonify(exists=True, message="Ya existe un usuario registrado con este correo electrónico"), 200

    return jsonify(exists=False), 200
# Eliminar un usuario por ID
@api.route('/usuarios/<int:usuario_id>', methods=['DELETE'])
def delete_usuario(usuario_id):
    usuario = Usuarios.query.filter_by(id=usuario_id).first()

    if usuario is None:
        return jsonify({"ERROR": "Usuario no encontrado. Revise que el número de ID introducido corresponda a un usuario existente"}), 404

    db.session.delete(usuario)
    db.session.commit()

    return jsonify({"message": "Usuario eliminado exitosamente"}), 200

@api.route('/usuarios/<int:user_id>', methods=['PUT'])
def actualizar_usuario(user_id):
    # Obtén el usuario correspondiente
    usuario = Usuarios.query.get(user_id)
    if not usuario:
        return jsonify({"ERROR": "Usuario no encontrado"}), 404

    # Obtén los datos del cuerpo de la solicitud
    nombre = request.json.get('nombre')
    apellidos = request.json.get('apellidos')
    fecha_nacimiento = request.json.get('fecha_nacimiento')
    direccion = request.json.get('direccion')
    latitud = request.json.get('latitud')
    longitud = request.json.get('longitud')
    breve_descripcion = request.json.get('breve_descripcion')
    

    # Validar que al menos uno de los campos es proporcionado
    if not any([nombre, apellidos, fecha_nacimiento, direccion, latitud, longitud, breve_descripcion]):
        return jsonify({"ERROR": "Debe proporcionar al menos un campo para actualizar"}), 400

    # Actualiza los campos del usuario
    if nombre:
        usuario.nombre = nombre
    if apellidos:
        usuario.apellidos = apellidos
    if fecha_nacimiento:
        usuario.fecha_nacimiento = fecha_nacimiento
    if direccion:
        usuario.direccion = direccion
    if latitud:
        usuario.latitud = latitud
    if longitud:
        usuario.longitud = longitud
    if breve_descripcion:
        usuario.breve_descripcion = breve_descripcion

    try:
        db.session.commit()
        return jsonify({"message": "Datos del usuario actualizados con éxito"}), 200
    except Exception as e:
        db.session.rollback()  # Revierte la sesión en caso de error
        return jsonify({"ERROR": "Error al actualizar el usuario", "details": str(e)}), 500

@api.route('/ruta_protegida', methods=['GET'])
@jwt_required()
def ruta_protegida():
    # Obtener el ID del usuario desde el token JWT
    user_id = get_jwt_identity()

    # Puedes usar este user_id en tus consultas o lógica de negocio
    usuario = Usuarios.query.get(user_id)

    if not usuario:
        return jsonify({"ERROR": "Usuario no encontrado"}), 404

    return jsonify({"message": f"Bienvenido, {usuario.nombre}"}), 200


@api.route('/signup', methods=['POST'])
def signup():

    email = request.json.get('email')
    password = request.json.get('password')

    # Verificar si se han proporcionado ambos campos
    if not email or not password:
        return jsonify({"ERROR": "El correo electrónico y la contraseña son obligatorios"}), 400

    # Verificar si la contraseña tiene una longitud mínima
    if len(password) < 8:
        return jsonify({"ERROR": "La contraseña debe tener al menos 8 caracteres"}), 400

    # Verificar si el correo electrónico ya existe
    existing_usuario = Usuarios.query.filter_by(email=email).first()
    if existing_usuario:
        return jsonify({"ERROR": "Ya existe un Usuario con este correo electrónico"}), 409

    # Hashear la contraseña
    hashed_password = generate_password_hash(password)
    
    # Crear el nuevo usuario
    new_usuario = Usuarios(

        email=email,
        password=hashed_password,
        is_active=True
    )

    db.session.add(new_usuario)
    db.session.commit()

    # Crear el token de acceso
   # access_token = create_access_token(identity=email)
    access_token = create_access_token(identity=new_usuario.id)

    # Retornar el ID del nuevo usuario
    return jsonify({
        "message": "Usuario registrado con éxito",
        "user_id": new_usuario.id,  # Devuelve el ID del nuevo usuario
        "access_token": access_token
    }), 201

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({"ERROR": "Correo electrónico y contraseña son obligatorios"}), 400

    # Buscar el usuario por email
    usuario = Usuarios.query.filter_by(email=email).first()

    if usuario is None or not check_password_hash(usuario.password, password):
        return jsonify({"ERROR": "Correo electrónico o contraseña incorrectos"}), 401

    # Crear un token de acceso JWT con el id del usuario como identidad
    access_token = create_access_token(identity=usuario.id)  # Aquí usamos el ID en el token

    # Devolver información del usuario junto con el token
    return jsonify({
        "token": access_token,
        "usuario_id": usuario.id,  # Devolvemos el ID del usuario
        "nombre": usuario.nombre,
        "email": usuario.email
    }), 200


@api.route("/logout", methods=['POST'])
@jwt_required()
def logout():
    session.pop('jwt_token', None) 
    return jsonify({"msg": "Se ha cerrado sesión correctamente"}), 200


@api.route('/inscripciones', methods=['GET'])
def get_inscripciones():
    inscripciones = Inscripciones.query.all()
    output = []
    for inscripcion in inscripciones:
        inscripcion_data = {
            'id': inscripcion.id,
            'usuario_id': inscripcion.usuario_id,
            'evento_id': inscripcion.evento_id,
            'fecha_registro': inscripcion.fecha_registro
        }
        output.append(inscripcion_data)
    
    return jsonify(output), 200 


@api.route('/inscripciones/<id>', methods=['GET'])
def get_inscripcion(id): 
    inscripcion = Inscripciones.query.get_or_404(id)
    inscripcion_data = {
        'id': inscripcion.id,
        'usuario_id': inscripcion.usuario_id,
        'evento_id': inscripcion.evento_id,
        'fecha_registro': inscripcion.fecha_registro
    }
    return jsonify(inscripcion_data)


@api.route('/inscripciones', methods=['POST'])
def create_inscripcion():
    data = request.get_json()
    
    existing_inscripcion = Inscripciones.query.filter_by(
        usuario_id=data['usuario_id'],
        evento_id=data['evento_id']
    ).first()
    
    if existing_inscripcion:
        return jsonify({"message": "El usuario ya está inscrito en este evento."}), 400

    new_inscripcion = Inscripciones(
        usuario_id=data['usuario_id'],
        evento_id=data['evento_id'],
        fecha_registro=data['fecha_registro']
    )
    db.session.add(new_inscripcion)
    db.session.commit()

    return jsonify({
        'message': 'Nueva inscripción creada!',
        'id': new_inscripcion.id  
    }), 201

@api.route('/inscripciones/<id>', methods=['PUT'])
def update_inscripcion(id):
    inscripcion = Inscripciones.query.get_or_404(id)
    data = request.get_json()
    inscripcion.usuario_id = data['usuario_id']
    inscripcion.evento_id = data['evento_id']
    inscripcion.fecha_registro = data['fecha_registro']
    db.session.commit()
    return jsonify({'message': 'Inscripcion updated!'})

@api.route('/inscripciones/<int:user_id>', methods=['GET'])
@jwt_required()
def get_inscripciones_por_usuario(user_id):
    inscripciones = Inscripciones.query.filter_by(usuario_id=user_id).all()
    output = []
    for inscripcion in inscripciones:
        inscripcion_data = {
            'id': inscripcion.id,
            'evento_id': inscripcion.evento_id,
            'fecha_registro': inscripcion.fecha_registro
        }
        output.append(inscripcion_data)
    
    if not output:
        return jsonify({"message": "No hay inscripciones para este usuario."}), 404
    
    return jsonify(output), 200


@api.route('inscripciones/<id>', methods=['DELETE'])
def delete_inscripcion(id):
    inscripcion = Inscripciones.query.get_or_404(id)
    db.session.delete(inscripcion)
    db.session.commit()
    return jsonify({'message': 'Inscripcion deleted!'})


@api.route('/upload-image', methods=['POST'])
@jwt_required()
def upload_image():
    # Obtener el archivo subido
    file = request.files.get('file')
    
    if not file:
        return jsonify({"ERROR": "No se proporcionó un archivo."}), 400

    # Verificar si el archivo es una imagen
    if not file.filename.endswith(('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff')):
        return jsonify({"ERROR": "Solo se permiten archivos de imagen"}), 400
    
    # Verificar el tamaño del archivo
    file.seek(0, 2)  # Mover el cursor al final del archivo para obtener el tamaño
    if file.tell() > 1024 * 1024 * 5:  # 5MB
        return jsonify({"ERROR": "El archivo es demasiado grande"}), 400
    file.seek(0)  # Volver al inicio del archivo

    try:
        # DEBUG: Imprimir el archivo recibido
        print(f"Archivo recibido: {file.filename}")

        # Subir la imagen a Cloudinary
        upload_result = cloudinary.uploader.upload(file)
        
        # Obtener el ID del usuario que está subiendo la imagen
        usuario_id = get_jwt_identity()
        usuario = Usuarios.query.get(usuario_id)

        # Verificar cuántas imágenes ya tiene el usuario
        if Imagenes.query.filter_by(usuario_id=usuario_id).count() >= 5:
            return jsonify({"ERROR": "No se pueden subir más de 5 imágenes por usuario."}), 400

        # Crear una nueva entrada de imagen
        nueva_imagen = Imagenes(
            url=upload_result['secure_url'],  # Almacenar la URL de la imagen
            public_id=upload_result['public_id'],  # Almacenar el public_id
            usuario_id=usuario_id
        )
        db.session.add(nueva_imagen)
        db.session.commit()
        
        # DEBUG: Imprimir la URL de la imagen subida
        print(f"Imagen subida con éxito: {upload_result['secure_url']}")

        # Devolver la URL de la imagen subida
        return jsonify({
            "message": "Imagen subida con éxito",
            "url": upload_result['secure_url']
        }), 201
    except Exception as e:
        print(f"Error al subir imagen: {e}")  # Loggear el error exacto
        return jsonify({"error": str(e)}), 500


@api.route('/fotos/<int:usuario_id>', methods=['GET'])
def get_fotos(usuario_id):
    usuario = Usuarios.query.get(usuario_id)
    
    if usuario is None:
        return jsonify({"ERROR": "Usuario no encontrado"}), 404
    
    # Obtener todas las imágenes del usuario
    imagenes = Imagenes.query.filter_by(usuario_id=usuario_id).all()
    
    if not imagenes:
        return jsonify({"message": "No hay fotos para este usuario."}), 404
    
    # Crear una lista de URLs de las imágenes
    fotos_urls = [imagen.url for imagen in imagenes]
    
    return jsonify({"fotos": fotos_urls}), 200


@api.route('/usuarios/<int:usuario_id>', methods=['PUT'])
@jwt_required()
def update_usuario(usuario_id):
    # Obtener el ID del usuario que está haciendo la solicitud
    current_usuario_id = get_jwt_identity()
    
    # Verificar si el usuario que está haciendo la solicitud es el propietario del perfil
    if current_usuario_id != usuario_id:
        return jsonify({"ERROR": "No tienes permiso para editar este perfil"}), 403
    
    # Obtener el usuario que se va a editar
    usuario = Usuarios.query.get(usuario_id)
    
    if usuario is None:
        return jsonify({"ERROR": "Usuario no encontrado"}), 404
    
    # Obtener los datos del cuerpo de la solicitud
    nombre = request.json.get('nombre')
    apellidos = request.json.get('apellidos')
    fecha_nacimiento = request.json.get('fecha_nacimiento')
    direccion = request.json.get('direccion')
    latitud = request.json.get('latitud')
    longitud = request.json.get('longitud')
    breve_descripcion = request.json.get('breve_descripcion')
    foto = request.files.get('foto')
    
    # Actualizar la información del usuario
    if nombre:
        usuario.nombre = nombre
    if apellidos:
        usuario.apellidos = apellidos
    if fecha_nacimiento:
        usuario.fecha_nacimiento = fecha_nacimiento
    if direccion:
        usuario.direccion = direccion
    if latitud:
        usuario.latitud = latitud
    if longitud:
        usuario.longitud = longitud
    if breve_descripcion:
        usuario.breve_descripcion = breve_descripcion
    
    # Actualizar la imagen de perfil
    if foto:
        # Verificar si el archivo es una imagen
        if not foto.filename.endswith(('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff')):
            return jsonify({"ERROR": "Solo se permiten archivos de imagen"}), 400
        
        # Verificar el tamaño del archivo
        if foto.size > 1024 * 1024 * 5:  # 5MB
            return jsonify({"ERROR": "El archivo es demasiado grande"}), 400
        
        try:
            # Subir la imagen a Cloudinary
            upload_result = cloudinary.uploader.upload(foto)
            
            # Actualizar el campo foto del usuario con la URL de la imagen subida
            usuario.foto = upload_result['secure_url']
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    # Guardar los cambios en la base de datos
    db.session.commit()
    
    # Devolver la información actualizada del usuario
    return jsonify({
        "message": "Perfil actualizado con éxito",
        "usuario": usuario.serialize()
    }), 200


@api.route('/fotos/<int:usuario_id>/<string:public_id>', methods=['DELETE'])
@jwt_required()
def delete_foto(usuario_id, public_id):
    current_usuario_id = get_jwt_identity()
    
    if current_usuario_id != usuario_id:
        return jsonify({"ERROR": "No tienes permiso para eliminar esta imagen"}), 403
    
    # Buscar la imagen en la base de datos por public_id
    imagen = Imagenes.query.filter_by(public_id=public_id, usuario_id=usuario_id).first()

    if imagen is None:
        return jsonify({"ERROR": "Imagen no encontrada"}), 404

    try:
        result = cloudinary.uploader.destroy(public_id)

        if result.get('result') == 'ok':
            db.session.delete(imagen)  # Elimina la imagen de la base de datos
            db.session.commit()
            return jsonify({"message": f"Foto {public_id} eliminada con éxito."}), 200
        else:
            return jsonify({"ERROR": "Error al eliminar la foto en Cloudinary."}), 400
    except Exception as e:
        return jsonify({"ERROR": str(e)}), 500
    

#imagen de perfil


@api.route('/perfil/upload-image', methods=['POST'])
@jwt_required()
def upload_perfil_image():
    # Obtener el archivo subido
    file = request.files.get('file')
    
    if not file:
        return jsonify({"ERROR": "No se proporcionó un archivo."}), 400

    # Verificar si el archivo es una imagen
    if not file.filename.endswith(('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff')):
        return jsonify({"ERROR": "Solo se permiten archivos de imagen"}), 400
    
    # Verificar el tamaño del archivo
    file.seek(0, 2)  # Mover el cursor al final del archivo para obtener el tamaño
    if file.tell() > 1024 * 1024 * 5:  # 5MB
        return jsonify({"ERROR": "El archivo es demasiado grande"}), 400
    file.seek(0)  # Volver al inicio del archivo

    try:
            # Crear un public_id único para las imágenes de usuarios
            usuario_id = get_jwt_identity()
            public_id = f"user_{usuario_id}"
            
            # Subir la imagen a Cloudinary
            upload_result = cloudinary.uploader.upload(file, public_id=public_id)
            
            # Actualizar el campo foto_perfil del usuario
            usuario = Usuarios.query.get(usuario_id)
            usuario.foto_perfil = upload_result['secure_url']
            usuario.public_id_perfil = public_id  # Almacena el public_id
            db.session.commit()
            
            return jsonify({
                "message": "Imagen de perfil subida con éxito",
                "url": upload_result['secure_url']
            }), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/perfil/image', methods=['GET'])
@jwt_required()
def get_perfil_image():
    # Obtener el ID del usuario que está solicitando la imagen
    usuario_id = get_jwt_identity()
    usuario = Usuarios.query.get(usuario_id)

    if usuario:
        return jsonify({"foto_perfil": usuario.foto_perfil}), 200
    else:
        return jsonify({"ERROR": "Usuario no encontrado"}), 404
    

@api.route('/perfil/image/<int:usuario_id>/<string:public_id>', methods=['DELETE'])
@jwt_required()
def delete_perfil_image(usuario_id, public_id):
    # Obtener el ID del usuario que está eliminando la imagen
    current_usuario_id = get_jwt_identity()

    # Verificar si el usuario autenticado tiene permiso para eliminar la imagen
    if current_usuario_id != usuario_id:
        return jsonify({"ERROR": "No tienes permiso para eliminar esta imagen de perfil"}), 403

    # Buscar el usuario
    usuario = Usuarios.query.get(usuario_id)

    if usuario:
        try:
            # Verificar si el public_id de la imagen de perfil coincide
            if usuario.public_id_perfil != public_id:
                return jsonify({"ERROR": "Imagen de perfil no encontrada"}), 404

            # Aquí solo actualizamos los campos en la base de datos
            usuario.foto_perfil = None  # Eliminar la referencia a la imagen
            usuario.public_id_perfil = None  # Eliminar el public ID
            db.session.commit()  # Guardar los cambios en la base de datos
            
            return jsonify({"message": "Imagen de perfil eliminada con éxito"}), 200
            
        except Exception as e:
            return jsonify({"ERROR": str(e)}), 500
    else:
        return jsonify({"ERROR": "Usuario no encontrado"}), 404
    
    
@api.route('/perfil/upload-image/partner', methods=['POST'])
@jwt_required()
def upload_partner_perfil_image():
    # Obtener el archivo subido
    file = request.files.get('file')
    
    if not file:
        return jsonify({"ERROR": "No se proporcionó un archivo."}), 400

    # Verificar si el archivo es una imagen
    if not file.filename.endswith(('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff')):
        return jsonify({"ERROR": "Solo se permiten archivos de imagen"}), 400

    # Verificar el tamaño del archivo
    file.seek(0, 2)
    if file.tell() > 1024 * 1024 * 5:  # 5MB
        return jsonify({"ERROR": "El archivo es demasiado grande"}), 400
    file.seek(0)

    try:
        # Subir la imagen a Cloudinary
        upload_result = cloudinary.uploader.upload(file)
        
        # Obtener el email del partner que está subiendo la imagen
        partner_email = get_jwt_identity()
        partner = Partners.query.filter_by(email=partner_email).first()

        if not partner:
            return jsonify({"ERROR": "Partner no encontrado"}), 404

        # Actualizar el campo foto_perfil del partner
        partner.foto_perfil = upload_result['secure_url']
        partner.public_id_perfil = upload_result['public_id']
        db.session.commit()
        
        return jsonify({
            "message": "Imagen de perfil subida con éxito",
            "url": upload_result['secure_url']
        }), 201
    except Exception as e:
        print(f"Error al subir imagen: {e}")
        return jsonify({"error": str(e)}), 500



@api.route('/perfil/images/partner', methods=['GET'])
@jwt_required()
def get_partner_perfil_image():
    # Obtener el email del partner
    partner_email = get_jwt_identity()
    partner = Partners.query.filter_by(email=partner_email).first()

    if partner:
        return jsonify({"foto_perfil": partner.foto_perfil}), 200
    else:
        return jsonify({"ERROR": "Partner no encontrado"}), 404

    

@api.route('/perfil/image/partner/<int:image_id>', methods=['DELETE'])
@jwt_required()
def delete_partner_image(image_id):
    # Obtener el email del partner
    partner_email = get_jwt_identity()
    partner = Partners.query.filter_by(email=partner_email).first()

    if not partner:
        return jsonify({"ERROR": "Partner no encontrado"}), 404

    # Buscar la imagen
    imagen = Imagenes.query.get(image_id)

    if imagen and imagen.partner_email == partner.email:
        try:
            # Eliminar la imagen de Cloudinary
            result = cloudinary.uploader.destroy(imagen.public_id)
            if result.get('result') == 'ok':
                db.session.delete(imagen)  # Eliminar la imagen de la base de datos
                db.session.commit()
                return jsonify({"message": "Imagen eliminada con éxito"}), 200
            else:
                return jsonify({"ERROR": "Error al eliminar la imagen en Cloudinary."}), 400
        except Exception as e:
            return jsonify({"ERROR": str(e)}), 500
    else:
        return jsonify({"ERROR": "Imagen no encontrada o no tienes permiso para eliminarla"}), 404

@api.route('/inscripciones/usuario/<int:usuario_id>/evento/<int:evento_id>/inscrito', methods=['GET'])
def get_inscripcion_usuario_evento_inscrito(usuario_id, evento_id):
    inscripcion = Inscripciones.query.filter_by(usuario_id=usuario_id, evento_id=evento_id).first()
    if inscripcion:
        return jsonify({'inscrito': True, 'id': inscripcion.id}), 200
    else:
        return jsonify({'inscrito': False}), 200 

@api.route('/eventos/<int:evento_id>/interes', methods=['GET'])
def get_interes_por_evento(evento_id):
    evento = Eventos.query.get(evento_id)
    
    if evento is None:
        return jsonify({"ERROR": "Evento no encontrado."}), 404

    # Obtener el interés asociado al evento
    interes = evento.interes
    
    if interes is None:
        return jsonify({"ERROR": "No hay interés asociado a este evento."}), 404

    return jsonify({
        "interes_id": interes.id,
        "nombre": interes.nombre
    }), 200
    
@api.route('/usuarios/intereses', methods=['POST'])
@jwt_required()
def agregar_interes():
    usuarioId = get_jwt_identity()
    data = request.get_json()
    if not data or 'intereses_id' not in data:
        return jsonify({"ERROR": "Se requiere la lista de intereses."}), 400

    intereses_id = data['intereses_id']
    for interes_id in intereses_id:
        interes = Intereses.query.get(interes_id)
        if not interes:
            return jsonify({"ERROR": f"Interés con ID {interes_id} no encontrado."}), 404

        existe_relacion = UsuariosIntereses.query.filter_by(usuario_id=usuarioId, interes_id=interes_id).first()
        if existe_relacion is None:
            nueva_relacion = UsuariosIntereses(usuario_id=usuarioId, interes_id=interes_id)
            db.session.add(nueva_relacion)

    db.session.commit()
    return jsonify({"message": "Intereses añadidos correctamente."}), 201


@api.route('/usuarios/intereses', methods=['GET'])
@jwt_required()
def obtener_intereses():
    usuarioId = get_jwt_identity()
    intereses = UsuariosIntereses.query.filter_by(usuario_id=usuarioId).all()
    return jsonify([{'id': inter.interes.id, 'nombre': inter.interes.nombre} for inter in intereses]), 200


@api.route('/usuarios/intereses', methods=['PUT'])
@jwt_required()
def editar_intereses():
    usuarioId = get_jwt_identity()
    data = request.get_json()
    if not data or 'intereses_id' not in data:
        return jsonify({"ERROR": "Se requiere la lista de intereses."}), 400

    nuevos_intereses_id = data['intereses_id']
    UsuariosIntereses.query.filter_by(usuario_id=usuarioId).delete()

    for interes_id in nuevos_intereses_id:
        interes = Intereses.query.get(interes_id)
        if not interes:
            return jsonify({"ERROR": f"Interés con ID {interes_id} no encontrado."}), 404
        
        nueva_relacion = UsuariosIntereses(usuario_id=usuarioId, interes_id=interes_id)
        db.session.add(nueva_relacion)

    db.session.commit()
    return jsonify({"message": "Intereses actualizados correctamente."}), 200


@api.route('/usuarios/intereses/<int:interes_id>', methods=['DELETE'])
@jwt_required()
def eliminar_interes(interes_id):
    usuarioId = get_jwt_identity()
    relacion = UsuariosIntereses.query.filter_by(usuario_id=usuarioId, interes_id=interes_id).first()
    if relacion:
        db.session.delete(relacion)
        db.session.commit()
        return jsonify({"message": "Interés eliminado correctamente."}), 200
    else:
        return jsonify({"ERROR": "Relación no encontrada."}), 404
    
@api.route('/evento/<int:evento_id>/upload-image', methods=['POST'])
@jwt_required()
def upload_evento_image(evento_id):
    # Obtener el archivo subido
    file = request.files.get('file')
    
    if not file:
        return jsonify({"ERROR": "No se proporcionó un archivo."}), 400

    # Verificar si el archivo es una imagen
    if not file.filename.endswith(('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff')):
        return jsonify({"ERROR": "Solo se permiten archivos de imagen"}), 400
    
    # Verificar el tamaño del archivo
    file.seek(0, 2)  # Mover el cursor al final del archivo para obtener el tamaño
    if file.tell() > 1024 * 1024 * 5:  # 5MB
        return jsonify({"ERROR": "El archivo es demasiado grande"}), 400
    file.seek(0)  # Volver al inicio del archivo

    try:
        # Subir la imagen a Cloudinary con un public_id único para el evento
        public_id = f"evento_{evento_id}"
        upload_result = cloudinary.uploader.upload(file, public_id=public_id)
        
        # Actualizar el campo foto_evento del evento
        evento = Eventos.query.get(evento_id)
        if not evento:
            return jsonify({"ERROR": "Evento no encontrado"}), 404

        evento.foto_evento = upload_result['secure_url']
        db.session.commit()
        
        # Devolver la URL de la imagen subida
        return jsonify({
            "message": "Imagen del evento subida con éxito",
            "url": upload_result['secure_url']
        }), 201
    except Exception as e:
        print(f"Error al subir imagen: {e}")  # Loggear el error exacto
        return jsonify({"error": str(e)}), 500
    
@api.route('/evento/<int:evento_id>/image', methods=['GET'])
def get_evento_image(evento_id):
    # Buscar el evento por su ID
    evento = Eventos.query.get(evento_id)

    if evento:
        return jsonify({"foto_evento": evento.foto_evento}), 200
    else:
        return jsonify({"ERROR": "Evento no encontrado"}), 404
    
@api.route('/evento/<int:evento_id>/upload-image', methods=['PUT'])
@jwt_required()
def update_evento_image(evento_id):
    # Obtener el archivo subido
    file = request.files.get('file')

    if not file:
        return jsonify({"ERROR": "No se proporcionó un archivo."}), 400

    # Verificar si el archivo es una imagen
    if not file.filename.endswith(('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff')):
        return jsonify({"ERROR": "Solo se permiten archivos de imagen"}), 400

    # Verificar el tamaño del archivo
    file.seek(0, 2)  # Mover el cursor al final del archivo para obtener el tamaño
    if file.tell() > 1024 * 1024 * 5:  # 5MB
        return jsonify({"ERROR": "El archivo es demasiado grande"}), 400
    file.seek(0)  # Volver al inicio del archivo

    try:
        # Buscar el evento
        evento = Eventos.query.get(evento_id)
        if not evento:
            return jsonify({"ERROR": "Evento no encontrado"}), 404

        # Eliminar la imagen anterior de Cloudinary si existe
        if evento.foto_evento:
            public_id = f"evento_{evento_id}"
            cloudinary.uploader.destroy(public_id)

        # Subir la nueva imagen a Cloudinary
        upload_result = cloudinary.uploader.upload(file, public_id=public_id)

        # Actualizar el campo foto_evento del evento
        evento.foto_evento = upload_result['secure_url']
        db.session.commit()

        return jsonify({
            "message": "Imagen del evento actualizada con éxito",
            "url": upload_result['secure_url']
        }), 200
    except Exception as e:
        print(f"Error al actualizar imagen: {e}")  # Loggear el error exacto
        return jsonify({"error": str(e)}), 500
    
    
@api.route('/evento/<int:evento_id>/image', methods=['DELETE'])
@jwt_required()
def delete_evento_image(evento_id):
    # Buscar el evento por su ID
    evento = Eventos.query.get(evento_id)

    if not evento:
        return jsonify({"ERROR": "Evento no encontrado"}), 404

    try:
        # Limpiar el campo foto_evento en la base de datos
        if evento.foto_evento:
            evento.foto_evento = None
            db.session.commit()
            return jsonify({"message": "La URL de la imagen del evento ha sido eliminada con éxito"}), 200
        else:
            return jsonify({"ERROR": "No existe ninguna imagen para eliminar."}), 404
    except Exception as e:
        print(f"Error al eliminar URL de imagen: {e}")  # Loggear el error exacto
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    api.run(debug=True)