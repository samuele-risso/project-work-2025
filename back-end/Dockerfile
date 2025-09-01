FROM python:3.9-slim

WORKDIR /app

COPY ./requirements.txt . 

RUN pip install --no-cache-dir -r requirements.txt

COPY ./app.py .
COPY ./models ./models
COPY ./picto_api ./picto_api
COPY ./detector_api ./detector_api

ENV PYTHONPATH=/app

EXPOSE 5000

CMD ["python", "app.py"]