FROM python:3.7
RUN python --version
# RUN cat /etc/os-release# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update -y && apt-get -y install cmake && apt-get install -y python-setuptools python3-pip vim  build-essential libpoppler-cpp-dev pkg-config python-dev
RUN pip3 install -U pip setuptools
# RUN apt install linuxbrew-wrapper
# ADD ./en_core_web_sm-2.2.5 /en_core_web_sm-2.2.5
ADD ./requirements.txt /
RUN ls -la
# RUN tar -xzvf en_core_web_sm-2.2.5.tar.gz &&
# RUN cd en_core_web_sm-2.2.5 && python3 setup.py install
RUN ls -la
RUN pip3 install -r ./requirements.txt
# RUN python3 -m spacy download en_core_web_sm
# RUN pip3 install psycopg2-binary
# RUN pip install -U flask-cors
# RUN python3 -m nltk.downloader names
# RUN python3 -m nltk.downloader punkt
RUN apt-get install -y antiword
RUN apt install -y default-jre

COPY . .

EXPOSE 5000

ENTRYPOINT ["python3"]

CMD ["main.py"]
