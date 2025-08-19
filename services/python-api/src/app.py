from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import os
import time

app = Flask(__name__)
CORS(app)

# Configuration
PORT = int(os.environ.get('PORT', 4001))
ENV = os.environ.get('FLASK_ENV', 'development')

# Mock data
orders = [
    {
        'id': '1',
        'userId': '1',
        'items': [
            {
                'id': '1',
                'productId': 'product_1',
                'quantity': 2,
                'price': 29.99,
                'name': 'Awesome Product'
            }
        ],
        'status': 'confirmed',
        'totalAmount': 59.98,
        'currency': 'USD',
        'createdAt': datetime.now().isoformat(),
        'updatedAt': datetime.now().isoformat()
    }
]

def create_response(success=True, data=None, error=None, message=None):
    """Create standardized API response"""
    return {
        'success': success,
        'data': data,
        'error': error,
        'message': message,
        'timestamp': datetime.now().isoformat()
    }

@app.route('/', methods=['GET'])
def root():
    """Root endpoint"""
    return jsonify(create_response(
        message='Python Flask API service is running'
    ))

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    health_data = {
        'status': 'healthy',
        'service': 'python-api',
        'version': '1.0.0',
        'timestamp': datetime.now().isoformat(),
        'uptime': time.time() - start_time,
        'environment': ENV
    }
    return jsonify(health_data)

@app.route('/api/orders', methods=['GET'])
def get_orders():
    """Get all orders"""
    return jsonify(create_response(data=orders))

@app.route('/api/orders/<order_id>', methods=['GET'])
def get_order(order_id):
    """Get specific order"""
    order = next((o for o in orders if o['id'] == order_id), None)
    if not order:
        return jsonify(create_response(
            success=False,
            error='Order not found'
        )), 404
    
    return jsonify(create_response(data=order))

@app.route('/api/orders', methods=['POST'])
def create_order():
    """Create new order"""
    data = request.get_json()
    
    if not data or 'items' not in data:
        return jsonify(create_response(
            success=False,
            error='Missing required field: items'
        )), 400
    
    new_order = {
        'id': str(len(orders) + 1),
        'userId': data.get('userId', '1'),
        'items': data['items'],
        'status': 'pending',
        'totalAmount': sum(item['price'] * item['quantity'] for item in data['items']),
        'currency': 'USD',
        'createdAt': datetime.now().isoformat(),
        'updatedAt': datetime.now().isoformat()
    }
    
    orders.append(new_order)
    
    return jsonify(create_response(
        data=new_order,
        message='Order created successfully'
    )), 201

@app.route('/metrics', methods=['GET'])
def metrics():
    """Metrics endpoint"""
    metrics_data = {
        'service': 'python-api',
        'version': '1.0.0',
        'uptime': time.time() - start_time,
        'timestamp': datetime.now().isoformat(),
        'requests': {
            'total': 0,  # In a real app, you'd track this
            'errors': 0
        },
        'orders': {
            'total': len(orders),
            'pending': len([o for o in orders if o['status'] == 'pending']),
            'confirmed': len([o for o in orders if o['status'] == 'confirmed'])
        }
    }
    return jsonify(metrics_data)

@app.errorhandler(404)
def not_found(error):
    """404 handler"""
    return jsonify(create_response(
        success=False,
        error='Endpoint not found'
    )), 404

@app.errorhandler(500)
def internal_error(error):
    """500 handler"""
    return jsonify(create_response(
        success=False,
        error='Internal server error' if ENV == 'production' else str(error)
    )), 500

if __name__ == '__main__':
    start_time = time.time()
    print(f'🚀 Python Flask API service starting on port {PORT}')
    print(f'🏥 Health check: http://localhost:{PORT}/health')
    print(f'📊 Metrics: http://localhost:{PORT}/metrics')
    print(f'📦 Orders API: http://localhost:{PORT}/api/orders')
    
    app.run(
        host='0.0.0.0',
        port=PORT,
        debug=(ENV == 'development')
    )