FROM python:3.6-alpine

RUN adduser -D spot-a-song

WORKDIR /home/spot-a-song

COPY requirements.txt requirements.txt
RUN python3 -m venv venv
RUN venv/bin/pip install -r requirements.txt
RUN venv/bin/pip install gunicorn

COPY app app
COPY migrations migrations
COPY spot-a-song.py config.py boot.sh ./
RUN chmod +x boot.sh

ENV FLASK_APP spot-a-song.py

RUN chown -R spot-a-song:spot-a-song ./
USER spot-a-song

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]