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
class Intereses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=True, nullable=False)
    descripcion = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<Interes {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
        }

class Eventos (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    fecha = db.Column(db.Date, nullable=False)
    hora_inicio = db.Column(db.Time, nullable=False)
    hora_fin = db.Column(db.Time, nullable=False) 
    ciudad = db.Column(db.String(120), nullable=False)
    codigo_postal = db.Column(db.Integer, nullable=False)
    breve_descripcion = db.Column(db.String(120), nullable=False)
    accesibilidad = db.Column(db.Boolean(120), nullable=False)
    dificultad = db.Column(db.String(120), nullable=False)
    precio = db.Column(db.Integer, nullable=False)
    cupo = db.Column(db.Integer, nullable=False)
    observaciones = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<Eventos {self.nombre}>'

    def serialize(self):
        meses = {
            1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril",
            5: "Mayo", 6: "Junio", 7: "Julio", 8: "Agosto",
            9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre"
        }
        
        mes = meses[self.fecha.month]
        fecha_formateada = f"{self.fecha.day} de {mes} de {self.fecha.year}"

        return {
            "id": self.id,
            "nombre": self.nombre,
            "fecha": fecha_formateada,
            "horario": f"{self.hora_inicio.strftime('%H:%M')} - {self.hora_fin.strftime('%H:%M')}",
            "ciudad": self.ciudad,
            "codigo_postal": self.codigo_postal,
            "breve_descripcion": self.breve_descripcion,
            "accesibilidad": self.accesibilidad,
            "dificultad": self.dificultad,
            "precio": self.precio,
            "cupo": self.cupo,
            "observaciones": self.observaciones,
        }
