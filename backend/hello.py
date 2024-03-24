import os
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv


app = Flask(__name__)

load_dotenv()

PASSWORD = os.getenv('PASSWORD')
PUBLIC_IP_ADDRESS = os.getenv('PUBLIC_IP_ADDRESS')
DBNAME = os.getenv('DBNAME')

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://postgres:postgres@/gcp-agrofa?host=/var/run/postgresql'
db = SQLAlchemy(app)
#CORS(app)

#cross_origin(supports_credentials=True)

class Product(db.Model):
    __tablename__ = 'products'  
    id = db.Column(db.Integer, primary_key=True)
    productname = db.Column(db.String(80), nullable=False)


@app.route('/', methods=[('GET')])
def test_endpoint():
    all_products = Product.query.all()
    products_list = []
    for product in all_products:
        product_data = {'id': product.id, 'productname': product.productname}
        products_list.append(product_data)
    print(products_list)
    return jsonify(products_list)

@app.route('/add', methods=[('POST')])
def add_item():
    try:
        data = request.get_json()
        print('->',data)
        if 'id' in data and 'name' in data:
            new_product = Product(id=data['id'], productname=data['name'])
            print(data['name'])
            db.session.add(new_product)
            db.session.commit()
            return jsonify({'success': True}), 200
        else:
            return jsonify({'message': 'missing data for id or productname'}), 400
    except Exception as e:
        print(e)
    return jsonify({'sucess':False}), 500


@app.route('/delete', methods=['POST'])
def delete_product():
    try:
        data = request.get_json()
        if 'id' in data:
            product_to_delete = Product.query.filter_by(id=data['id']).first()
            if product_to_delete:
                db.session.delete(product_to_delete)
                db.session.commit()
                return jsonify({'success': True}), 200
            else:
                return jsonify({'message': 'Product not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'success': False, 'error': str(e)}), 500
    return jsonify({'message': 'No product id provided'}), 400


@app.route('/check')
def hello_world():
    return jsonify(message="hello world")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
