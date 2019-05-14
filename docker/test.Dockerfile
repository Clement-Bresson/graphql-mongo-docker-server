FROM docker_backend

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

ENV NODE_ENV development

RUN npm install

ARG port=4000

CMD /wait && npm run test:unit -- --forceExit
