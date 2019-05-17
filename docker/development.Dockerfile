FROM docker_backend

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

ENV NODE_ENV development

RUN npm install

ARG port=4000
EXPOSE $port

RUN ls -l

CMD /wait && npm run start
