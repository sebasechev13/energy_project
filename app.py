# Dependencies and Setup
from flask import Flask, render_template
from flask_pymongo import PyMongo
import energy_data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# PyMongo Connection Setup

app.config["MONGO_URI"] = "mongodb://localhost:27017/energy_app"
mongo = PyMongo(app)

# Flask Routes
# Root Route to Query MongoDB & Pass Mars Data Into HTML Template: index.html to Display Data
@app.route("/")
def index():
   energy = mongo.db.energy.find_one()
    return render_template("index.html")

# Scrape Route to Import `scrape_mars.py` Script & Call `scrape` Function
@app.route("/datacleaning")
def scrapper():
    energy = mongo.db.energy
    energy_data = energy_data
    energy.update({}, energy_data, upsert=True)
    return "Scraping Successful"

# Define Main Behavior
if __name__ == "__main__":
    app.run(debug=True)