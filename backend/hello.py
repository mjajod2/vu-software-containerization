from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

PASSWORD = 'admin'  # Use quotes for string values
PUBLIC_IP_ADDRESS = '34.38.110.51'  # Use quotes for string values
DBNAME = 'gcp-agrofa'

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://postgres:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}'
db = SQLAlchemy(app)
CORS(app)

cross_origin(supports_credentials=True)

class Product(db.Model):
    __tablename__ = 'products'  
    id = db.Column(db.Integer, primary_key=True)
    productname = db.Column(db.String(80), nullable=False)


@app.route('/test')
def test_endpoint():
    all_products = Product.query.all()
    products_list = []
    for product in all_products:
        product_data = {'id': product.id, 'productname': product.productname}
        products_list.append(product_data)
    print(products_list)
    return jsonify(products_list)

@app.route('/secondtest', methods=[('GET')])
def test_second_endpoint():
    return jsonify({'success': True}), 200

if __name__ == '__main__':
    app.run(debug=True)