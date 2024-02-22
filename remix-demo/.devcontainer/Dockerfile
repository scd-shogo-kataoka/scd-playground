FROM debian:latest

RUN apt-get update && \
    apt-get install -y git openssh-client && \
    apt-get install -y ca-certificates curl gnupg && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

RUN apt-get install -y sudo

RUN echo "user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

ENV NODE_MAJOR=20
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_MAJOR}.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs && \
    corepack enable && \
    corepack enable npm


ARG USER_ID="10000"
ARG GROUP_ID="10000"
ARG USER_NAME="user"

# RUN adduser -u ${USER_ID} ${USER_NAME} && \
#     gpasswd -a ${USER_NAME} sudo,root
RUN useradd --uid ${USER_ID} --create-home --shell /bin/sh -G sudo,root ${USER_NAME}

USER "${USER_NAME}"

CMD ["/bin/sh"]