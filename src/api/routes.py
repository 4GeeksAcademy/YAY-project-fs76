"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Entidad
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

if __name__ == '__main__':
    app.run(debug=True)