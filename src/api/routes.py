"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, session
from api.models import db, User, Intereses, Eventos, Entidad, Partners, Usuarios
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


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
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify(message="Ya existe un Partner registrado con este correo electrónico"), 400
    
    new_partner = Partners(email=email, password=password, is_active=True)
    db.session.add(new_partner)
    db.session.commit()
    access_token = create_access_token(identity=email)
    return jsonify({ "message": "Cuenta de Partner creada exitosamente","access_token": access_token}), 201

@api.route("/partner-login", methods=['POST'])
def login_partner():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    partner = Partners.query.filter(Partners.email == email).first()
    
    if partner is None:
        return jsonify({"msg": "Email y/o contraseña incorrectos"}), 400
    
    if partner.password != password:
        return jsonify({"msg": "Email y/o contraseña incorrectos"}), 400
    
    access_token = create_access_token(identity=partner.email)
    return jsonify({"message": "Inicio de sesión de Partner correcto","access_token": access_token}), 200


@api.route('/usuarios', methods=['GET'])
def get_usuarios():
    all_usuarios = Usuarios.query.all()
    results = list(map(lambda usuario: usuario.serialize(), all_usuarios))
    return jsonify(results), 200

# Obtener un usuario por ID
@api.route('/usuarios/<int:usuario_id>', methods=['GET'])
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
@api.route('/signup', methods=['POST'])
def signup():
    nombre = request.json.get('nombre')
    apellidos = request.json.get('apellidos')
    ciudad = request.json.get('ciudad')
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({"ERROR": "El correo electrónico y la contraseña son obligatorios"}), 400

    existing_usuario = Usuarios.query.filter_by(email=email).first()
    if existing_usuario:
        return jsonify({"ERROR": "Ya existe un Usuario con este correo electrónico"}), 409

    hashed_password = generate_password_hash(password)
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

    return jsonify({"message": "Usuario registrado con éxito"}), 201
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
    access_token = create_access_token(identity=usuario.id)

    # Devolver información del usuario junto con el token
    return jsonify({
        "token": access_token,
        "usuario_id": usuario.id,
        "nombre": usuario.nombre,
        "email": usuario.email
    }), 200





if __name__ == '__main__':
    api.run(debug=True)
