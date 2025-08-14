from flask import Flask
from flask_cors import CORS
from api.user_data import user_data_bp
from api.cat_dog import cat_dog_bp
from api.ship_truck import ship_truck_bp
from api.bird_deer import bird_deer_bp
from api.plane_car import plane_car_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(cat_dog_bp)
app.register_blueprint(ship_truck_bp)
app.register_blueprint(bird_deer_bp)
app.register_blueprint(plane_car_bp)
app.register_blueprint(user_data_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)