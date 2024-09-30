"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Intereses, Eventos, Entidad
from api.utils import generate_sitemap, APIException
from flask_cors import CORS




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
    nueva_entidad = Entidad(nombre=data['nombre'], tipo=data['tipo'])  # Add tipo here
    db.session.add(nueva_entidad)
    db.session.commit()
    return jsonify(nueva_entidad.serialize()), 201


@api.route('/entidades/<int:id>', methods=['GET'])
def get_entidad(id):
    entidad = Entidad.query.get_or_404(id)
    return jsonify(entidad.serialize())


@api.route('/entidades/<int:id>', methods=['PUT'])
def update_entidad(id):
    data = request.json
    entidad = Entidad.query.get_or_404(id)
    entidad.nombre = data['nombre']
    entidad.tipo = data['tipo']  # Add tipo here
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


if __name__ == '__main__':
    api.run(debug=True)
