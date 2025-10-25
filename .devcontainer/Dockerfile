# Use the official Node.js image as a base
FROM node:25

ARG REMOTE_USER
ARG REMOTE_UID
ARG REMOTE_GID

RUN apt-get update && apt-get install -y bash-completion
RUN echo "source /etc/bash_completion" >> ~/.bashrc

# The "node" Docker image comes with default group and user, both called "node"
# Edit them to match the host user and group
RUN groupmod -n $REMOTE_USER -g $REMOTE_GID node && \
    usermod -l $REMOTE_USER -u $REMOTE_UID -g $REMOTE_GID node

# Update permissions of the home directory
RUN chown -R $REMOTE_USER:$REMOTE_USER /home/node

# Update the user's home directory to new username
RUN usermod -d /home/$REMOTE_USER -m $REMOTE_USER

# Add /home/$REMOTE_USER/.local/bin to PATH
ENV PATH="/home/$REMOTE_USER/.local/bin:${PATH}"

# Switch to the non-root user
USER $REMOTE_USER
