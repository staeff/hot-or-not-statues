from flask import Flask
import json

app = Flask(__name__)


@app.route('/statues/')
def statues():
    return json.dumps([{'id': 332,
    'img': 'http://datosabiertos.laspalmasgc.es/repositorio/mobiliario/fotos_monumentos/332.JPG'
    }])

@app.route('/statues/<int:number>')
def statue(number):
    return json.dumps({'id': 332,
    'hot': 3143,
    'not': 123})

if __name__ == "__main__":
    app.run(debug=True)
