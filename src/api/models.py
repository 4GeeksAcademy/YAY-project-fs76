from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Entidad(db.Model):

    __tablename__ = 'entidades' 
    

    id = db.Column(db.Integer, primary_key=True)

    nombre = db.Column(db.String(120), unique=True, nullable=False)

    tipo = db.Column(db.String(50), nullable=True)  # Add this line

    def __repr__(self):

        return f'<Entidad {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "tipo": self.tipo  # Add this line
        }