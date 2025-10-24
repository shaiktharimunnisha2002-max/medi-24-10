from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from datetime import datetime

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, 'medichain.db')

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + DB_PATH
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'email': self.email, 'created_at': self.created_at.isoformat()}

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    name = db.Column(db.String(150), nullable=False)
    age = db.Column(db.Integer, nullable=True)
    medical_history = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'user_id': self.user_id, 'name': self.name, 'age': self.age, 'medical_history': self.medical_history, 'created_at': self.created_at.isoformat()}

class Medicine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    batch_no = db.Column(db.String(80), nullable=True)
    quantity = db.Column(db.Integer, default=0)
    expiry_date = db.Column(db.Date, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'batch_no': self.batch_no,
            'quantity': self.quantity,
            'expiry_date': self.expiry_date.isoformat() if self.expiry_date else None,
            'created_at': self.created_at.isoformat()
        }

@app.route('/init-db', methods=['POST'])
def init_db():
    if os.path.exists(DB_PATH):
        return jsonify({'ok': False, 'msg': 'DB already exists', 'path': DB_PATH}), 400
    db.create_all()
    return jsonify({'ok': True, 'msg': 'Database created', 'path': DB_PATH})

# Users CRUD
@app.route('/users', methods=['GET'])
def list_users():
    users = User.query.order_by(User.id.desc()).all()
    return jsonify([u.to_dict() for u in users])

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json() or {}
    name = data.get('name'); email = data.get('email')
    if not name or not email:
        return jsonify({'ok': False, 'msg': 'name and email required'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'ok': False, 'msg': 'user with this email exists'}), 400
    u = User(name=name, email=email)
    db.session.add(u); db.session.commit()
    return jsonify({'ok': True, 'user': u.to_dict()}), 201

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    u = User.query.get_or_404(user_id); return jsonify(u.to_dict())

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    u = User.query.get_or_404(user_id); data = request.get_json() or {}
    u.name = data.get('name', u.name); u.email = data.get('email', u.email)
    db.session.commit(); return jsonify({'ok': True, 'user': u.to_dict()})

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    u = User.query.get_or_404(user_id); db.session.delete(u); db.session.commit(); return jsonify({'ok': True})

# Patients CRUD
@app.route('/patients', methods=['GET'])
def list_patients():
    patients = Patient.query.order_by(Patient.id.desc()).all(); return jsonify([p.to_dict() for p in patients])

@app.route('/patients', methods=['POST'])
def create_patient():
    data = request.get_json() or {}; name = data.get('name')
    if not name: return jsonify({'ok': False, 'msg': 'name required'}), 400
    p = Patient(user_id=data.get('user_id'), name=name, age=data.get('age'), medical_history=data.get('medical_history'))
    db.session.add(p); db.session.commit(); return jsonify({'ok': True, 'patient': p.to_dict()}), 201

@app.route('/patients/<int:patient_id>', methods=['GET'])
def get_patient(patient_id):
    p = Patient.query.get_or_404(patient_id); return jsonify(p.to_dict())

@app.route('/patients/<int:patient_id>', methods=['PUT'])
def update_patient(patient_id):
    p = Patient.query.get_or_404(patient_id); data = request.get_json() or {}
    p.name = data.get('name', p.name); p.age = data.get('age', p.age); p.medical_history = data.get('medical_history', p.medical_history)
    db.session.commit(); return jsonify({'ok': True, 'patient': p.to_dict()})

@app.route('/patients/<int:patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    p = Patient.query.get_or_404(patient_id); db.session.delete(p); db.session.commit(); return jsonify({'ok': True})

# Medicines CRUD
@app.route('/medicines', methods=['GET'])
def list_medicines():
    meds = Medicine.query.order_by(Medicine.id.desc()).all(); return jsonify([m.to_dict() for m in meds])

@app.route('/medicines', methods=['POST'])
def create_medicine():
    data = request.get_json() or {}; name = data.get('name')
    if not name: return jsonify({'ok': False, 'msg': 'name required'}), 400
    expiry = None
    if data.get('expiry_date'):
        try:
            expiry = datetime.fromisoformat(data.get('expiry_date')).date()
        except Exception:
            return jsonify({'ok': False, 'msg': 'expiry_date must be ISO date (YYYY-MM-DD)'}), 400
    m = Medicine(name=name, batch_no=data.get('batch_no'), quantity=data.get('quantity',0), expiry_date=expiry)
    db.session.add(m); db.session.commit(); return jsonify({'ok': True, 'medicine': m.to_dict()}), 201

@app.route('/medicines/<int:med_id>', methods=['GET'])
def get_medicine(med_id):
    m = Medicine.query.get_or_404(med_id); return jsonify(m.to_dict())

@app.route('/medicines/<int:med_id>', methods=['PUT'])
def update_medicine(med_id):
    m = Medicine.query.get_or_404(med_id); data = request.get_json() or {}
    m.name = data.get('name', m.name); m.batch_no = data.get('batch_no', m.batch_no); m.quantity = data.get('quantity', m.quantity)
    if data.get('expiry_date'):
        try:
            m.expiry_date = datetime.fromisoformat(data.get('expiry_date')).date()
        except Exception:
            return jsonify({'ok': False, 'msg': 'expiry_date must be ISO date (YYYY-MM-DD)'}), 400
    db.session.commit(); return jsonify({'ok': True, 'medicine': m.to_dict()})

@app.route('/medicines/<int:med_id>', methods=['DELETE'])
def delete_medicine(med_id):
    m = Medicine.query.get_or_404(med_id); db.session.delete(m); db.session.commit(); return jsonify({'ok': True})

@app.route('/')
def index():
    return jsonify({'ok': True, 'msg': 'Medichain backend running'})

if __name__ == '__main__':
    if not os.path.exists(DB_PATH):
        db.create_all(); print('Created DB at', DB_PATH)
    app.run(debug=True, host='0.0.0.0', port=5000)
