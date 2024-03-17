FROM python:3.8-alpine
RUN apk update && \
    apk add --virtual build-deps gcc musl-dev && \
    apk add postgresql-dev && \
    rm -rf /var/cache/apk/*
RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt requirements.txt
RUN pip install -U pip
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "hello.py"]