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
        # Obtener todos los intereses
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
def add_evento():
    request_body = request.get_json()

    nuevo_evento = Eventos(
        nombre=request_body["nombre"],
        fecha=request_body["fecha"],
        hora_inicio=request_body["hora_inicio"],
        hora_fin=request_body["hora_fin"],
        ciudad=request_body["ciudad"],
        codigo_postal=request_body["codigo_postal"],
        breve_descripcion=request_body["breve_descripcion"],
        accesibilidad=request_body["accesibilidad"],
        dificultad=request_body["dificultad"],
        precio=request_body["precio"],
        cupo=request_body["cupo"],
        observaciones=request_body["observaciones"],
        is_active=True,                 
    )

    db.session.add(nuevo_evento)
    db.session.commit()

    return jsonify(nuevo_evento.serialize()), 200

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

    evento.nombre = request_body.get("nombre", evento.nombre)
    evento.fecha = request_body.get("fecha", evento.fecha)
    evento.hora_inicio = request_body.get("hora_inicio", evento.hora_inicio)
    evento.hora_fin = request_body.get("hora_fin", evento.hora_fin)
    evento.ciudad = request_body.get("ciudad", evento.ciudad)
    evento.codigo_postal = request_body.get("codigo_postal", evento.codigo_postal)
    evento.breve_descripcion = request_body.get("breve_descripcion", evento.breve_descripcion)
    evento.accesibilidad = request_body.get("accesibilidad", evento.accesibilidad)
    evento.dificultad = request_body.get("dificultad", evento.dificultad)
    evento.precio = request_body.get("precio", evento.precio)
    evento.cupo = request_body.get("cupo", evento.cupo)
    evento.observaciones = request_body.get("observaciones", evento.observaciones)
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
def get_partner(partner_id):
    partner = Partners.query.filter_by(id=partner_id).first()
    if partner is None:
        return jsonify({"ERROR": "Partner no encontrado. Revise que el número de ID introducido, corresponda a un partner existente"}), 404

    return jsonify(partner.serialize()), 200

@api.route("/private-partner", methods=["GET"])
@jwt_required()
def private_partner():
    current_partner = get_jwt_identity()
    return jsonify(logged_in_as=current_partner, message="Has iniciado sesión y tienes acceso a la ruta privada."), 200

@api.route("/logout-partner", methods=['POST'])
@jwt_required()
def logout_partner():
    session.pop('jwt_token', None) 
    return jsonify({"msg": "Cierre de sesión con éxito"}), 200

@api.route('/checkPartner', methods=['POST'])
def check_partner_exists():
    partnerName = request.json.get('partnerName')
    email = request.json.get('email')

    if not partnerName and not email:
        return jsonify(message="Nombre y correo electrónico obligatorio"), 400

    if email:
        existing_partner = Partners.query.filter_by(email=email).first()
        if existing_partner:
            return jsonify(exists=True, message="Ya existe un Partner registrado con este correo electrónico"), 200

    if partnerName:
        existing_partner = Partners.query.filter_by(partnerName=partnerName).first()
        if existing_partner:
            return jsonify(exists=True, message="Ya existe un Partner registrado con ese nombre"), 200

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
    access_token = create_access_token(identity=email)
    return jsonify({ "message": "Cuenta de Partner creada exitosamente", "access_token": access_token, "partner_id": new_partner.id }), 201


@api.route("/partner-login", methods=['POST'])
def login_partner():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    partner = Partners.query.filter(Partners.email == email).first()
    
    if partner is None or not check_password_hash(partner.password, password):
        return jsonify({"msg": "Email y/o contraseña incorrectos"}), 400
    
    access_token = create_access_token(identity=partner.email)
    return jsonify({"message": "Inicio de sesión de Partner correcto","access_token": access_token}), 200

@api.route('/completar-perfil-partner/<int:partner_id>', methods=['POST'])
def complete_partner_profile(partner_id):
    partner = Partners.query.filter_by(id=partner_id).first()
    
    if partner is None:
        return jsonify({"ERROR": "Partner no encontrado."}), 404

    request_body = request.get_json()

    partner.nombre = request_body.get("nombre", partner.nombre)
    partner.nif = request_body.get("nif", partner.nif)
    partner.ciudad = request_body.get("ciudad", partner.ciudad)
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
    partner.precio = request_body.get("nif", partner.nif)
    partner.ciudad = request_body.get("ciudad", partner.ciudad)
    partner.sector = request_body.get("sector", partner.sector)
    partner.entidad_id = request_body.get("entidad_id", partner.entidad_id)
    partner.is_active = request_body.get("is_active", partner.is_active)

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

