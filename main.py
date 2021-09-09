"""
Resume Analyzer
"""
from flask import Flask, request, redirect, send_from_directory, make_response, jsonify, abort
from flask_cors import CORS
from prometheus_flask_exporter import PrometheusMetrics
import os,uuid,json
import time
from os.path import isfile
import sys
import pathlib

def parse_pdf(file_name):
    return "sample text"

def extract_and_analyze(text):
    return {"analysis_emsi_vs_attention":"{\"true_positive\": 4, \"true_negative\": 0, \"false_positive\": 1, \"false_negative\": 0, \"precision\": 0.8, \"recall\": 1.0, \"accuracy\": 0.8, \"f_score\": 0.888888888888889, \"match_score\": 1.0}","analysis_emsi_vs_ngram":"{\"true_positive\": 3, \"true_negative\": 0, \"false_positive\": 0, \"false_negative\": 1, \"precision\": 1.0, \"recall\": 0.75, \"accuracy\": 0.75, \"f_score\": 0.8571428571428571, \"match_score\": 0.75}","extract_exception":"None","resume_clean":["paragraph","pyspark","machine","learning","natural","language","processing"],"resume_text":"this paragraph is about a/r pyspark, machine learning, and natural language processing","skills_per_attention_extactor":"[\"machine learning\", \"pyspark\", \"accounts receivable\", \"natural language processing\", \"apache spark\"]","skills_per_emsi_extactor":"[\"machine learning\", \"natural language processing\", \"accounts receivable\", \"pyspark\"]","skills_per_ngram_extactor":"[\"machine learning\", \"pyspark\", \"natural language processing\"]"}

app = Flask(__name__)
CORS(app)
metrics = PrometheusMetrics(app)
metrics.info('app_info', 'Application info', version='1.0.3')

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/process_resume', methods=['POST'])
def process_resume():
    print('processing resume....')
    resume_text = parse_pdf(request)
    print(request.files['resume'])
    response = extract_and_analyze(resume_text)
    print('response',response)
    return response

@app.route('/process_text', methods=['POST'])
def process_text():
    resume_text = request.get_json()['parsed_resume']['resume_summary']
    print(resume_text)
    resume_obj = extract_and_analyze(resume_text)
    return resume_obj


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)