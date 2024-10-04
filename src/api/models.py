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
    tipo = db.Column(db.String(50), nullable=True)
    db.relationship('Eventos', backref='entidad', lazy=True)  

    def __repr__(self):
        return f'<Entidad {self.tipo}>'
    def serialize(self):
        return {
            "id": self.id,
            "tipo": self.tipo  
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
    db.relationship('Inscripciones', backref='eventos', lazy=True)

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

class Partners(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=False, nullable=True)
    nif = db.Column(db.String(120), nullable=True)
    ciudad = db.Column(db.String(120), nullable=True)
    sector = db.Column(db.String(120), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    entidad_id = db.Column(db.Integer, db.ForeignKey('entidades.id'))
    tipo_entidad = db.relationship('Entidad')

    def __repr__(self):
        return f'<Partners {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "NIF": self.nif,
            "ciudad": self.ciudad,
            "sector": self.sector,
            "email": self.email,
            "entidad_id": self.entidad_id,     
            # do not serialize the password, its a security breach
        }
    
class Usuarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=True)
    apellidos = db.Column(db.String(120), nullable=True)
    ciudad = db.Column(db.String(120), nullable=True)
    fecha_nacimiento = db.Column(db.Date, nullable=True)  # Cambié a nullable=True si no es obligatorio
    breve_descripcion = db.Column(db.String(255), nullable=True)  # Ampliado para descripciones más largas
    codigo_postal = db.Column(db.String(10), nullable=True)  # Limitar a 10 caracteres (5 para el CP, más espacio si se usa en otros países)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # Aumentar tamaño para almacenar contraseñas hash
    is_active = db.Column(db.Boolean(), default=True, nullable=False)
    db.relationship('Inscripciones', backref='usuarios', lazy=True)

    def __repr__(self):
        return f'<Usuario {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellidos": self.apellidos,
            "ciudad": self.ciudad,
            "fecha_nacimiento": self.fecha_nacimiento.strftime('%Y-%m-%d') if self.fecha_nacimiento else None,
            "breve_descripcion": self.breve_descripcion,
            "codigo_postal": self.codigo_postal,
            "email": self.email,
            "is_active": self.is_active
            # No serializamos la contraseña por seguridad
        }
    

class Inscripciones(db.Model):
    __tablename__ = 'inscripciones'
    id = db.Column(db.Integer, primary_key=True)
    fecha_registro = db.Column(db.String(120), nullable=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    tipo_usuario = db.relationship('Usuarios') 
    evento_id = db.Column(db.Integer, db.ForeignKey('eventos.id'))
    tipo_evento = db.relationship('Eventos')   