# Verificar si existe un usuario con el email proporcionado
@api.route('/usuarios', methods=['POST'])
def check_usuario_exists():
    email = request.json.get('email')

    if not email:
        return jsonify(message="El correo electrónico es obligatorio"), 400

    existing_usuario = Usuarios.query.filter_by(email=email).first()
    if existing_usuario:
        return jsonify(exists=True, message="Ya existe un Usuario registrado con este correo electrónico"), 200

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
    ubicacion = request.json.get('ubicacion')
    breve_descripcion = request.json.get('breve_descripcion')

    # Validar que al menos uno de los campos es proporcionado
    if not any([nombre, apellidos, fecha_nacimiento, ubicacion, breve_descripcion]):
        return jsonify({"ERROR": "Debe proporcionar al menos un campo para actualizar"}), 400

    # Actualiza los campos del usuario
    if nombre:
        usuario.nombre = nombre
    if apellidos:
        usuario.apellidos = apellidos
    if fecha_nacimiento:
        usuario.fecha_nacimiento = fecha_nacimiento
    if ubicacion:
        usuario.ubicacion = ubicacion
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
    nombre = request.json.get('nombre')
    apellidos = request.json.get('apellidos')
    ciudad = request.json.get('ciudad')
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
        nombre=nombre,
        apellidos=apellidos,
        ciudad=ciudad,
        email=email,
        password=hashed_password,
        is_active=True
    )

    db.session.add(new_usuario)
    db.session.commit()

    # Crear el token de acceso
    access_token = create_access_token(identity=email)

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


if __name__ == '__main__':
    api.run(debug=True)



@api.route('/inscripciones', methods=['GET'])
def get_inscripciones():
    inscripciones = Inscripciones.query.all()
    output = []
    for inscripcion in inscripciones:
        inscripcion_data = {}
        inscripcion_data['id'] = inscripcion.id
        inscripcion_data['usuario_id'] = inscripcion.usuario_id
        inscripcion_data['evento_id'] = inscripcion.evento_id
        inscripcion_data['fecha_registro'] = inscripcion.fecha_registro
        output.append(inscripcion_data)
    return jsonify({'inscripciones': output})


@api.route('/inscripciones/<id>', methods=['GET'])
def get_inscripcion(id):
    inscripcion = Inscripciones.query.get_or_404(id)
    inscripcion_data = {}
    inscripcion_data['id'] = inscripcion.id
    inscripcion_data['usuario_id'] = inscripcion.usuario_id
    inscripcion_data['evento_id'] = inscripcion.evento_id
    inscripcion_data['fecha_registro'] = inscripcion.fecha_registro
    return jsonify(inscripcion_data)


@api.route('/inscripciones', methods=['POST'])
def create_inscripcion():
    data = request.get_json()
    new_inscripcion = Inscripciones(
        usuario_id=data['usuario_id'],
        evento_id=data['evento_id'],
        fecha_registro=data['fecha_registro']
    )
    db.session.add(new_inscripcion)
    db.session.commit()

    # Devolver el ID y el mensaje en la respuesta
    return jsonify({
        'message': 'New inscripcion created!',
        'id': new_inscripcion.id  # Asegúrate de que el ID esté incluido
    })



@api.route('/inscripciones/<id>', methods=['PUT'])
def update_inscripcion(id):
    inscripcion = Inscripciones.query.get_or_404(id)
    data = request.get_json()
    inscripcion.usuario_id = data['usuario_id']
    inscripcion.evento_id = data['evento_id']
    inscripcion.fecha_registro = data['fecha_registro']
    db.session.commit()
    return jsonify({'message': 'Inscripcion updated!'})


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
    ubicacion = request.json.get('ubicacion')
    breve_descripcion = request.json.get('breve_descripcion')
    foto = request.files.get('foto')
    
    # Actualizar la información del usuario
    if nombre:
        usuario.nombre = nombre
    if apellidos:
        usuario.apellidos = apellidos
    if fecha_nacimiento:
        usuario.fecha_nacimiento = fecha_nacimiento
    if ubicacion:
        usuario.ubicacion = ubicacion
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
        # Subir la imagen a Cloudinary
        upload_result = cloudinary.uploader.upload(file)
        
        # Obtener el ID del usuario que está subiendo la imagen
        usuario_id = get_jwt_identity()
        usuario = Usuarios.query.get(usuario_id)

        # Actualizar el campo foto_perfil del usuario
        usuario.foto_perfil = upload_result['secure_url']
        usuario.public_id_perfil = upload_result['public_id']
        db.session.commit()
        
        # Devolver la URL de la imagen subida
        return jsonify({
            "message": "Imagen de perfil subida con éxito",
            "url": upload_result['secure_url']
        }), 201
    except Exception as e:
        print(f"Error al subir imagen: {e}")  # Loggear el error exacto
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

            # Eliminar la imagen de Cloudinary
            result = cloudinary.uploader.destroy(usuario.public_id_perfil)
            if result.get('result') == 'ok':
                # Actualizar el campo foto_perfil del usuario
                usuario.foto_perfil = None
                usuario.public_id_perfil = None
                db.session.commit()
                return jsonify({"message": "Imagen de perfil eliminada con éxito"}), 200
            else:
                return jsonify({"ERROR": "Error al eliminar la imagen en Cloudinary."}), 400
        except Exception as e:
            return jsonify({"ERROR": str(e)}), 500
    else:
        return jsonify({"ERROR": "Usuario no encontrado"}), 404



if __name__ == '__main__':
    api.run(debug=True)