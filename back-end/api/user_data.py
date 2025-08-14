from flask import Flask, Blueprint, request, jsonify
from keycloak.exceptions import KeycloakError
from keycloak import KeycloakOpenID
import os

KEYCLOAK_SERVER_URL = os.getenv('KEYCLOAK_SERVER_URL', 'http://localhost:8080/auth/')
KEYCLOAK_REALM = os.getenv('KEYCLOAK_REALM', 'master')
CLIENT_ID = os.getenv('KEYCLOAK_CLIENT_ID', 'react-client') 

keycloak_openid = KeycloakOpenID(
    server_url=KEYCLOAK_SERVER_URL,
    realm_name=KEYCLOAK_REALM,
    client_id=CLIENT_ID
)

user_data_bp = Blueprint('user-data', __name__)

@user_data_bp.route('/user-data', methods=['GET'])
def get_user_profile():
    auth_header = request.headers.get('Authorization')
    if not auth_header or 'Bearer' not in auth_header:
        return jsonify({"error": "Authorization header is missing or malformed"}), 401

    try:
        access_token = auth_header.split()[1]
        user_info = keycloak_openid.userinfo(access_token)
        return jsonify(user_info), 200
        
    except IndexError:
        return jsonify({"error": "Invalid Authorization header format"}), 401
    except KeycloakError as e:
        return jsonify({"error": f"Keycloak error: {str(e)}"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500