FROM docker_backend

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

ENV NODE_ENV test

RUN npm install

ARG port=4000

RUN ls -l

CMD /wait && ./node_modules/.bin/jest --forceExit
