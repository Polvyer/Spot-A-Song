FROM python:3.7

WORKDIR /backend

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY app app
COPY migrations migrations
COPY model.sav spot-a-song.py config.py boot.sh ./
RUN chmod +x boot.sh

ENV FLASK_APP spot-a-song.py

EXPOSE 8080
ENTRYPOINT ["./boot.sh"]