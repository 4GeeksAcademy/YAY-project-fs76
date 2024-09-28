"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Intereses
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
