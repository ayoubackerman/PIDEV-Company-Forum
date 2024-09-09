from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import re
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

# Load the trained model and CountVectorizer
model = pickle.load(open('rf.pkl', 'rb'))
cv = pickle.load(open('cv.pkl', 'rb'))

app = Flask(__name__)
CORS(app)

def preprocess(text):
    wordnet = WordNetLemmatizer()
    review = re.sub('[^a-zA-Z]', ' ', text)
    review = review.lower().split()
    review = [wordnet.lemmatize(word) for word in review if word not in set(stopwords.words('english'))]
    review = ' '.join(review)
    return review

@app.route('/predict', methods=['GET','POST'])
def predict():
    if not request.is_json:
        return jsonify({'error': 'Missing JSON in request'}), 400

    data = request.get_json(force=True)
    text = data.get('text', '')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Preprocess and predict
    processed_text = preprocess(text)
    vector = cv.transform([processed_text])
    prediction = model.predict(vector)
    sentiment = 'Positive' if prediction[0] == 1 else 'Negative'

    return jsonify({'sentiment': sentiment})

if __name__ == '__main__':
    app.run(debug=True)
